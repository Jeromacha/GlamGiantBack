import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos existentes
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosMaquillajeModule } from './productos_maquillaje/productos-maquillaje.module';
import { ProductTestsModule } from './product-tests/product-tests.module';
import { OrderAndTransactionsModule } from './order-and-transactions/order-and-transactions.module';
import { AuthModule } from './auth/auth.module'; // ✅ IMPORTANTE

// Entidades
import { Usuario } from './usuarios/entities/usuario.entity';
import { ProductoMaquillaje } from './productos_maquillaje/entities/productos-maquillaje.entity';
import { ProductTest } from './product-tests/entities/product-test.entity';
import { OrderAndTransaction } from './order-and-transactions/entities/order-and-transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sebasadmin123',
      database: 'glamgiantdb',
      entities: [
        Usuario,
        ProductoMaquillaje,
        ProductTest,
        OrderAndTransaction,
      ],
      synchronize: true,
    }),
    AuthModule, // ✅ Asegúrate de incluirlo antes de usar guards de JWT
    UsuariosModule,
    ProductosMaquillajeModule,
    ProductTestsModule,
    OrderAndTransactionsModule,
  ],
})
export class AppModule {}
