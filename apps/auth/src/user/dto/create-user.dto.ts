import { IsEmail, IsStrongPassword } from "class-validator";
import { UserDocument } from "../models/user.schema";
import { Types } from "mongoose";

export class CreateUserDto implements Partial<UserDocument> {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
