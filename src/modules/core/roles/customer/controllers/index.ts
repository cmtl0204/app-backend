import { ServicesController } from './services.controller';
import { BranchController } from './branch.controller';
import { AppointmentServicesController } from './appointment-service.controller';
import { InventoryMovementsController } from './inventory-movement.controller';
import { InvoiceItemsController } from './invoice-item.controller';
import { InvoicesController } from './invoice.controller';
import { ProductsController } from './product.controller';
import { PurchaseItemsController } from './purchase-item.controller';
import { PurchasesController } from './purchase.controller';
import { StockBalancesController } from './stock-balance.controller';
import { SuppliersController } from './supplier.controller';
import { CustomersController } from './customers.controller';
import { StaffProfilesController } from './staff-profiles.controller';
import { StaffTimeOffController } from './staff-time-off.controller';
import { StaffWorkingHourController } from './staff-working-hours.controller';
import { AppointmentsController } from './appointments.controller';

export const controllers = [
  BranchController,
  AppointmentServicesController,
  ProductsController,
  StockBalancesController,
  SuppliersController,
  PurchasesController,
  PurchaseItemsController,
  InventoryMovementsController,
  InvoicesController,
  InvoiceItemsController,
  CustomersController,
  StaffProfilesController,
  StaffWorkingHourController,
  StaffTimeOffController,
  AppointmentsController,
  ServicesController,
];
