import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTestsService } from './product-tests.service';
import { ProductTestsController } from './product-tests.controller';
import { ProductTest } from './entities/product-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTest])],
  controllers: [ProductTestsController],
  providers: [ProductTestsService],
})
export class ProductTestsModule {}
