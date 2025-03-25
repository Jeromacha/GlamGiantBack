import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',        // ✅ tu usuario real de PostgreSQL
      password: 'Sebasadmin123',   // ✅ tu contraseña real
      database: 'glamgiantdb',     // ✅ nombre exacto de la base
      entities: [Usuario],
      synchronize: true,
    }),
    UsuariosModule,
  ],
})
export class AppModule {}