import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTest } from '../../product-tests/entities/product-test.entity';
import { OneToMany } from 'typeorm';

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

  @Column({ type: 'enum', enum: ['ADMIN', 'CLIENT', 'EMPLOYEE', 'TESTER'] })
  rol: string;

  @Column({ default: false })
  test_subject_status: boolean;

  @Column('text', { nullable: true })
  allergic_reactions: string;

  @Column('simple-array', { nullable: true })
  purchase_history: string[]; // Lista de órdenes (IDs)

  @Column({
    type: 'enum',
    enum: ['NORMAL', 'DWARF', 'SPECIAL'],
    default: 'NORMAL'
  })
  tester_type: 'NORMAL' | 'DWARF' | 'SPECIAL';

  @OneToMany(() => ProductTest, (test) => test.tester)
  productTests: ProductTest[];
}