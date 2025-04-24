import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateOrderDto, UpdateOrderDto } from "./dto"
import type { Prisma } from "@prisma/client"

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, customerId, status, notes, tax, shipping } = createOrderDto

    // Calculer le total de la commande
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

    // Générer un numéro de commande unique
    const orderNumber = `ORD-${Date.now()}`

    // Créer la commande avec ses items
    return this.prisma.order.create({
      data: {
        orderNumber,
        customerId,
        status: status || "PENDING",
        notes,
        total,
        tax,
        shipping,
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.productId },
            },
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })
  }

  async findAll({ page = 1, limit = 10, status }: { page: number; limit: number; status?: string }) {
    const skip = (page - 1) * limit

    // Construire les conditions de filtrage
    const where: Prisma.OrderWhereInput = {}
    if (status) {
      where.status = status as Prisma.OrderStatusFilter
    }

    // Récupérer les commandes avec pagination
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        skip,
        take: limit,
        where,
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.order.count({ where }),
    ])

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée`)
    }

    return order
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { items, ...orderData } = updateOrderDto

    // Vérifier si la commande existe
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    })

    if (!existingOrder) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée`)
    }

    // Mise à jour de la commande dans une transaction
    return this.prisma.$transaction(async (tx) => {
      // Si des items sont fournis, supprimer les anciens et ajouter les nouveaux
      if (items && items.length > 0) {
        // Supprimer les items existants
        await tx.orderItem.deleteMany({
          where: { orderId: id },
        })

        // Ajouter les nouveaux items
        await Promise.all(
          items.map((item) =>
            tx.orderItem.create({
              data: {
                orderId: id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              },
            }),
          ),
        )

        // Recalculer le total
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
        orderData.total = total
      }

      // Mettre à jour la commande
      return tx.order.update({
        where: { id },
        data: orderData,
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    })
  }

  async remove(id: number) {
    // Vérifier si la commande existe
    const order = await this.prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée`)
    }

    // Supprimer la commande (les items seront supprimés en cascade)
    await this.prisma.order.delete({
      where: { id },
    })

    return { id, message: "Commande supprimée avec succès" }
  }
}
