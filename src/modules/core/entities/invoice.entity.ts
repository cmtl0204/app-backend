import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { BranchEntity } from './branch.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from '@auth/entities';
import { InvoiceItemEntity } from './invoice-item.entity';

@Entity('invoices', { schema: 'core' })
export class InvoiceEntity {
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
  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.invoice)
  invoiceItems: InvoiceItemEntity[];


  /** Foreign Keys **/
  @ManyToOne(() => BranchEntity, (branch) => branch.invoices)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;



  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal'
  })
  branchId: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({
    type: 'uuid',
    name: 'customer_id',
    comment: 'Referencia al cliente'
  })
  customerId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'status_id' })
  status: CatalogueEntity;

  @Column({
    type: 'int',
    name: 'status_id',
    comment: 'Referencia al catálogo de estados de factura'
  })
  statusId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @Column({
    type: 'uuid',
    name: 'created_by',
    comment: 'Usuario que creó la factura'
  })
  createdById: string;

  /** Columns **/
  @Column({
    name: 'invoice_number',
    type: 'varchar',
    unique: true,
    comment: 'Número de factura (serie + secuencial)',
  })
  invoiceNumber: string;

  @Column({
    name: 'issued_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de emisión de la factura',
  })
  issuedAt: Date;

  @Column({
    name: 'subtotal',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Subtotal de la factura',
  })
  subtotal: number;

  @Column({
    name: 'discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Descuento total de la factura',
  })
  discount: number;

  @Column({
    name: 'tax',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Impuestos de la factura',
  })
  tax: number;

  @Column({
    name: 'total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Total de la factura',
  })
  total: number;

  @Column({
    name: 'notes',
    type: 'text',
    nullable: true,
    comment: 'Notas adicionales de la factura',
  })
  notes: string;
}