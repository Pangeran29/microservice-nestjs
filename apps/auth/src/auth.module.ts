import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
      validationSchema: Joi.object({
        HTTP_PORT: Joi.string().required(),
        TCP_PORT: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        PREFIX_NAME: Joi.string().required()
      })
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
