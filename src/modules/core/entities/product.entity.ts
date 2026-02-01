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
import { StockBalanceEntity } from './stock-balance.entity';
import { PurchaseItemEntity } from './purchase-item.entity';
import { InventoryMovementEntity } from './inventory-movement.entity';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

@Entity('products', { schema: 'core' })
export class ProductEntity {
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
  @OneToMany(() => StockBalanceEntity, (stockBalance) => stockBalance.productId)
  stockBalances: StockBalanceEntity[];

  @OneToMany(() => PurchaseItemEntity, (purchaseItem) => purchaseItem.productId)
  purchaseItems: PurchaseItemEntity[];

  @OneToMany(() => InventoryMovementEntity, (movement) => movement.productId)
  inventoryMovements: InventoryMovementEntity[];

  /** Foreign Keys **/
  @ManyToOne(() => BranchEntity, (branch) => branch.products)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: 'Referencia a la sucursal'
  })
  branchId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'product_categories_id' })
  category: CatalogueEntity;

  @Column({
    type: 'uuid',
    name: 'category_id',
    comment: 'Referencia a la categoría de producto'
  })
  categoryId: string;

  /** Columns **/
  @Column({
    name: 'sku',
    type: 'varchar',
    comment: 'Código SKU del producto',
  })
  sku: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del producto',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    comment: 'Descripción del producto',
  })
  description: string;

  @Column({
    name: 'unit',
    type: 'varchar',
    comment: 'Unidad de medida (unidad, ml, g...)',
  })
  unit: string;

  @Column({
    name: 'cost_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio de costo',
  })
  costPrice: number;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio de venta',
  })
  salePrice: number;

  @Column({
    name: 'track_stock',
    type: 'boolean',
    default: true,
    comment: 'true=controla stock, false=no controla stock',
  })
  trackStock: boolean;

  @Column({
    name: 'is_enabled',
    type: 'boolean',
    default: true,
    comment: 'Indica si el producto está habilitado',
  })
  isEnabled: boolean;
}