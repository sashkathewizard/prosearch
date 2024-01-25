import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Worker} from "../entities/worker.entity";
import {WorkerController} from "../api/controllers/worker.controller";
import {WorkerService} from "../services/worker.service";
import {AuthModule} from "../auth/auth.module";
import {SubcategoryModule} from "./subcategory.module";
import {SubcategoryService} from "../services/subcategory.service";
import {S3Module} from "../s3/s3.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Worker]),
        forwardRef(() => AuthModule),
        SubcategoryModule,
        S3Module
    ],
    controllers: [WorkerController],
    providers: [WorkerService],
    exports:[
        WorkerService
    ]
})
export class WorkerModule {}