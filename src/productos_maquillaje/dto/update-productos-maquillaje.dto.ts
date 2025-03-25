import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoMaquillajeDto } from './create-productos-maquillaje.dto';

export class UpdateProductoMaquillajeDto extends PartialType(CreateProductoMaquillajeDto) {}
