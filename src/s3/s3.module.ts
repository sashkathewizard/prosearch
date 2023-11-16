import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [S3Service],
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), S3Module],
  exports: [S3Service]
})
export class S3Module {}
