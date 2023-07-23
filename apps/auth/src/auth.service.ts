import { Injectable } from '@nestjs/common';
import { UserDocument } from './user/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }


  async login(user: UserDocument) {
    const { _id } = user;
    const tokenPayload: TokenPayload = {
      userId: _id.toHexString(),
    }

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const token = await this.jwtService.signAsync(tokenPayload);
          
    return token;
  }
}
