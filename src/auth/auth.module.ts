import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // ← ¡Importante!
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Usuario]), // ← Importar entidad para login
  ],
  controllers: [AuthController], // ← ¡Debe estar aquí!
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}