import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {UsersController} from "../api/controllers/users.controller";
import {UsersService} from "../services/users.service";
import {AuthModule} from "../auth/auth.module";
import {S3Module} from "../s3/s3.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        S3Module
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}