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
import { ProductEntity } from './product.entity';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

@Entity('stock_balances', { schema: 'core' })
export class StockBalanceEntity {
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
  @ManyToOne(() => ProductEntity, (product) => product.stockBalances)
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

  /** Columns **/
  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Cantidad disponible en stock',
  })
  quantity: number;
}