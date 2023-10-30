import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
start();
