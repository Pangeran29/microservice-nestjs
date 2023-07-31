import { Module } from '@nestjs/common';
import { AUTH_SERVICE, DatabaseModule, JwtAuthGuard, LoggerModule, PAYMENT_SERVICE } from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.models';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT')
          }
        }),
        inject: [ConfigService]
      },
      {
        // PAYMENT_HOST="payment"
        // PAYMENT_PORT=3003
        name: PAYMENT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'payment',
            port: 3003
          }
        }),
        inject: [ConfigService]
      }
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/reservation/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.string().required(),
        PAYMENT_HOST: Joi.string().required(),
        PAYMENT_PORT: Joi.string().required()
      })
    }),
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema
      }
    ]),
    DatabaseModule,
    LoggerModule
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
  ]
})
export class ReservationModule { }
