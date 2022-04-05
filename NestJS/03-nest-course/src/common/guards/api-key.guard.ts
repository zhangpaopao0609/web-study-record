import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from 'src/decorators';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;
    const request = context
      .switchToHttp()
      .getRequest<Request>();

    const api_key = request.header('Authorization');
    return true;
  }
}
