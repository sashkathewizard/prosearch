import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderController} from "../api/controllers/order.controller";
import {OrderService} from "../services/order.service";
import {Order} from "../entities/order.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [
        OrderService,
        TypeOrmModule
    ]
})

export class OrderModule{}