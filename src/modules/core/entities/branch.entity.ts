import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceEntity } from './service.entity';
import { AppointmentEntity } from './appointment.entity';
import { ProductEntity } from './product.entity';
import { PurchaseEntity } from './purchase.entity';
import { InvoiceEntity } from './invoice.entity';
import { SupplierEntity } from './supplier.entity';
import { InventoryMovementEntity } from './inventory-movement.entity';

@Entity('branches', { schema: 'core' })
export class BranchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @Column({
    name: 'enabled',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  enabled: boolean;

  /** Inverse Relationship **/
  @OneToMany(() => ServiceEntity, (service) => service.branch)
  services: ServiceEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.branch)
  appointments: AppointmentEntity[];

  @OneToMany(() => ProductEntity, (product) => product.branch)
  products: ProductEntity[];

  @OneToMany(() => SupplierEntity, (supplier) => supplier.branch)
  suppliers: SupplierEntity[];

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.branch)
  purchases: PurchaseEntity[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.branch)
  invoices: InvoiceEntity[];

  @OneToMany(() => InventoryMovementEntity, (movement) => movement.branch)
  inventoryMovements: InventoryMovementEntity[];

  /** Foreign Keys **/
  // Esta entidad no tiene foreign keys

  /** Columns **/
  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre de la sucursal',
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    comment: 'Teléfono de la sucursal',
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    comment: 'Correo electrónico de la sucursal',
  })
  email: string;

  @Column({
    name: 'address',
    type: 'varchar',
    comment: 'Dirección de la sucursal',
  })
  address: string;

  @Column({
    name: 'city',
    type: 'varchar',
    comment: 'Ciudad de la sucursal',
  })
  city: string;
}
