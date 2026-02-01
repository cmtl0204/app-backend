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
import { AppointmentServiceEntity } from './appointment-service.entity';
import { InvoiceItemEntity } from './invoice-item.entity';

@Entity('services', { schema: 'core' })
export class ServiceEntity {
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
  @OneToMany(() => AppointmentServiceEntity, (appointmentService) => appointmentService.serviceId)
  appointmentServices: AppointmentServiceEntity[];

  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.service)
  invoiceItems: InvoiceItemEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => BranchEntity, (branch) => branch.services)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal'
  })
  branchId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'services_categories_id' })
  category: CatalogueEntity;

  @Column({
    type: 'uuid',
    name: 'category_id',
    comment: 'Referencia al catálogo de categorías de servicio'
  })
  categoryId: string;

  /** Columns **/
  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del servicio',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    comment: 'Descripción del servicio',
  })
  description: string;

  @Column({
    name: 'duration_min',
    type: 'int',
    comment: 'Duración estándar del servicio en minutos',
  })
  durationMin: number;

  @Column({
    name: 'base_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio base del servicio',
  })
  basePrice: number;

  @Column({
    name: 'is_enabled',
    type: 'boolean',
    default: true,
    comment: 'Indica si el servicio está habilitado',
  })
  isEnabled: boolean;
}