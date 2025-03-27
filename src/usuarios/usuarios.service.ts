import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from './enums/user-role.enum';
import { TesterType } from './enums/tester-type.enum';
import * as bcrypt from 'bcrypt'; // Asegúrate de tener esto al inicio

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}


  //Crear usuario

  async create(createUsuarioDto: CreateUsuarioDto) {
    const existingUsuario = await this.usuarioRepo.findOne({
      where: { email: createUsuarioDto.email },
    });
  
    if (existingUsuario) {
      throw new ConflictException('El email ya se está usando');
    }
  
    // 👇 Aquí está la diferencia: hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
  
    const nuevoUsuario = this.usuarioRepo.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
  
    return this.usuarioRepo.save(nuevoUsuario);
  }
  
async findAll() {
    return await this.usuarioRepo.find();
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['productTests'], // 👈 esto es esencial
    });
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepo.preload({
      id,
      ...updateUsuarioDto,
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.usuarioRepo.save(usuario);
  }

  async remove(id: string) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['productTests'], // 💥 esto es CLAVE
    });
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no existe`);
    }
  
    if (usuario.rol === 'TESTER' && usuario.productTests.length > 0) {
      throw new BadRequestException(
        'Este tester no puede ser eliminado porque ha participado en pruebas.',
      );
    }
  
    return this.usuarioRepo.remove(usuario);
  }
  


  findByTesterType(type: TesterType) {
    return this.usuarioRepo.find({
      where: {
        rol: UserRole.TESTER,
        tester_type: type,
      },
    });
  }
}