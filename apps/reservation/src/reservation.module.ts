import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.models';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,    
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
    ReservationRepository
  ]
})
export class ReservationModule {}
