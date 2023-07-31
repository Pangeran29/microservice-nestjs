import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './user/models/user.schema';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(
    @CurrentUser() user: UserDocument,
  ) {
    return { ...user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @CurrentUser() user: UserDocument,
  ) {
    const token = await this.authService.login(user);
    return { ...user, token };
  }
}
