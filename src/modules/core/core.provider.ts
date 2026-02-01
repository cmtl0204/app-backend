import { DataSource } from 'typeorm';
import { ConfigEnum, CoreRepositoryEnum } from '@utils/enums';
import {
  AppointmentEntity,
  AppointmentServiceEntity,
  BranchEntity,
  CustomerEntity,
  InventoryMovementEntity,
  InvoiceEntity,
  InvoiceItemEntity,
  ProductEntity,
  PurchaseEntity,
  PurchaseItemEntity,
  ServiceEntity,
  StaffProfileEntity,
  StaffTimeOffEntity,
  StaffWorkingHourEntity,
  StockBalanceEntity,
  SupplierEntity,
} from '@modules/core/entities';

export const coreProviders = [
  {
    provide: CoreRepositoryEnum.BRANCH_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BranchEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.CUSTOMER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CustomerEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.STAFF_PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StaffProfileEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.STAFF_WORKING_HOUR_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StaffWorkingHourEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.STAFF_TIME_OFF_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StaffTimeOffEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.SERVICE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ServiceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },

  {
    provide: CoreRepositoryEnum.APPOINTMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AppointmentEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  // Hasta aqui mis entidades Jorge
  {
    provide: CoreRepositoryEnum.APPOINTMENT_SERVICE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AppointmentServiceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.STOCK_BALANCE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StockBalanceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.SUPPLIER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SupplierEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.PURCHASE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PurchaseEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.PURCHASE_ITEM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PurchaseItemEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INVENTORY_MOVEMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InventoryMovementEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INVOICE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: CoreRepositoryEnum.INVOICE_ITEM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceItemEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];
