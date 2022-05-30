import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { WrapResponseInterceptor } from './interceptors/wrap-response.interceptor';
import { TimeOutInterceptor } from './interceptors/time-out.interceptor';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true, // 看情形是否开启
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeOutInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('Open Api')
    .setDescription('Open Api Document')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
