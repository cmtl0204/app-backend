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
import { AppointmentEntity } from './appointment.entity';
import { ServiceEntity } from './service.entity';

@Entity('appointment_services', { schema: 'core' })
export class AppointmentServiceEntity {
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
  @ManyToOne(() => AppointmentEntity, (appointment) => appointment.appointmentServices)
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity;

  @Column({
    type: 'uuid',
    name: 'appointment_id',
    comment: 'Referencia a la cita',
  })
  appointmentId: string;

  @ManyToOne(() => ServiceEntity, (service) => service.appointmentServices)
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @Column({
    type: 'uuid',
    name: 'service_id',
    comment: 'Referencia al servicio',
  })
  serviceId: string;

  /** Columns **/
  @Column({
    name: 'duration_min',
    type: 'int',
    comment: 'Duración del servicio en minutos (puede diferir del estándar)',
  })
  durationMin: number;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio del servicio en esta cita',
  })
  price: number;
}
