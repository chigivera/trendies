import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsNumber, IsInt, Min } from "class-validator"

export class UpdateProductDto {
  @ApiProperty({ description: "Nom du produit", required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: "Description du produit", required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: "SKU du produit", required: false })
  @IsOptional()
  @IsString()
  sku?: string

  @ApiProperty({ description: "Prix du produit", required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number

  @ApiProperty({ description: "Stock disponible", required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number

  @ApiProperty({ description: "Catégorie du produit", required: false })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ description: "URL de l'image du produit", required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string
}
