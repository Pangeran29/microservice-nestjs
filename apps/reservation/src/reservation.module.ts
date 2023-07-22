import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.models';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,    
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
