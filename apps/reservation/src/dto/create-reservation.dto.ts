import { Types } from "mongoose";
import { ReservationDocument } from "../models/reservation.models";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto implements Partial<ReservationDocument> {
  @IsDate()
  @Type(() => Date)
  startDate: Date;
  
  @IsDate()
  @Type(() => Date)
  endDate: Date;
  
  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsString()
  invoiceId: string;
}
