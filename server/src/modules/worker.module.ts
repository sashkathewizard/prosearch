import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Worker} from "../entities/worker.entity";
import {WorkerController} from "../api/controllers/worker.controller";
import {WorkerService} from "../services/worker.service";
import {AuthModule} from "../auth/auth.module";
import {SubcategoryModule} from "./subcategory.module";
import {SubcategoryService} from "../services/subcategory.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Worker]),
        forwardRef(() => AuthModule),
        SubcategoryModule,
    ],
    controllers: [WorkerController],
    providers: [WorkerService],
    exports:[
        WorkerService
    ]
})
export class WorkerModule {}