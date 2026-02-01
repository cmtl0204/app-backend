import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateBranchDto, UpdateBranchDto } from '../dto/branch';
import { BranchesService } from '../services/branches.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Branches')
@Controller('core/customer/branches')
export class BranchController {
  constructor(private readonly service: BranchesService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(@Body() payload: CreateBranchDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return { data: serviceResponse, message: 'Sucursal creada', title: 'Creado' };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Sucursales listadas',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return { data: serviceResponse, message: `Sucursal encontrada (${id})`, title: 'Success' };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateBranchDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return { data: serviceResponse, message: 'Sucursal actualizada', title: 'Actualizado' };
  }

  @ApiOperation({ summary: 'Remove' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return { data: serviceResponse, message: 'Sucursal eliminada', title: 'Eliminado' };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  async catalogue(): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.catalogue();
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Catálogo de sucursales',
      title: 'Success',
    };
  }
}
