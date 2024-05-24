import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //handing Public
    const isPublic = this.reflector.get<boolean>(
      'Is_Public',
      context.getHandler(),
    );
    if (isPublic) {
      console.log('public.......');

      return true;
    }

    console.log('auth working ');
    const jwt = 'qwqfrwqefwefwefwefwef';
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const token = req.header('Authorization').split(' ')[1];
    console.log(token);

    return token === jwt;
  }
}
