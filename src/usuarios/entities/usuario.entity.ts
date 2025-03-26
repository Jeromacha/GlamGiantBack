import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProductTest } from '../../product-tests/entities/product-test.entity';
import { OrderAndTransaction } from 'src/order-and-transactions/entities/order-and-transactions.entity';
import { UserRole } from '../enums/user-role.enum';
import { TesterType } from '../enums/tester-type.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  rol: UserRole;

  @Column({ default: false })
  test_subject_status: boolean;

  @Column('text', { nullable: true })
  allergic_reactions: string;

  @Column('simple-array', { nullable: true })
  purchase_history: string[];

  @Column({ type: 'enum', enum: TesterType, default: TesterType.NORMAL })
  tester_type: TesterType;

  @OneToMany(() => ProductTest, (test) => test.tester)
  productTests: ProductTest[];

  @OneToMany(() => OrderAndTransaction, (order) => order.client)
  orders: OrderAndTransaction[];
}
