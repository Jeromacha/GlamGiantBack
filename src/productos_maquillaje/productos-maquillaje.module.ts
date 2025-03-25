import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosMaquillajeController } from './productos-maquillaje.controller';
import { ProductosMaquillajeService } from './productos-maquillaje.service';
import { ProductoMaquillaje } from './entities/productos-maquillaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoMaquillaje])],
  controllers: [ProductosMaquillajeController],
  providers: [ProductosMaquillajeService],
})
export class ProductosMaquillajeModule {}
