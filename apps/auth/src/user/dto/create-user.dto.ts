import { UserDocument } from "@app/common";
import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto implements Partial<UserDocument> {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
