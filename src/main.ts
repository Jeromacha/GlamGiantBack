import * as dotenv from 'dotenv';
dotenv.config();

import * as dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); // 👈 Forzar IPv4

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 👈 Importa esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS para el frontend (ajusta la URL si es necesario)
  app.enableCors({
    origin: 'https://glam-giant-front.vercel.app',
    credentials: true,
  });
  app.enableCors({
    origin: 'http://localhost:3000', // 👈 Permite localhost para desarrollo
    credentials: true,
  });

  // 👇 Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  await app.listen(3001);
  console.log('🚀 Backend de GlamGiant corriendo en http://localhost:3001');
}
bootstrap();
