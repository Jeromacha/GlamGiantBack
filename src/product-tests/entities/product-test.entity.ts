import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from '../../productos_maquillaje/entities/productos-maquillaje.entity';

@Entity('product_tests')
export class ProductTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (user) => user.productTests, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'tester_id' })
  tester: Usuario;

  @Column('uuid')
  tester_id: string;

  @ManyToOne(() => ProductoMaquillaje, (product) => product.productTests, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductoMaquillaje;

  @Column('uuid')
  product_id: string;

  @Column('text')
  reaction: string;

  @Column('int')
  rating: number;

  @Column('boolean')
  survival_status: boolean;
}
