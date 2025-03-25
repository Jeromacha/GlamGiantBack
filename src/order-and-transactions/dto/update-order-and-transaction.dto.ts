import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderAndTransactionsDto } from './create-order-and-transactions.dto';

export class UpdateOrderAndTransactionsDto extends PartialType(CreateOrderAndTransactionsDto) {}
