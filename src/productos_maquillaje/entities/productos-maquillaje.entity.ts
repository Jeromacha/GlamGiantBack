import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ProductTest } from '../../product-tests/entities/product-test.entity';
import { OneToMany } from 'typeorm';

@Entity('productos_maquillaje')
export class ProductoMaquillaje {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['Lipstick', 'Foundation', 'Eyeshadow'] })
  category: string;

  @Column('int')
  stock: number;

  @Column()
  warehouse_location: string;

  @Column('int', { default: 0 })
durability_score: number;

  @Column('int', { default: 0 })
  safety_score: number;

  @Column('int', { default: 0 })
  magical_score: number;

  @OneToMany(() => ProductTest, (test) => test.product)
  productTests: ProductTest[];
}
