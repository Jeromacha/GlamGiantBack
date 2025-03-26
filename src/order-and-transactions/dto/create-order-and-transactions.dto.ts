import { IsUUID, IsArray, IsNumber, IsEnum, Min } from 'class-validator';
import { PaymentStatus } from '../entities/order-and-transactions.entity';

export class CreateOrderAndTransactionsDto {
  @IsUUID()
  client_id: string;

  @IsArray()
  @IsUUID('all', { each: true })
  products: string[]; // ← este nombre DEBE coincidir con el destructuring del body

  @IsNumber()
  total_amount: number;

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}
