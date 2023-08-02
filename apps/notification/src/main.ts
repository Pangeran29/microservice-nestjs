import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  const configService = app.get(ConfigService);
  app.enableCors();
  app.connectMicroservice({
    Transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT')
    }
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
