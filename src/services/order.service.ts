import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {SubCategory} from "../entities/subcategory.entity";
import {Order} from "../entities/order.entity";

@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({relations: ['user', 'worker', 'subcategory'] });
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id }, relations: ['user', 'worker', 'subcategory'] });
    }

    async create(Order: Partial<Order>): Promise<Order> {
        const newOrder: Order = this.orderRepository.create(Order);
        return this.orderRepository.save(newOrder);
    }
    async update(id: number, Order: Partial<Order>): Promise<Order> {
        await this.orderRepository.update(id, Order);
        return this.orderRepository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }
}