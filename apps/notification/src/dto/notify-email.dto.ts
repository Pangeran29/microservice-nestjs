import { IsEmail, IsNotEmpty, IsUrl } from "class-validator";

export class NotifyEmailDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUrl()
  paymentUrl: string;
}