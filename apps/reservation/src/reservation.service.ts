import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    return await this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: 'adfadsf'
    });
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
