import { ReservationDocument } from "../models/reservation.models";
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ChargeDto } from "@app/common";

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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ChargeDto)
  charge: ChargeDto;
}
