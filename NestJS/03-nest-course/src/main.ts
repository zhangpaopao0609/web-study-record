import { TimeOutInterceptor } from './interceptors/time-out.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import { WrapResponseInterceptor } from './interceptors';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { DEVPORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeOutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('IloveCoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    options,
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(DEVPORT);
}
bootstrap();
