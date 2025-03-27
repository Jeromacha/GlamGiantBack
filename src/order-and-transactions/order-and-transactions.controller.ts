import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderAndTransactionsService } from './order-and-transactions.service';
import { CreateOrderAndTransactionsDto } from './dto/create-order-and-transactions.dto';
import { UpdateOrderAndTransactionsDto } from './dto/update-order-and-transaction.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/usuarios/enums/user-role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('order-and-transactions')
export class OrderAndTransactionsController {
  constructor(
    private readonly service: OrderAndTransactionsService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @Post()
  create(@Body() dto: CreateOrderAndTransactionsDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateOrderAndTransactionsDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
