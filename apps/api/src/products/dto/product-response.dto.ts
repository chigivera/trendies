import { ApiProperty } from "@nestjs/swagger"

export class ProductResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty()
  sku: string

  @ApiProperty()
  price: number

  @ApiProperty()
  stock: number

  @ApiProperty({ required: false })
  category?: string

  @ApiProperty({ required: false })
  imageUrl?: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
