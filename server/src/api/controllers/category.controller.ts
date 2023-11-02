import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../entities/category.entity";

@Controller('categories')
export class CategoryController{
    constructor(private readonly CategoryService: CategoryService) {}
    //get all users
    @Get()
    async findAll(): Promise<Category[]> {
        return this.CategoryService.findAll();
    }
    //get user by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Category> {
        const category = await this.CategoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('User does not exist!');
        } else {
            return category;
        }
    }
    //create user
    @Post()
    async create(@Body() category: Category): Promise<Category> {
        try {
            return this.CategoryService.create(category);
        } catch (error) {
            // Винятки можна обробити, наприклад, у разі некоректних даних користувача
            throw new BadRequestException('Invalid user data');
        }
    }
    //update user
    @Put(':id')
    async update (@Param('id') id: number, @Body() category: Category): Promise<any> {
        return this.CategoryService.update(id, category);
    }
    //delete user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const category: Category = await this.CategoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('User does not exist!');
        }
        return this.CategoryService.delete(id);
    }
}