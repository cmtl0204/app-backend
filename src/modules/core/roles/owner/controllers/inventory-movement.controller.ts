// inventory-movements.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryMovementsService } from '../services/inventory-movements.service';
import { CreateInventoryMovementDto, UpdateInventoryMovementDto } from '../dto/inventory-movement';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Inventory Movements')
@Controller('inventory-movements')
export class InventoryMovementsController {
  constructor(private readonly service: InventoryMovementsService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(@Body() payload: CreateInventoryMovementDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return { data: serviceResponse, message: 'Movimiento de inventario creado', title: 'Creado' };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Movimientos de inventario listados',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return { data: serviceResponse, message: `Movimiento de inventario encontrado ${id}`, title: 'Success' };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateInventoryMovementDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return { data: serviceResponse, message: 'Movimiento de inventario actualizado', title: 'Actualizado' };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return { data: serviceResponse, message: 'Movimiento de inventario eliminado', title: 'Eliminado' };
  }

  @ApiOperation({ summary: 'Get product stock history' })
  @Get('product/:productId/history')
  async getProductHistory(@Param('productId', ParseUUIDPipe) productId: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findByProductId(productId);
    return { data: serviceResponse, message: 'Historial de stock del producto', title: 'Success' };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  async catalogue(): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.catalogue();
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Catalogue',
      title: 'Catalogue',
    };
  }
}
