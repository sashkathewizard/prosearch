import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../entities/category.entity";
import {Repository} from "typeorm";


@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: { id } });
    }

    async create(category: Partial<Category>): Promise<Category> {
        const newCategory:Category = this.categoryRepository.create(category);
        return this.categoryRepository.save(newCategory);
    }
    async update(id: number, category: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}