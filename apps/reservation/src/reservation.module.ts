import { Module } from '@nestjs/common';
import { AUTH_SERVICE, DatabaseModule, JwtAuthGuard, LoggerModule } from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.models';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
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
      }
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/reservation/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        MONGODB_URI: Joi.string().required()
      })
    }),
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema
      }
    ])
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
  ]
})
export class ReservationModule { }
