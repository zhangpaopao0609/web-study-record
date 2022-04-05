import { Request } from 'express';
import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request>();

    return request.protocol;
  },
);
