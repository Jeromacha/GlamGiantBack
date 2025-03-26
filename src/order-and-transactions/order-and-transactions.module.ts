import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAndTransaction } from './entities/order-and-transactions.entity';
import { OrderAndTransactionsService } from './order-and-transactions.service';
import { OrderAndTransactionsController } from './order-and-transactions.controller';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from 'src/productos_maquillaje/entities/productos-maquillaje.entity';
import { ProductosMaquillajeModule } from 'src/productos_maquillaje/productos-maquillaje.module'; // 👈

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderAndTransaction, Usuario, ProductoMaquillaje]),
    ProductosMaquillajeModule, // 👈 IMPORTANTE
  ],
  controllers: [OrderAndTransactionsController],
  providers: [OrderAndTransactionsService],
})
export class OrderAndTransactionsModule {}