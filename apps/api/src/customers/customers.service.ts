import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateCustomerDto, UpdateCustomerDto } from "./dto"
import type { Prisma } from "@prisma/client"

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    })
  }

  async findAll({ page = 1, limit = 10, search }: { page: number; limit: number; search?: string }) {
    const skip = (page - 1) * limit

    // Construire les conditions de filtrage
    const where: Prisma.CustomerWhereInput = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ]
    }

    // Récupérer les clients avec pagination
    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take: limit,
        where,
        include: {
          _count: {
            select: { orders: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.customer.count({ where }),
    ])

    // Calculer le total dépensé par client
    const customersWithTotalSpent = await Promise.all(
      customers.map(async (customer) => {
        const totalSpent = await this.prisma.order.aggregate({
          where: { customerId: customer.id },
          _sum: { total: true },
        })

        return {
          ...customer,
          ordersCount: customer._count.orders,
          totalSpent: totalSpent._sum.total || 0,
          _count: undefined,
        }
      }),
    )

    return {
      data: customersWithTotalSpent,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        _count: {
          select: { orders: true },
        },
      },
    })

    if (!customer) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`)
    }

    // Calculer le total dépensé
    const totalSpent = await this.prisma.order.aggregate({
      where: { customerId: id },
      _sum: { total: true },
    })

    return {
      ...customer,
      ordersCount: customer._count.orders,
      totalSpent: totalSpent._sum.total || 0,
      _count: undefined,
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    // Vérifier si le client existe
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`)
    }

    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    })
  }

  async remove(id: number) {
    // Vérifier si le client existe
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`)
    }

    // Vérifier si le client a des commandes
    const ordersCount = await this.prisma.order.count({
      where: { customerId: id },
    })

    if (ordersCount > 0) {
      throw new Error(`Impossible de supprimer le client car il a ${ordersCount} commandes associées`)
    }

    await this.prisma.customer.delete({
      where: { id },
    })

    return { id, message: "Client supprimé avec succès" }
  }
}
