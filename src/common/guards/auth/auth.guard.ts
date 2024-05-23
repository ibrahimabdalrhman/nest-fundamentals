import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('auth working ');
    const jwt = 'qwqfrwqefwefwefwefwef';
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const token = req.header('Authorization').split(' ')[1];
    console.log(token);

    return token === jwt;
  }
}
