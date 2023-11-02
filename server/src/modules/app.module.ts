import { Module } from '@nestjs/common';
import { AppController } from 'api/controllers/app.controller';
import { AppService } from 'services/app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

import {UsersModule} from "./users.module";
import {ConfigModule} from "@nestjs/config";
import {User} from "../entities/user.entity";

import {Worker} from "../entities/worker.entity";
import {WorkerModule} from "./worker.module";


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    WorkerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DATABASE || "postgres",
      entities: [User, Worker],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
