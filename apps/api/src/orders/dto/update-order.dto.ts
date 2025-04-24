import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {
  IsOptional,
  IsInt,
  IsString,
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

export class UpdateOrderDto {
  @ApiProperty({ description: "ID du client", required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  customerId?: number

  @ApiProperty({ description: "Statut de la commande", enum: OrderStatus, required: false })
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

  @ApiProperty({ description: "Total de la commande", required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total?: number

  @ApiProperty({ description: "Articles de la commande", type: [OrderItemDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[]
}
