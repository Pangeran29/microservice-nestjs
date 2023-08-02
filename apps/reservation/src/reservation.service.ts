import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE)
    private readonly paymentService: ClientProxy
  ) { }

  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    const { _id, email } = user;

    return this.paymentService
      .send('create_charge', { email })
      .pipe(
        map(async (res) => {          
          const createdReservation = await this.reservationRepository.create({
            ...createReservationDto,
            isPaid: false,
            invoiceId: res?.id,
            timestamp: new Date(),
            userId: _id
          });

          return { 
            message: 'Please finish your order in below url.',
            stripePaymentUrl: res?.url,
            data: createdReservation
          };
        })
      )
  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate({ _id }, {
      $set: updateReservationDto
    });
  }

  async remove(_id: string) {
    return await this.reservationRepository.findOneAndDelete({ _id });
  }
}
