// stock-balances.controller.ts
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
import { StockBalancesService } from '../services/stock-balances.service';
import { CreateStockBalanceDto, UpdateStockBalanceDto } from '../dto/stock-balance';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Stock Balances')
@Controller('stock-balances')
export class StockBalancesController {
  constructor(private readonly service: StockBalancesService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(@Body() payload: CreateStockBalanceDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return { data: serviceResponse, message: 'Balance de stock creado', title: 'Creado' };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Balances de stock listados',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return { data: serviceResponse, message: `Balance de stock encontrado ${id}`, title: 'Success' };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateStockBalanceDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return { data: serviceResponse, message: 'Balance de stock actualizado', title: 'Actualizado' };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return { data: serviceResponse, message: 'Balance de stock eliminado', title: 'Eliminado' };
  }

  @ApiOperation({ summary: 'Get by product and location' })
  @Get('product/:productId/location/:locationId')
  async getByProductAndLocation(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('locationId', ParseUUIDPipe) locationId: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findByProductAndLocation(productId, locationId);
    return { data: serviceResponse, message: 'Balance encontrado', title: 'Success' };
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
