import {Body, Controller, Post} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../dto/create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() user: User){
        return this.authService.registration(user);
    }
}
