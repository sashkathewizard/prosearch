import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {Worker} from "../../entities/worker.entity";
import {SubcategoryService} from "../../services/subcategory.service";
import {SubCategory} from "../../entities/subcategory.entity";
import {OrderService} from "../../services/order.service";
import {Order} from "../../entities/order.entity";
import {parse} from "date-fns";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('orders')
@ApiTags('Orders')
export class OrderController{
    constructor(private readonly OrderService: OrderService) {}

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({
        status: 200,
        description: 'Return all orders',
    })
    async findAll(): Promise<Order[]> {
        return this.OrderService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an order by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return an order by ID',
    })
    async findOne(@Param('id') id: number): Promise<Order> {
        const order: Order = await this.OrderService.findOne(id);
        if (!order) {
            throw new NotFoundException('User does not exist!');
        } else {
            return order;
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({
        status: 201,
        description: 'Return the created order',
    })
    async create(@Body() order: Order): Promise<Order> {
        try {
            order.date = parse(order.date.toString(), 'dd.MM.yyyy', new Date());
            return this.OrderService.create(order);
        } catch (error) {
            throw new BadRequestException('Invalid subcategory data');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an order by ID' })
    @ApiResponse({
        status: 200,
        description: 'Update an order by ID',
    })
    async update (@Param('id') id: number, @Body() order: Order): Promise<any> {
        return this.OrderService.update(id, order);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order by ID' })
    @ApiResponse({
        status: 200,
        description: 'Delete an order by ID',
    })
    async delete(@Param('id') id: number): Promise<any> {
        const order = await this.OrderService.findOne(id);
        if (!order) {
            throw new NotFoundException('SubCategory does not exist!');
        }
        return this.OrderService.delete(id);
    }
}