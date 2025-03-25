import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderAndTransactionsService } from './order-and-transactions.service';
import { CreateOrderAndTransactionsDto } from './dto/create-order-and-transactions.dto';
import { UpdateOrderAndTransactionsDto } from './dto/update-order-and-transaction.dto';

@Controller('orders')
export class OrderAndTransactionsController {
  constructor(
    private readonly service: OrderAndTransactionsService,
  ) {}

  @Post()
  create(@Body() dto: CreateOrderAndTransactionsDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderAndTransactionsDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
