import { Response } from 'express';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // const response = context
    //   .switchToHttp()
    //   .getResponse<Response>();
    return next.handle().pipe(
      map((data) => ({
        code: 0,
        data,
        msg: 'success',
      })),
    );
  }
}
