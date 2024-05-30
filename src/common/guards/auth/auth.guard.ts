import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = "mbljgbjjbnbbdejbiojhediogbjeuoidjbej";

    // handling public guards
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      console.log('Public endpoint accessed');
      return true;
    }

    // handing authorization
    console.log('Authorization check');
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const token = request.header('Authorization') ? request.header('Authorization').split(' ')[1] : '';
    console.log(`Token: ${token}`);

    if (token !== jwt) {
      throw new UnauthorizedException("Invalid token");
    }
    return true;
  }
}
