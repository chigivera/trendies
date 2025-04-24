import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsInt, Min } from "class-validator"

export class CreateProductDto {
  @ApiProperty({ description: "Nom du produit" })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: "Description du produit", required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: "SKU du produit" })
  @IsNotEmpty()
  @IsString()
  sku: string

  @ApiProperty({ description: "Prix du produit" })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number

  @ApiProperty({ description: "Stock disponible" })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number

  @ApiProperty({ description: "Catégorie du produit", required: false })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ description: "URL de l'image du produit", required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string
}
