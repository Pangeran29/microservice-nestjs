import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { SwaggerBuildFactory } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT')
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  const prefix = configService.get('PREFIX_NAME');
  app.setGlobalPrefix(prefix);
  SwaggerBuildFactory(app);
  await app.listen(configService.get<number>('HTTP_PORT'));
  console.log(`Swagger is running on: ${await app.getUrl()}/${prefix}/docs`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
