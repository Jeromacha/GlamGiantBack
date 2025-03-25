import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { CreateProductTestDto } from './dto/create-product-test.dto';
import { UpdateProductTestDto } from './dto/update-product-test.dto';

@Controller('product-tests')
export class ProductTestsController {
  constructor(private readonly productTestsService: ProductTestsService) {}

  @Post()
  create(@Body() createDto: CreateProductTestDto) {
    return this.productTestsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.productTestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProductTestDto) {
    return this.productTestsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTestsService.remove(id);
  }
}
