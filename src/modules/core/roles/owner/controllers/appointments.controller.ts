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
import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto/appointment';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PaginationDto } from '@utils/pagination';

@ApiTags('Appointments')
@Controller('core/owner/appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @ApiOperation({ summary: 'Create' })
  @Post()
  async create(@Body() payload: CreateAppointmentDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);
    return { data: serviceResponse, message: 'Cita creada', title: 'Creado' };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Citas listadas',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);
    return { data: serviceResponse, message: `Cita encontrada ${id}`, title: 'Success' };
  }

  @ApiOperation({ summary: 'Update' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateAppointmentDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);
    return { data: serviceResponse, message: 'Cita actualizada', title: 'Actualizado' };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);
    return { data: serviceResponse, message: 'Cita eliminada', title: 'Eliminado' };
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
