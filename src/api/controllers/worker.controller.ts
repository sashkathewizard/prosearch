import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
import {WorkerService} from '../../services/worker.service';
import {Worker} from "../../entities/worker.entity";

@Controller('workers')
export class WorkerController {
    constructor(private readonly WorkerService: WorkerService) {}

    @Get()
    async findAll(): Promise<Worker[]> {
        return this.WorkerService.findAll();
    }

    @Get('search')
    async search(@Query('prompt') prompt: string): Promise<Worker[]> {
        console.log(prompt);
        return this.WorkerService.search(prompt);
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