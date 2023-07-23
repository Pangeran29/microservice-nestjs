import { IsNotEmpty } from "class-validator";

export class GetUserDto {
  @IsNotEmpty()
  @IsNotEmpty()
  _id: string;
}