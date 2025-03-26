import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Min } from 'class-validator';

import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from 'src/productos_maquillaje/entities/productos-maquillaje.entity';
import { JoinColumn } from 'typeorm';


export enum PaymentStatus {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

@Entity()
export class OrderAndTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (user) => user.orders, { eager: true })
@JoinColumn({ name: 'client_id' })
client: Usuario;

  @ManyToMany(() => ProductoMaquillaje)
  @JoinTable()
  products: ProductoMaquillaje[];

  @Column({ type: 'decimal' })
  @Min(0)
  total_amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PAID,
  })
  payment_status: PaymentStatus;
}
