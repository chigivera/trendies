import { ApiProperty } from "@nestjs/swagger"

class OrderDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  orderNumber: string

  @ApiProperty()
  status: string

  @ApiProperty()
  total: number

  @ApiProperty()
  createdAt: Date
}

export class CustomerResponseDto {
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

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ type: [OrderDto], required: false })
  orders?: OrderDto[]

  @ApiProperty({ required: false })
  ordersCount?: number

  @ApiProperty({ required: false })
  totalSpent?: number
}
