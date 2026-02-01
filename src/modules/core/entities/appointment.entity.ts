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
import { StaffProfileEntity } from './staff_profile.entity';
import { AppointmentServiceEntity } from './appointment-service.entity';

@Entity('appointments', { schema: 'core' })
export class AppointmentEntity {
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
  @OneToMany(() => AppointmentServiceEntity, (appointmentService) => appointmentService.appointment)
  appointmentServices: AppointmentServiceEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => BranchEntity, (branch) => branch.appointments)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal',
  })
  branchId: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.appointments)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @Column({
    type: 'uuid',
    name: 'customer_id',
    comment: 'Referencia al cliente',
  })
  customerId: string;

  @ManyToOne(() => StaffProfileEntity, (staff) => staff.appointments, { nullable: true })
  @JoinColumn({ name: 'staff_profile_id' })
  staffProfile: StaffProfileEntity;

  @Column({
    type: 'uuid',
    name: 'staff_profile_id',
    nullable: true,
    comment: 'Referencia al personal',
  })
  staffProfileId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'status_id' })
  status: CatalogueEntity;

  @Column({
    type: 'int',
    name: 'status_id',
    comment: 'Referencia al catálogo de estados de cita',
  })
  statusId: number;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'source_id' })
  source: CatalogueEntity;

  @Column({
    type: 'int',
    name: 'source_id',
    comment: 'Referencia al catálogo de fuentes de cita',
  })
  sourceId: number;

  /** Columns **/
  @Column({
    name: 'start_at',
    type: 'timestamp',
    comment: 'Fecha y hora de inicio',
  })
  startAt: Date;

  @Column({
    name: 'end_at',
    type: 'timestamp',
    comment: 'Fecha y hora de fin',
  })
  endAt: Date;

  @Column({
    name: 'notes',
    type: 'text',
    nullable: true,
    comment: 'Notas adicionales',
  })
  notes: string;
}
