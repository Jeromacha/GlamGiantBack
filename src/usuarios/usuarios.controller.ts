import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './enums/user-role.enum';
import { TesterType } from './enums/tester-type.enum';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // 👇 Solo ADMIN y EMPLOYEE pueden crear usuarios
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto, @Req() req) {
    const creatorRole = req.user.rol;
    const newUserRole = createUsuarioDto.rol;
  
    if (
      creatorRole === UserRole.EMPLOYEE &&
      (newUserRole === UserRole.EMPLOYEE || newUserRole === UserRole.ADMIN)
    ) {
      throw new ForbiddenException('Un empleado no puede crear este tipo de usuario');
    }
  
    return this.usuariosService.create(createUsuarioDto);
  }
  


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('testers/:type')
  findTestersByType(@Param('type') type: string) {
    const castedType = type.toUpperCase() as TesterType;
    return this.usuariosService.findByTesterType(castedType);
  }
}