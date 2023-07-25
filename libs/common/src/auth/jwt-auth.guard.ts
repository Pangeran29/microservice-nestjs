import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable, map, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants/service";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from '@app/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy
  ) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      return false;
    }
    
    const token = bearerToken.split(' ')[1];
    return this.authClient.send<UserDto>('authenticate', { authToken: token }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true)
    );
  }
}
