import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {UsersController} from "../api/controllers/users.controller";
import {UsersService} from "../services/users.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}