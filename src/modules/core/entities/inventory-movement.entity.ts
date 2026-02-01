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
import { ProductEntity } from './product.entity';
import { PurchaseEntity } from './purchase.entity';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

@Entity('inventory_movements', { schema: 'core' })
export class InventoryMovementEntity {
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
  @ManyToOne(() => BranchEntity, (branch) => branch.inventoryMovements)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal'
  })
  branchId: string;

  @ManyToOne(() => ProductEntity, (product) => product.inventoryMovements)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({
    type: 'uuid',
    name: 'product_id',
    comment: 'Referencia al producto'
  })
  productId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'location_id' })
  location: CatalogueEntity;

  @Column({
    type: 'uuid',
    name: 'location_id',
    comment: 'Referencia a la ubicación de stock'
  })
  locationId: string;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.inventoryMovements, { nullable: true })
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;

  @Column({
    type: 'uuid',
    name: 'purchase_id',
    nullable: true,
    comment: 'Referencia a la compra (si aplica)'
  })
  purchaseId: string;

  /** Columns **/
  @Column({
    name: 'model_type',
    type: 'varchar',
    comment: 'Tipo de modelo relacionado (invoices, appointments, purchases...)',
  })
  modelType: string;

  @Column({
    name: 'model_id',
    type: 'uuid',
    nullable: true,
    comment: 'ID del modelo relacionado',
  })
  modelId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    comment: 'Tipo de movimiento: in|out|adjust',
  })
  type: string;

  @Column({
    name: 'reason',
    type: 'varchar',
    comment: 'Razón del movimiento (purchase, sale, service_use, shrinkage, adjustment)',
  })
  reason: string;

  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Cantidad del movimiento',
  })
  quantity: number;
}