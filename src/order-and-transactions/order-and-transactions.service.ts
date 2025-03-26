import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderAndTransaction } from './entities/order-and-transactions.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from 'src/productos_maquillaje/entities/productos-maquillaje.entity';
import { CreateOrderAndTransactionsDto } from './dto/create-order-and-transactions.dto';
import { UpdateOrderAndTransactionsDto } from './dto/update-order-and-transaction.dto';
import { In } from 'typeorm';

@Injectable()
export class OrderAndTransactionsService {
  constructor(
    @InjectRepository(OrderAndTransaction)
    private readonly orderRepo: Repository<OrderAndTransaction>,

    @InjectRepository(Usuario)
    private readonly userRepo: Repository<Usuario>,

    @InjectRepository(ProductoMaquillaje)
    private readonly productRepo: Repository<ProductoMaquillaje>,
  ) {}

  async create(dto: CreateOrderAndTransactionsDto): Promise<OrderAndTransaction> {
    const { client_id, products: productIds, total_amount, payment_status } = dto;

    const client = await this.userRepo.findOne({ where: { id: client_id } });
    if (!client) throw new NotFoundException(`Cliente con ID ${client_id} no encontrado`);
    
    const products = await this.productRepo.find({
      where: {
        id: In(productIds),
      },
    });    if (products.length !== productIds.length) {
      throw new NotFoundException('Uno o más productos no fueron encontrados');
    }
    
    const newOrder = this.orderRepo.create({
      client,
      products,
      total_amount,
      payment_status,
    });
    
    return await this.orderRepo.save(newOrder);
  }

  async findAll(): Promise<OrderAndTransaction[]> {
    return await this.orderRepo.find({
      relations: ['client', 'products'],
    });
  }

  async findOne(id: string): Promise<OrderAndTransaction> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['client', 'products'],
    });
    if (!order) throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    return order;
  }

  async update(id: string, dto: UpdateOrderAndTransactionsDto): Promise<OrderAndTransaction> {
    const order = await this.findOne(id);

    // Si se desean actualizar productos o cliente, deben ser cargados
    if (dto.client_id) {
      const client = await this.userRepo.findOne({ where: { id: dto.client_id } });
      if (!client) throw new NotFoundException(`Cliente con ID ${dto.client_id} no encontrado`);
      order.client = client;
    }

    if (dto.products && dto.products.length > 0) {
      const products = await this.productRepo.find({
        where: { id: In(dto.products) },
      });
      if (products.length !== dto.products.length) {
        throw new NotFoundException('Uno o más productos no fueron encontrados');
      }
      order.products = products;
    }

    order.total_amount = dto.total_amount ?? order.total_amount;
    order.payment_status = dto.payment_status ?? order.payment_status;

    return await this.orderRepo.save(order);
  }

  async remove(id: string): Promise<{ message: string }> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return { message: 'Orden eliminada con éxito' };
  }
}
