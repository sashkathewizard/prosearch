import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {SubCategory} from "../entities/subcategory.entity";

@Injectable()
export class SubcategoryService{
    constructor(
        @InjectRepository(SubCategory)
        private subCategoryRepository: Repository<SubCategory>,
    ) {}

    async findAll(): Promise<SubCategory[]> {
        return this.subCategoryRepository.find();
    }

    async findOne(id: number): Promise<SubCategory> {
        return this.subCategoryRepository.findOne({ where: { id } });
    }

    async create(subCategory: Partial<SubCategory>): Promise<SubCategory> {
        const newSubCategory = this.subCategoryRepository.create(subCategory);
        return this.subCategoryRepository.save(subCategory);
    }
    async update(id: number, subCategory: Partial<SubCategory>): Promise<SubCategory> {
        await this.subCategoryRepository.update(id, subCategory);
        return this.subCategoryRepository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.subCategoryRepository.delete(id);
    }
}