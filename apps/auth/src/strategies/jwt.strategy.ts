import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate({ userId }: TokenPayload) {
    return await this.userService.getUser({ _id: userId });
  }
}