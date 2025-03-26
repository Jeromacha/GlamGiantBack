import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { OrderAndTransaction } from 'src/order-and-transactions/entities/order-and-transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, OrderAndTransaction])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Solo si vas a usar el servicio en otro módulo
})
export class UsuariosModule {}