import {Body, Controller, Post} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {Worker} from "../entities/worker.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Login user or worker' })
    @ApiResponse({
        status: 200,
        description: 'token',
    })
    login(@Body() userDto: CreateUserDto){
        if(userDto.type === 'user'){
            return this.authService.login(userDto);
        } else {
            return this.authService.loginW(userDto);
        }

    }

    @Post('/registration')
    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({
        status: 200,
        description: 'token',
    })
    registration(@Body() user: User){
        return this.authService.registration(user);
    }

    @Post('/registration-worker')
    @ApiOperation({ summary: 'Register worker' })
    @ApiResponse({
        status: 200,
        description: 'token',
    })
    registrationW(@Body() worker: Worker){
        return this.authService.registrationW(worker);
    }
}
