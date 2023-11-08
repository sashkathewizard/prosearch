import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategory} from "../entities/subcategory.entity";
import {SubcategoryController} from "../api/controllers/subcategory.controller";
import {SubcategoryService} from "../services/subcategory.service";


@Module({
    imports: [TypeOrmModule.forFeature([SubCategory])],
    controllers: [SubcategoryController],
    providers: [SubcategoryService]
})

export class SubcategoryModule{}