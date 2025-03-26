import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoMaquillaje } from './entities/productos-maquillaje.entity';
import { ProductosMaquillajeService } from './productos-maquillaje.service';
import { ProductosMaquillajeController } from './productos-maquillaje.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoMaquillaje])],
  providers: [ProductosMaquillajeService],
  controllers: [ProductosMaquillajeController],
  exports: [TypeOrmModule], // 👈 Esto es importante
})
export class ProductosMaquillajeModule {}