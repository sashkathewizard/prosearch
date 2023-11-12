import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function start() {

  let port = process.env.PORT || 3001
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
  console.log(`Server listen port: ${port}`)
}
start();
