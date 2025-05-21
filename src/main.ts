import * as dotenv from 'dotenv';
dotenv.config();

import * as dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); // 👈 Forzar IPv4

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 👈 Importa esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Agrega esto para mostrar errores detallados del DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true,   // Lanza error si hay propiedades extra
      transform: true,              // Convierte tipos automáticamente
      disableErrorMessages: false,  // 👈 Muestra mensajes de error completos
    }),
  );

  await app.listen(3000);
}
bootstrap();
