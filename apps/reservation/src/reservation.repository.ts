import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReservationDocument } from "./models/reservation.models";

@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationDocument> {
  protected logger = new Logger(ReservationRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>
  ) {
    super(reservationModel);
  }
}