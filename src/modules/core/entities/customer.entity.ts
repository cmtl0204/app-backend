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
import { AppointmentEntity } from './appointment.entity';
import { UserEntity } from '@auth/entities';
import { InvoiceEntity } from './invoice.entity';

@Entity('customers', { schema: 'core' })
export class CustomerEntity {
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
  @OneToMany(() => CustomerEntity, (custom) => custom.referral)
  referrals: CustomerEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.customer)
  appointments: AppointmentEntity[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.customerId)
  invoices: InvoiceEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => CustomerEntity, (custom) => custom.referrals)
  @JoinColumn({ name: 'referral_id' })
  referral: CustomerEntity;

  @Column({
    type: 'uuid',
    name: 'referral_id',
    nullable: true,
    comment: 'Referencia al cliente que refirió',
  })
  referralId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'uuid',
    name: 'user_id',
    unique: true,
    comment: 'Referencia al usuario (única)',
  })
  userId: string;

  /** Columns **/
  @Column({
    name: 'tax_identification',
    type: 'varchar',
    comment: 'Cédula o RUC para facturación',
  })
  taxIdentification: string;

  @Column({
    name: 'tax_name',
    type: 'varchar',
    comment: 'Nombre para facturación si difiere del usuario',
  })
  taxName: string;

  @Column({
    name: 'allergies',
    type: 'text',
    comment: 'Alergias o restricciones del usuario',
  })
  allergies: string;
}
