import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../entities/category.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('categories')
@Controller('categories')
export class CategoryController{
    constructor(private readonly CategoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'List of categories', type: Category, isArray: true })
    async findAll(): Promise<Category[]> {
        return this.CategoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by ID' })
    @ApiResponse({ status: 200, description: 'Category by ID', type: Category })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async findOne(@Param('id') id: number): Promise<Category> {
        const category = await this.CategoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('User does not exist!');
        } else {
            return category;
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully', type: Category })
    @ApiResponse({ status: 400, description: 'Invalid category data' })
    async create(@Body() category: Category): Promise<Category> {
        try {
            return this.CategoryService.create(category);
        } catch (error) {
            throw new BadRequestException('Invalid Category smth');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category by ID' })
    @ApiResponse({ status: 200, description: 'Category updated successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async update (@Param('id') id: number, @Body() category: Category): Promise<any> {
        return this.CategoryService.update(id, category);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete category by ID' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const category: Category = await this.CategoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('User does not exist!');
        }
        return this.CategoryService.delete(id);
    }
}