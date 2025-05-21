import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Tus módulos
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosMaquillajeModule } from './productos_maquillaje/productos-maquillaje.module';
import { ProductTestsModule } from './product-tests/product-tests.module';
import { OrderAndTransactionsModule } from './order-and-transactions/order-and-transactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 👈 Cargar .env

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true, // Solo en desarrollo
    }),

    // Módulos de tu app
    AuthModule,
    UsuariosModule,
    ProductosMaquillajeModule,
    ProductTestsModule,
    OrderAndTransactionsModule,
  ],
})
export class AppModule {}
