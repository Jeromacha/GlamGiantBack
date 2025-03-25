import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTest } from './entities/product-test.entity';
import { CreateProductTestDto } from './dto/create-product-test.dto';
import { UpdateProductTestDto } from './dto/update-product-test.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class ProductTestsService {
  constructor(
    @InjectRepository(ProductTest)
    private productTestRepo: Repository<ProductTest>,
  ) {}

  create(dto: CreateProductTestDto) {
    const test = this.productTestRepo.create(dto);
    return this.productTestRepo.save(test);
  }

  findAll() {
    return this.productTestRepo.find();
  }

  async findOne(id: string): Promise<ProductTest> {
    const test = await this.productTestRepo.findOne({where: {id}, relations: ['tester','product'],})
    if(!test) throw new NotFoundException(`Producto de testeo con id ${id} no fue encontrado o ha sido eliminado`)
    return test;
  }

  async update(id: string, dto: UpdateProductTestDto) {
    await this.productTestRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const test = await this.findOne(id);
if (!test) {
  throw new Error(`ProductTest with id ${id} not found`);
}
return this.productTestRepo.remove(test);
  }
}
