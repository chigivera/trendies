import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { CreateProductDto, UpdateProductDto } from "./dto"
import type { Prisma } from "@prisma/client"

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    })
  }

  async findAll({
    page = 1,
    limit = 10,
    search,
    category,
  }: { page: number; limit: number; search?: string; category?: string }) {
    const skip = (page - 1) * limit

    // Construire les conditions de filtrage
    const where: Prisma.ProductWhereInput = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category) {
      where.category = category
    }

    // Récupérer les produits avec pagination
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`)
    }

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Vérifier si le produit existe
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`)
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  async remove(id: number) {
    // Vérifier si le produit existe
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`)
    }

    // Vérifier si le produit est utilisé dans des commandes
    const orderItemsCount = await this.prisma.orderItem.count({
      where: { productId: id },
    })

    if (orderItemsCount > 0) {
      throw new Error(`Impossible de supprimer le produit car il est utilisé dans ${orderItemsCount} commandes`)
    }

    await this.prisma.product.delete({
      where: { id },
    })

    return { id, message: "Produit supprimé avec succès" }
  }
}
