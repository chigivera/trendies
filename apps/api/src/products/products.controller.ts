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
import type { ProductsService } from "./products.service"
import { type CreateProductDto, type UpdateProductDto, ProductResponseDto } from "./dto"

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau produit' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Produit créé avec succès', type: ProductResponseDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Récupérer tous les produits avec pagination" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "category", required: false, type: String })
  @ApiResponse({ status: HttpStatus.OK, description: "Liste des produits récupérée avec succès" })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.productsService.findAll({
      page: +page,
      limit: +limit,
      search,
      category,
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un produit par ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Produit récupéré avec succès', type: ProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produit non trouvé' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }
    return product;
  }

  @Put(":id")
  @ApiOperation({ summary: "Mettre à jour un produit" })
  @ApiResponse({ status: HttpStatus.OK, description: "Produit mis à jour avec succès", type: ProductResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Produit non trouvé" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un produit' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Produit supprimé avec succès' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produit non trouvé' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
