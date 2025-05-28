import * as dotenv from 'dotenv';
dotenv.config();

import * as dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Un solo enableCors con múltiples orígenes
  app.enableCors({
    origin: [
      'https://glam-giant-front.vercel.app', // producción
      'http://localhost:3000'                 // desarrollo local
    ],
    credentials: true,
  });

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
