import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';
import { StaffProfileEntity } from './staff_profile.entity';
import { ServiceEntity } from './service.entity';

@Entity('invoice_items', { schema: 'core' })
export class InvoiceItemEntity {
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
  // Esta entidad no es referenciada por otras

  /** Foreign Keys **/
  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.invoiceItems)
  @JoinColumn({ name: 'invoice_id' })
  invoice: InvoiceEntity;

  @Column({
    type: 'uuid',
    name: 'invoice_id',
    comment: 'Referencia a la factura'
  })
  invoiceId: string;

  @ManyToOne(() => StaffProfileEntity, (staff) => staff.invoiceItems)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffProfileEntity;

  @Column({
    type: 'uuid',
    name: 'staff_id',
    comment: 'Referencia al staff que realizó el servicio'
  })
  staffId: string;

  @ManyToOne(() => ServiceEntity, { nullable: true })
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @Column({
    type: 'uuid',
    name: 'service_id',
    nullable: true,
    comment: 'Referencia al servicio (si model_type es service)'
  })
  serviceId: string;

  /** Columns **/
  @Column({
    name: 'model_type',
    type: 'varchar',
    comment: 'Tipo de modelo: service|product|other',
  })
  modelType: string;

  @Column({
    name: 'model_id',
    type: 'uuid',
    nullable: true,
    comment: 'ID del modelo (si aplica)',
  })
  modelId: string;

  @Column({
    name: 'description',
    type: 'varchar',
    comment: 'Descripción del ítem',
  })
  description: string;

  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Cantidad',
  })
  quantity: number;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio unitario',
  })
  unitPrice: number;

  @Column({
    name: 'discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Descuento aplicado al ítem',
  })
  discount: number;

  @Column({
    name: 'tax',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Impuestos del ítem',
  })
  tax: number;

  @Column({
    name: 'total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Total del ítem',
  })
  total: number;
}