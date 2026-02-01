// purchases.controller.ts
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
import { PurchasesService } from '../services/purchases.service';
import { CreatePurchaseDto, UpdatePurchaseDto } from '../dto/purchase';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(@Body() payload: CreatePurchaseDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return { data: serviceResponse, message: 'Compra creada', title: 'Creado' };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Compras listadas',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return { data: serviceResponse, message: `Compra encontrada ${id}`, title: 'Success' };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePurchaseDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return { data: serviceResponse, message: 'Compra actualizada', title: 'Actualizado' };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return { data: serviceResponse, message: 'Compra eliminada', title: 'Eliminado' };
  }

  @ApiOperation({ summary: 'Get purchase items' })
  @Get(':id/items')
  async getItems(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findItems(id);
    return { data: serviceResponse, message: 'Items de la compra', title: 'Success' };
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
