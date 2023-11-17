import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {Worker} from "../../entities/worker.entity";
import {SubcategoryService} from "../../services/subcategory.service";
import {SubCategory} from "../../entities/subcategory.entity";
import {OrderService} from "../../services/order.service";
import {Order} from "../../entities/order.entity";

@Controller('orders')
export class OrderController{
    constructor(private readonly OrderService: OrderService) {}

    @Get()
    async findAll(): Promise<Order[]> {
        return this.OrderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Order> {
        const order: Order = await this.OrderService.findOne(id);
        if (!order) {
            throw new NotFoundException('User does not exist!');
        } else {
            return order;
        }
    }

    @Post()
    async create(@Body() order: Order): Promise<Order> {
        try {
            order.date = new Date(order.date);
            return this.OrderService.create(order);
        } catch (error) {
            throw new BadRequestException('Invalid subcategory data');
        }
    }

    @Put(':id')
    async update (@Param('id') id: number, @Body() order: Order): Promise<any> {
        return this.OrderService.update(id, order);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        const order = await this.OrderService.findOne(id);
        if (!order) {
            throw new NotFoundException('SubCategory does not exist!');
        }
        return this.OrderService.delete(id);
    }
}