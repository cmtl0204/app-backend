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
import { SupplierEntity } from './supplier.entity';
import { PurchaseItemEntity } from './purchase-item.entity';
import { InventoryMovementEntity } from './inventory-movement.entity';

@Entity('purchases', { schema: 'core' })
export class PurchaseEntity {
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
  @OneToMany(() => PurchaseItemEntity, (purchaseItem) => purchaseItem.purchaseId)
  purchaseItems: PurchaseItemEntity[];

  @OneToMany(() => InventoryMovementEntity, (movement) => movement.purchase)
  inventoryMovements: InventoryMovementEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => BranchEntity, (branch) => branch.purchases)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal'
  })
  branchId: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.purchases)
  @JoinColumn({ name: 'supplier_id' })
  supplier: SupplierEntity;

  @Column({
    type: 'uuid',
    name: 'supplier_id',
    comment: 'Referencia al proveedor'
  })
  supplierId: string;

  /** Columns **/
  @Column({
    name: 'document_number',
    type: 'varchar',
    nullable: true,
    comment: 'Número de documento (factura)',
  })
  documentNumber: string;

  @Column({
    name: 'purchased_at',
    type: 'date',
    comment: 'Fecha de la compra',
  })
  purchasedAt: Date;

  @Column({
    name: 'subtotal',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Subtotal de la compra',
  })
  subtotal: number;

  @Column({
    name: 'tax',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Impuestos de la compra',
  })
  tax: number;

  @Column({
    name: 'total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Total de la compra',
  })
  total: number;
}