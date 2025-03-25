import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosMaquillajeService } from './productos-maquillaje.service';
import { CreateProductoMaquillajeDto } from './dto/create-productos-maquillaje.dto';
import { UpdateProductoMaquillajeDto } from './dto/update-productos-maquillaje.dto';

@Controller('productos-maquillaje')
export class ProductosMaquillajeController {
  constructor(private readonly service: ProductosMaquillajeService) {}

  @Post()
  create(@Body() dto: CreateProductoMaquillajeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductoMaquillajeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
