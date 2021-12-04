import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const address = config.get('app.address');
  const port = config.get('app.port');

  await app.listen(port, address);
  Logger.log(`App listen on http://${address}:${port}`);
}

bootstrap();
