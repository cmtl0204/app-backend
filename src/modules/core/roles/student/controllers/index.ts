import { EnrollmentReportsController } from './enrollment-reports.controller';
import { EnrollmentsController } from './enrollments.controller';
import { LocationsController } from './locations.controller';
import { SchoolPeriodsController } from './school-periods.controller';
import { StudentsController } from './students.controller';

export const controllers = [
  StudentsController,
  EnrollmentsController,
  EnrollmentReportsController,
  LocationsController,
  SchoolPeriodsController,
];
