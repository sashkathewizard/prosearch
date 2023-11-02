import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {WorkerService} from '../../services/worker.service';
import {Worker} from "../../entities/worker.entity";

@Controller('workers')
export class WorkerController {
    constructor(private readonly WorkerService: WorkerService) {}
    //get all users
    @Get()
    async findAll(): Promise<Worker[]> {
        return this.WorkerService.findAll();
    }
    //get user by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Worker> {
        const worker = await this.WorkerService.findOne(id);
        if (!worker) {
            throw new NotFoundException('User does not exist!');
        } else {
            return worker;
        }
    }
    //create user
    @Post()
    async create(@Body() worker: Worker): Promise<Worker> {
        try {
            return this.WorkerService.create(worker);
        } catch (error) {
            // Винятки можна обробити, наприклад, у разі некоректних даних користувача
            throw new BadRequestException('Invalid user data');
        }
    }
    //update user
    @Put(':id')
    async update (@Param('id') id: number, @Body() worker: Worker): Promise<any> {
        return this.WorkerService.update(id, worker);
    }
    //delete user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const user = await this.WorkerService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return this.WorkerService.delete(id);
    }
}