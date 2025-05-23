import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {UseGuards } from '@nestjs/common';
import { ProductosMaquillajeService } from './productos-maquillaje.service';
import { CreateProductoMaquillajeDto } from './dto/create-productos-maquillaje.dto';
import { UpdateProductoMaquillajeDto } from './dto/update-productos-maquillaje.dto';
import { UpdateProductoRankingDto } from './dto/update-producto-ranking.dto'; // 👈 importa tu nuevo DTO
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/usuarios/enums/user-role.enum';

@Controller('productos')
export class ProductosMaquillajeController {
  constructor(private readonly service: ProductosMaquillajeService) {}

    // 👇 Solo ADMIN y EMPLOYEE pueden crear productos
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductoMaquillajeDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/ranking')
  updateRanking(
    @Param('id') id: string,
    @Body() dto: UpdateProductoRankingDto,
  ) {
    return this.service.updateRanking(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get('ranking/durability')
  findMostDurable() {
  return this.service.findMostDurable();
}
 
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
@Get('ranking/safety')
findMostSafe() {
  return this.service.findMostSafe();
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
@Get('ranking/magical')
findMostMagical() {
  return this.service.findMostMagical();
}
}
