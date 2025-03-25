import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos existentes
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosMaquillajeModule } from './productos_maquillaje/productos-maquillaje.module';

// Nuevos módulos y entidades
import { ProductTestsModule } from './product-tests/product-tests.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from './productos_maquillaje/entities/productos-maquillaje.entity';
import { ProductTest } from './product-tests/entities/product-test.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sebasadmin123',
      database: 'glamgiantdb',
      entities: [Usuario, ProductoMaquillaje, ProductTest], // ← Agrega aquí la nueva entidad
      synchronize: true,
    }),
    UsuariosModule,
    ProductosMaquillajeModule,
    ProductTestsModule, // ← Importa el nuevo módulo
  ],
})
export class AppModule {}
