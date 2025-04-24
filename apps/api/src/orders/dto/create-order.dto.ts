import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  IsPositive,
} from "class-validator"

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

class OrderItemDto {
  @ApiProperty({ description: "ID du produit" })
  @IsInt()
  @IsPositive()
  productId: number

  @ApiProperty({ description: "Quantité du produit" })
  @IsInt()
  @Min(1)
  quantity: number

  @ApiProperty({ description: "Prix unitaire du produit" })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number
}

export class CreateOrderDto {
  @ApiProperty({ description: "ID du client" })
  @IsInt()
  @IsPositive()
  customerId: number

  @ApiProperty({ description: "Statut de la commande", enum: OrderStatus, default: OrderStatus.PENDING })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus

  @ApiProperty({ description: "Notes sur la commande", required: false })
  @IsOptional()
  @IsString()
  notes?: string

  @ApiProperty({ description: "Montant de la TVA", required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  tax?: number

  @ApiProperty({ description: "Frais de livraison", required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  shipping?: number

  @ApiProperty({ description: "Articles de la commande", type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsNotEmpty()
  items: OrderItemDto[]
}
