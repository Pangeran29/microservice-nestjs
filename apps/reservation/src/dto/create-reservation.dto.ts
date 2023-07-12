import { Types } from "mongoose";
import { ReservationDocument } from "../models/reservation.models";

export class CreateReservationDto implements Partial<ReservationDocument> {
  startDate: Date;
  endDate: Date;
  placeId: string;
  invoiceId: string;
}
