import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth, PublicRoute, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';
import { CreateCareerDto, FilterCareerDto, FilterEnrollmentDto, UpdateCareerDto } from '@core/dto';
import { CareerEntity } from '@core/entities';
import { CareerParallelsService, CareersService, EnrollmentsService, SubjectsService, TeacherDistributionsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Careers')
@Controller('core/academic-coordinator/careers')
export class CareersController {
  constructor(
    private readonly careersService: CareersService,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly subjectsService: SubjectsService,
    private readonly careerParallelsService: CareerParallelsService,
    private readonly teacherDistributionsService: TeacherDistributionsService,
  ) {}

  @ApiOperation({ summary: 'Find Careers By Institution' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findCareersByInstitution(@Query('institutionId') institutionId: string, @Query() params: FilterCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findCareersByInstitution(institutionId, params);
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Find Careers By Institution`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Careers By Institution' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findCareer(@Param('id',ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findOne(id);
    return {
      data: serviceResponse,
      message: `Find Careers By Institution`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Create Career' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.create(payload);

    return {
      data: serviceResponse,
      message: 'Carrera fue creada',
      title: 'Carrera creada',
    };
  }

  // @ApiOperation({summary: 'Find Career'})
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
  //     const serviceResponse = await this.careersService.findOne(id);
  //
  //     return {
  //         data: serviceResponse,
  //         message: `Buscar carrera`,
  //         title: `Success`,
  //     };
  // }

  @ApiOperation({ summary: 'Update Career' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.update(id, payload);

    return {
      data: serviceResponse,
      message: `Carrera fue actualizada`,
      title: `Carrera actualizada`,
    };
  }

  @ApiOperation({ summary: 'Hide' })
  @Patch(':id/hide')
  @HttpCode(HttpStatus.CREATED)
  async hide(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.hide(id);

    return {
      data: serviceResponse,
      message: `Carrera Oculto`,
      title: `Ocultado`,
    };
  }

  @ApiOperation({ summary: 'Reactivate' })
  @Patch(':id/reactivate')
  @HttpCode(HttpStatus.CREATED)
  async reactivate(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.reactivate(id);

    return {
      data: serviceResponse,
      message: `Carrera Reactivado`,
      title: `Reactivado`,
    };
  }

  @ApiOperation({ summary: 'Delete Career' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.remove(id);
    return {
      data: serviceResponse,
      message: `Carrera fue eliminada`,
      title: `Carrera eliminada`,
    };
  }

  @ApiOperation({ summary: 'Delete All Careers' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CareerEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.removeAll(payload);

    return {
      data: serviceResponse,
      message: `Carreras fueron eliminadas`,
      title: `Carreras eliminadas`,
    };
  }

  @ApiOperation({ summary: 'Find Career' })
  @Get(':id/teachers')
  @HttpCode(HttpStatus.OK)
  async findTeachersByCareer(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findTeachersByCareer(id);

    return {
      data: serviceResponse,
      message: `Buscar carrera`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Find Careers By Authenticated User' })
  @Auth()
  @Get('users/authenticated')
  @HttpCode(HttpStatus.OK)
  async findByAuthenticatedUser(@User() user: UserEntity): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findCareersByAuthenticatedUser(user);

    return {
      data: serviceResponse,
      message: 'Find Careers By Authenticated User',
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Find Subjects By Career' })
  @Get(':id/subjects')
  @HttpCode(HttpStatus.OK)
  async findSubjectsByCareer(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.subjectsService.findSubjectsByCareer(id);

    return {
      data: serviceResponse,
      message: `Success`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Find Enrollments By Career' })
  @Get(':id/enrollments')
  @HttpCode(HttpStatus.OK)
  async findEnrollmentsByCareer(@Param('id', ParseUUIDPipe) id: string, @Query() params: FilterEnrollmentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentsService.findEnrollmentsByCareer(id, params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Reporte de notas fueron eliminadas`,
      title: `Reporte de notas eliminadas`,
    };
  }

  @ApiOperation({ summary: 'Find TeacherDistributions By Career' })
  @Get(':id/teacher-distributions/:teacherDistributionId')
  @HttpCode(HttpStatus.OK)
  async findTeacherDistributionsByTeacher(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('teacherDistributionId', ParseUUIDPipe) teacherDistributionId: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.teacherDistributionsService.findTeacherDistributionsByCareer(id, teacherDistributionId);

    return {
      data: serviceResponse,
      message: `Success`,
      title: `Success`,
    };
  }
  @ApiOperation({ summary: 'Find Enrollments By Career' })
  @Get(':id/parallels')
  @HttpCode(HttpStatus.OK)
  async findParallelsByCareer(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careerParallelsService.findParallelsByCareer(id);

    return {
      data: serviceResponse,
      message: `Success`,
      title: `Success`,
    };
  }
  @PublicRoute()
  @Get('prueba')
  async sumar(): Promise<ResponseHttpModel> {
    return {
      data: null,
      message: `Success`,
      title: `Sumar`,
    };
  }
  @PublicRoute()
  @Get(':id')
  async sumar2(): Promise<ResponseHttpModel> {
    return {
      data: null,
      message: `Success`,
      title: `Sumar 2`,
    };
  }
}
