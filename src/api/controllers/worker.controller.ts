import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {WorkerService} from '../../services/worker.service';
import {Worker} from "../../entities/worker.entity";

@Controller('workers')
export class WorkerController {
    constructor(private readonly WorkerService: WorkerService) {}

    @Get()
    async findAll(): Promise<Worker[]> {
        return this.WorkerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Worker> {
        const worker = await this.WorkerService.findOne(id);
        if (!worker) {
            throw new NotFoundException('User does not exist!');
        } else {
            return worker;
        }
    }

    // @Post()
    // async create(@Body() worker: Worker): Promise<Worker> {
    //     try {
    //         return this.WorkerService.create(worker);
    //     } catch (error) {
    //         // Винятки можна обробити, наприклад, у разі некоректних даних користувача
    //         throw new BadRequestException('Invalid user data');
    //     }
    // }

    @Put(':id')
    async update (@Param('id') id: number, @Body() worker: Worker): Promise<any> {
        return this.WorkerService.update(id, worker);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const worker: Worker = await this.WorkerService.findOne(id);
        if (!worker) {
            throw new NotFoundException('Worker does not exist!');
        }
        return this.WorkerService.delete(id);
    }
}