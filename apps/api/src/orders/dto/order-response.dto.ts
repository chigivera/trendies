import { ApiProperty } from "@nestjs/swagger"

class CustomerDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty({ required: false })
  phone?: string

  @ApiProperty({ required: false })
  address?: string
}

class ProductDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  sku: string

  @ApiProperty()
  price: number
}

class OrderItemDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  quantity: number

  @ApiProperty()
  price: number

  @ApiProperty()
  product: ProductDto
}

export class OrderResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  orderNumber: string

  @ApiProperty()
  status: string

  @ApiProperty()
  total: number

  @ApiProperty({ required: false })
  tax?: number

  @ApiProperty({ required: false })
  shipping?: number

  @ApiProperty({ required: false })
  notes?: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  customer: CustomerDto

  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[]
}
