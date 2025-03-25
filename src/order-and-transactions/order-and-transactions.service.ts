import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order-and-transactions.entity';
import { CreateOrderAndTransactionsDto } from './dto/create-order-and-transactions.dto';
import { UpdateOrderAndTransactionsDto } from './dto/update-order-and-transaction.dto';

@Injectable()
export class OrderAndTransactionsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  create(dto: CreateOrderAndTransactionsDto) {
    const order = this.orderRepo.create(dto);
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }

  async update(id: string, dto: UpdateOrderAndTransactionsDto) {
    await this.findOne(id);
    await this.orderRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }
}
