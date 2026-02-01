import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from '../services/appointments.service';
import { ResponseHttpInterface } from '@utils/interfaces';
import { PublicRoute } from '@auth/decorators';

@ApiTags('Appointments')
@Controller('core/customer/appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @ApiOperation({ summary: 'Verify Registered User' })
  @PublicRoute()
  @Get(':identification/registered')
  async verifyRegisteredUser(
    @Param('identification') identification: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.verifyRegisteredUser(identification);

    return {
      data: serviceResponse,
      message: `Cita encontrada ${identification}`,
      title: 'Success',
    };
  }
}
