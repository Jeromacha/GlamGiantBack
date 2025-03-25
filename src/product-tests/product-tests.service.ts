import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTest } from './entities/product-test.entity';
import { CreateProductTestDto } from './dto/create-product-test.dto';
import { UpdateProductTestDto } from './dto/update-product-test.dto';
import { NotFoundException } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from 'src/productos_maquillaje/entities/productos-maquillaje.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductTestsService {

  constructor(
    @InjectRepository(ProductTest)
    private readonly productTestRepo: Repository<ProductTest>,
  
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  
    @InjectRepository(ProductoMaquillaje)
    private readonly productRepo: Repository<ProductoMaquillaje>,
  ) {}

  async create(dto: CreateProductTestDto): Promise<ProductTest> {
    const tester = await this.usuarioRepo.findOne({ where: { id: dto.tester_id } });
  
    if (!tester) {
      throw new NotFoundException(`Tester con id ${dto.tester_id} no existe`);
    }
  
    if (tester.tester_type !== 'DWARF' && tester.tester_type !== 'SPECIAL') {
      throw new BadRequestException(`Solo se permiten test subjects tipo DWARF o SPECIAL`);
    }
  
    const product = await this.productRepo.findOne({ where: { id: dto.product_id } });
  
    if (!product) {
      throw new NotFoundException(`Producto con id ${dto.product_id} no existe`);
    }
  
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
