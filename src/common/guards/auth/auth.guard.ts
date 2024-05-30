import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = "mbljgbjjbnbbdejbiojhediogbjeuoidjbej";
    // handling public guards
    const isPublic = this.reflector.get<boolean>('IS_Public', context.getHandler());
    if (isPublic) {
      return true;
    }
    // handing authorization
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const token = request.header('Authorization')
      ? request.header('Authorization').split(' ')[1]
      : ''
    if (token !== jwt) {
      throw new UnauthorizedException("invalid token")
    }
    return true;
  }
}
