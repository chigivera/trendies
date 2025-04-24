import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger"
import type { OrdersService } from "./orders.service"
import { type CreateOrderDto, type UpdateOrderDto, OrderResponseDto } from "./dto"

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Commande créée avec succès', type: OrderResponseDto })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Récupérer toutes les commandes avec pagination" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "status", required: false, type: String })
  @ApiResponse({ status: HttpStatus.OK, description: "Liste des commandes récupérée avec succès" })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('status') status?: string) {
    return this.ordersService.findAll({
      page: +page,
      limit: +limit,
      status,
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Commande récupérée avec succès', type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande non trouvée' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée`);
    }
    return order;
  }

  @Put(":id")
  @ApiOperation({ summary: "Mettre à jour une commande" })
  @ApiResponse({ status: HttpStatus.OK, description: "Commande mise à jour avec succès", type: OrderResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Commande non trouvée" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Commande supprimée avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande non trouvée' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
