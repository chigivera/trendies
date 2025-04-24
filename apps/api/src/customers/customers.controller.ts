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
import type { CustomersService } from "./customers.service"
import { type CreateCustomerDto, type UpdateCustomerDto, CustomerResponseDto } from "./dto"

@ApiTags("customers")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Client créé avec succès', type: CustomerResponseDto })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: "Récupérer tous les clients avec pagination" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiResponse({ status: HttpStatus.OK, description: "Liste des clients récupérée avec succès" })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('search') search?: string) {
    return this.customersService.findAll({
      page: +page,
      limit: +limit,
      search,
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Client récupéré avec succès', type: CustomerResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Client non trouvé' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customersService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }
    return customer;
  }

  @Put(":id")
  @ApiOperation({ summary: "Mettre à jour un client" })
  @ApiResponse({ status: HttpStatus.OK, description: "Client mis à jour avec succès", type: CustomerResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Client non trouvé" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Client supprimé avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Client non trouvé' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
