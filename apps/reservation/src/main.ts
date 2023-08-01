import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { SwaggerBuildFactory } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useLogger(app.get(Logger));
  app.enableCors();
  const configService = app.get(ConfigService);
  const prefix = configService.get('PREFIX_NAME');
  app.setGlobalPrefix(prefix);
  SwaggerBuildFactory(app);
  await app.listen(configService.get<number>('PORT'));
  console.log(`Swagger is running on: ${await app.getUrl()}/${prefix}/docs`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
