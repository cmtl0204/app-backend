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
import { StaffProfileEntity } from './staff_profile.entity';

@Entity('staff_time_off', { schema: 'core' })
export class StaffTimeOffEntity {
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
  @ManyToOne(() => StaffProfileEntity, (staffProfile) => staffProfile.staffTimeOffs)
  @JoinColumn({ name: 'staff_profile_id' })
  staffProfile: StaffProfileEntity;

  @Column({
    type: 'uuid',
    name: 'staff_profile_id',
    comment: 'Referencia al perfil del personal'
  })
  staffProfileId: string;

  /** Columns **/
  @Column({
    name: 'start_at',
    type: 'timestamp',
    comment: 'Fecha y hora de inicio del tiempo libre',
  })
  startAt: Date;

  @Column({
    name: 'end_at',
    type: 'timestamp',
    comment: 'Fecha y hora de fin del tiempo libre',
  })
  endAt: Date;

  @Column({
    name: 'reason',
    type: 'varchar',
    comment: 'Razón del tiempo libre',
  })
  reason: string;
}