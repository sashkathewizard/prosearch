import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {Worker} from "../../entities/worker.entity";
import {SubcategoryService} from "../../services/subcategory.service";
import {SubCategory} from "../../entities/subcategory.entity";

@Controller('subcategories')
export class SubcategoryController{
    constructor(private readonly SubcategoryService: SubcategoryService) {}

    @Get()
    async findAll(): Promise<SubCategory[]> {
        return this.SubcategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SubCategory> {
        const subCategory: SubCategory = await this.SubcategoryService.findOne(id);
        if (!subCategory) {
            throw new NotFoundException('User does not exist!');
        } else {
            return subCategory;
        }
    }

    @Post()
    async create(@Body() subCategory: SubCategory): Promise<SubCategory> {
        try {
            return this.SubcategoryService.create(subCategory);
        } catch (error) {
            throw new BadRequestException('Invalid subcategory data');
        }
    }

    @Put(':id')
    async update (@Param('id') id: number, @Body() subCategory: SubCategory): Promise<any> {
        return this.SubcategoryService.update(id, subCategory);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        const subCategory = await this.SubcategoryService.findOne(id);
        if (!subCategory) {
            throw new NotFoundException('SubCategory does not exist!');
        }
        return this.SubcategoryService.delete(id);
    }
}