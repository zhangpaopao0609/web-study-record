import { NestFactory } from '@nestjs/core';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeOutInterceptor } from './common/interceptors/time-out.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true,  // 看情形是否开启
    }),
    new ParseIntPipe(),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalGuards(new AuthGuard());

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeOutInterceptor(),
  );
  await app.listen(3333);
}
bootstrap();
