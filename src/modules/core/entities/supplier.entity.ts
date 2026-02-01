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
import { BranchEntity } from './branch.entity';
import { PurchaseEntity } from './purchase.entity';

@Entity('suppliers', { schema: 'core' })
export class SupplierEntity {
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
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.supplierId)
  purchases: PurchaseEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => BranchEntity, (branch) => branch.suppliers)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal'
  })
  branchId: string;

  /** Columns **/
  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del proveedor',
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
    comment: 'Teléfono del proveedor',
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
    comment: 'Email del proveedor',
  })
  email: string;

  @Column({
    name: 'identification',
    type: 'varchar',
    nullable: true,
    comment: 'Identificación (RUC, cédula)',
  })
  identification: string;

  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
    comment: 'Dirección del proveedor',
  })
  address: string;
}