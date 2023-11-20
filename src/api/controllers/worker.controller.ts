import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
import {WorkerService} from '../../services/worker.service';
import {Worker} from "../../entities/worker.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('workers')
@ApiTags('Workers')
export class WorkerController {
    constructor(private readonly WorkerService: WorkerService) {}

    @Get()
    @ApiOperation({ summary: 'Get all workers' })
    @ApiResponse({
        status: 200,
        description: 'Return all workers',
    })
    async findAll(): Promise<Worker[]> {
        return this.WorkerService.findAll();
    }

    @Get('search')
    @ApiOperation({ summary: 'Search for workers' })
    @ApiResponse({
        status: 200,
        description: 'Return workers matching the search prompt',
    })
    async search(@Query('prompt') prompt: string): Promise<Worker[]> {
        console.log(prompt);
        return this.WorkerService.search(prompt);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a worker by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return a worker by ID',
    })
    async findOne(@Param('id') id: number): Promise<Worker> {
        const worker = await this.WorkerService.findOne(id);
        if (!worker) {
            throw new NotFoundException('User does not exist!');
        } else {
            return worker;
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a worker by ID' })
    @ApiResponse({
        status: 200,
        description: 'Update a worker by ID',
    })
    async update (@Param('id') id: number, @Body() worker: Worker): Promise<any> {
        return this.WorkerService.update(id, worker);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a worker by ID' })
    @ApiResponse({
        status: 200,
        description: 'Delete a worker by ID',
    })
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const worker: Worker = await this.WorkerService.findOne(id);
        if (!worker) {
            throw new NotFoundException('Worker does not exist!');
        }
        return this.WorkerService.delete(id);
    }
}