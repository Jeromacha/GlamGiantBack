import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAndTransactionsService } from './order-and-transactions.service';
import { OrderAndTransactionsController } from './order-and-transactions.controller';
import { Order } from './entities/order-and-transactions.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Usuario])],
  controllers: [OrderAndTransactionsController],
  providers: [OrderAndTransactionsService],
})
export class OrderAndTransactionsModule {}
