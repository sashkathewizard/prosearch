import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {

  let port = process.env.PORT || 3001
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
      .setTitle('Prosearch-api')
      .setDescription('Cursach Khomanets PI-202')
      .setVersion('v1')
      .addTag('prosearch')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server listen port: ${port}, working`)
}
start();
