import { IsUUID, IsArray, IsNumber, IsEnum, Min } from 'class-validator';
import { PaymentStatus } from '../entities/order-and-transactions.entity';

export class CreateOrderAndTransactionsDto {
  @IsUUID()
  clientId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  productIds: string[];

  @IsNumber()
  @Min(0)
  total_amount: number;

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}
