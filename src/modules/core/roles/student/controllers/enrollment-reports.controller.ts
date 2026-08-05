import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  // Query,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EnrollmentReportsService } from '../services/enrollment-reports.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { Auth, Roles } from '@auth/decorators';
import { RoleEnum } from '@auth/enums';

@ApiTags('Enrollment Reports')
@Auth()
@Controller('core/student/enrollment-reports')
export class EnrollmentReportsController {
  constructor(private enrollmentReportsService: EnrollmentReportsService) {}
  //report application front pantalla 4
  @ApiOperation({ summary: 'Enrollment Application Report' })
  @Get(':id/application')
  @Roles(RoleEnum.student)
  @HttpCode(HttpStatus.OK)
  async generateEnrollmentApplication(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpInterface> {
    await this.enrollmentReportsService.generateEnrollmentApplication(res, id);

    return {
      data: null,
      message: `Enrollment Certificate`,
      title: `Report`,
    };
  }
}
