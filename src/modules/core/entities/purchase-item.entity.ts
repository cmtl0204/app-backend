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
import { PurchaseEntity } from './purchase.entity';
import { ProductEntity } from './product.entity';

@Entity('purchase_items', { schema: 'core' })
export class PurchaseItemEntity {
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
  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseItems)
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;

  @Column({
    type: 'uuid',
    name: 'purchase_id',
    comment: 'Referencia a la compra'
  })
  purchaseId: string;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({
    type: 'uuid',
    name: 'product_id',
    comment: 'Referencia al producto'
  })
  productId: string;

  /** Columns **/
  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Cantidad comprada',
  })
  quantity: number;

  @Column({
    name: 'unit_cost',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Costo unitario',
  })
  unitCost: number;

  @Column({
    name: 'total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Total del ítem (quantity * unit_cost)',
  })
  total: number;
}