import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { StaffWorkingHourEntity } from './staff_working_hour.entity';
import { StaffTimeOffEntity } from './staff_time_off.entity';
import { AppointmentEntity } from './appointment.entity';
import { UserEntity } from '@auth/entities';
import { InvoiceItemEntity } from './invoice-item.entity';

@Entity('staff_profiles', { schema: 'core' })
export class StaffProfileEntity {
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
  @OneToMany(() => StaffWorkingHourEntity, (working) => working.staffProfile)
  staffWorkingHours: StaffWorkingHourEntity[];

  @OneToMany(() => StaffTimeOffEntity, (time) => time.staffProfile)
  staffTimeOffs: StaffTimeOffEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.staffProfile)
  appointments: AppointmentEntity[];

  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.staffId)
  invoiceItems: InvoiceItemEntity[];

  /** Foreign Keys **/
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'uuid',
    name: 'user_id',
    unique: true,
    comment: 'Referencia al usuario (única)'
  })
  userId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'position_id' })
  position: CatalogueEntity;

  @Column({
    type: 'uuid',
    name: 'position_id',
    comment: 'Referencia al catálogo de posiciones'
  })
  positionId: string;

  /** Columns **/
  @Column({
    name: 'photo_url',
    type: 'varchar',
    nullable: true,
    comment: 'URL de la foto del colaborador',
  })
  photoUrl: string;

  @Column({
    name: 'display_name',
    type: 'varchar',
    comment: 'Nombre a mostrar en agenda (ej: Majo, Katy)',
  })
  displayName: string;

  @Column({
    name: 'specialty',
    type: 'varchar',
    comment: 'Especialidad: uñas, cejas, pestañas, etc.',
  })
  specialty: string;

  @Column({
    name: 'color_tag',
    type: 'varchar',
    comment: 'Color identificador para la agenda',
  })
  colorTag: string;

  @Column({
    name: 'commission_type',
    type: 'varchar',
    comment: 'Tipo de comisión: percent | fixed | none',
  })
  commissionType: string;

  @Column({
    name: 'commission_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'Valor de la comisión según el tipo',
  })
  commissionValue: number;
}
