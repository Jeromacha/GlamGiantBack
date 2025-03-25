import { IsUUID, IsArray, IsNumber, IsEnum } from 'class-validator';
import { PaymentStatus } from '../entities/order-and-transactions.entity';

export class CreateOrderAndTransactionsDto {
  @IsUUID()
  client_id: string;

  @IsArray()
  products: string[];

  @IsNumber()
  total_amount: number;

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}
