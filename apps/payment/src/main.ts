import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  const configService = app.get(ConfigService);
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
