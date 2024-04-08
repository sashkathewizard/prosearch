import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../modules/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {WorkerModule} from "../modules/worker.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => WorkerModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || "SECRET",
        signOptions: {
          expiresIn: '24h'
        }
      })
  ],
    exports:[
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
