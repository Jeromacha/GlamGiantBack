import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTestsService } from './product-tests.service';
import { ProductTestsController } from './product-tests.controller';
import { ProductTest } from './entities/product-test.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from 'src/productos_maquillaje/entities/productos-maquillaje.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductTest,
      Usuario,                // 👈 este es el que faltaba
      ProductoMaquillaje,
    ]),
  ],
  controllers: [ProductTestsController],
  providers: [ProductTestsService],
})
export class ProductTestsModule {}
