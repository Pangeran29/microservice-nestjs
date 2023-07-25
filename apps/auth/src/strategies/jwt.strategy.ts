import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {          
          const bearerToken: string = request?.headers?.authorization;
          if (bearerToken) {
            return bearerToken.split(' ')[1];
          }
          else if (request?.authToken) {
            return request.authToken;
          }
          else {
            return undefined;
          }
        }
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate({ userId }: TokenPayload) {
    return await this.userService.getUser({ _id: userId });
  }
}