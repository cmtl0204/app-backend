import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer';
import { CustomerEntity } from '@modules/core/entities';
import { CustomersService } from '../services/customers.service';
import { PaginationDto } from '@utils/pagination';
import { ResponseHttpInterface } from '@utils/interfaces';

@ApiTags('Customers')
@Controller('core/owner/customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(@Body() payload: CreateCustomerDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return { data: serviceResponse, message: 'Cliente creado', title: 'Creado' };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return { data: serviceResponse.data, pagination: serviceResponse.pagination, message: 'Clientes listados', title: 'Success' };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return { data: serviceResponse, message: `Cliente encontrado (${id})`, title: 'Success' };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCustomerDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return { data: serviceResponse, message: 'Cliente actualizado', title: 'Actualizado' };
  }

  @ApiOperation({ summary: 'Remove' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return { data: serviceResponse, message: 'Cliente eliminado', title: 'Eliminado' };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  async catalogue(): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.catalogue();
    return { data: serviceResponse.data, pagination: serviceResponse.pagination, message: 'Catálogo de clientes', title: 'Success' };
  }
}
