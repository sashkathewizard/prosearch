import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {UsersService} from "../services/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import passport from "passport";
import {throwIfEmpty} from "rxjs";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }
    async login(user: CreateUserDto){
        const newuser= await this.validateUser(user);
        return this.generateToken(newuser);
    }

    async registration( user: User){
        const candidate = await this.userService.findByEmail(user.email);
        if (candidate){
            throw new HttpException('Користувача з таким email вже існує', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(user.password, 5);
        const newuser: User = await this.userService.create(user, hashPassword);
        return this.generateToken(newuser);
    }

    async generateToken(user: User){
        const payload = {email: user.email, id: user.id, role: user.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user: User = await this.userService.findByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
        }
        throw new UnauthorizedException({ message: "Некоректний email чи пароль" });
    }

}
