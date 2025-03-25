import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoMaquillaje } from './entities/productos-maquillaje.entity';
import { CreateProductoMaquillajeDto } from './dto/create-productos-maquillaje.dto';
import { UpdateProductoMaquillajeDto } from './dto/update-productos-maquillaje.dto';

@Injectable()
export class ProductosMaquillajeService {
  constructor(
    @InjectRepository(ProductoMaquillaje)
    private readonly productosRepo: Repository<ProductoMaquillaje>,
  ) {}

  create(dto: CreateProductoMaquillajeDto) {
    const nuevo = this.productosRepo.create(dto);
    return this.productosRepo.save(nuevo);
  }

  findAll() {
    return this.productosRepo.find();
  }

  async findOne(id: string) {
    const producto = await this.productosRepo.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: string, dto: UpdateProductoMaquillajeDto) {
    const producto = await this.productosRepo.preload({
      id,
      ...dto,
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return this.productosRepo.save(producto);
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    return this.productosRepo.remove(producto);
  }
}
