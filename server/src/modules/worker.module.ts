import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Worker} from "../entities/worker.entity";
import {WorkerController} from "../api/controllers/worker.controller";
import {WorkerService} from "../services/worker.service";

@Module({
    imports: [TypeOrmModule.forFeature([Worker])],
    controllers: [WorkerController],
    providers: [WorkerService]
})
export class WorkerModule {}