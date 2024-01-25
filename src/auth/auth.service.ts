import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {Worker} from "../entities/worker.entity";
import {UsersService} from "../services/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {CreateUserDto} from "../dto/create-user.dto";
import {CreateWorkerDto} from "../dto/create-worker.dto";
import {WorkerService} from "../services/worker.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private workerService: WorkerService) {
    }
    async login(user: CreateUserDto){
        const newuser= await this.validateUser(user);
        return this.generateToken(newuser);
    }

    async loginW(workerDto: CreateWorkerDto){
        const worker: Worker = await this.validateWorker(workerDto);
        return this.generateTokenWorker(worker);
    }

    async registration( user: User){
        const candidate = await this.userService.findByEmail(user.email);
        if (candidate){
            throw new HttpException('Користувача з таким email вже існує', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(user.password, 5);
        const newUser: User = await this.userService.create(user, hashPassword);
        return this.generateToken(newUser);
    }

    async registrationW(worker: Worker){
        const candidate: Worker = await this.workerService.findByEmail(worker.email);
            if (candidate){
                throw new HttpException('Спеціаліста з таким email вже існує', HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcrypt.hash(worker.password, 5);
            const newWorker: Worker = await this.workerService.create(worker, hashPassword);
            return this.generateTokenWorker(newWorker);
    }

    async generateToken(user: User ){
        const payload = {email: user.email, id: user.id, role: user.role, type: "User"}
        return {
            token: this.jwtService.sign(payload)
        }

    }

    async generateTokenWorker(worker: Worker){
        const payload = {email: worker.email, id: worker.id, type: "Worker"}
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

    private async validateWorker(workerDto: CreateWorkerDto) {
        const worker: Worker = await this.workerService.findByEmail(workerDto.email);
        if (worker) {
            const passwordEquals = await bcrypt.compare(workerDto.password, worker.password);
            if (passwordEquals) {
                return worker;
            }
        }
        throw new UnauthorizedException({message: "Некоректний email чи пароль"});
    }

}
