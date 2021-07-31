import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  if (config.get('NODE_ENV') === 'prod') {
    app.enableCors({
      origin: [],
    });
  } else {
    app.enableCors({ origin: '*' });
  }
  app.use(json());
  app.use(urlencoded({ extended: true }));
  await app.listen(config.get('PORT'));
  Logger.log(`HTTP app running in port: ${config.get('PORT')}`);
}
bootstrap();
