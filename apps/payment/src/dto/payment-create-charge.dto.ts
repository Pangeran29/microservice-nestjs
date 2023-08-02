import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateChargeDto } from "./create-charge.dto";

export class PaymentCreateChrageDto extends CreateChargeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}