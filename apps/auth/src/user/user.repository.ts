import { UserDocument } from "@app/common";
import { AuthAbstractRepository } from "@app/common/database/auth-abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends AuthAbstractRepository<UserDocument> {
  constructor(
    @InjectModel(UserDocument.name) userModel: Model<UserDocument>
  ) {
    super(userModel);
  }
}