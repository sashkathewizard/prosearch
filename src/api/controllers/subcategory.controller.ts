import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {Worker} from "../../entities/worker.entity";
import {SubcategoryService} from "../../services/subcategory.service";
import {SubCategory} from "../../entities/subcategory.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('subcategories')
@ApiTags('Subcategories')
export class SubcategoryController{
    constructor(private readonly SubcategoryService: SubcategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all subcategories' })
    @ApiResponse({
        status: 200,
        description: 'Return all subcategories',
    })
    async findAll(): Promise<SubCategory[]> {
        return this.SubcategoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a subcategory by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return a subcategory by ID',
    })
    async findOne(@Param('id') id: number): Promise<SubCategory> {
        const subCategory: SubCategory = await this.SubcategoryService.findOne(id);
        if (!subCategory) {
            throw new NotFoundException('User does not exist!');
        } else {
            return subCategory;
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new subcategory' })
    @ApiResponse({
        status: 201,
        description: 'Return the created subcategory',
    })
    async create(@Body() subCategory: SubCategory): Promise<SubCategory> {
        try {
            return this.SubcategoryService.create(subCategory);
        } catch (error) {
            throw new BadRequestException('Invalid subcategory data');
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a subcategory by ID' })
    @ApiResponse({
        status: 200,
        description: 'Update a subcategory by ID',
    })
    async update (@Param('id') id: number, @Body() subCategory: SubCategory): Promise<any> {
        return this.SubcategoryService.update(id, subCategory);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a subcategory by ID' })
    @ApiResponse({
        status: 200,
        description: 'Delete a subcategory by ID',
    })
    async delete(@Param('id') id: number): Promise<any> {
        const subCategory = await this.SubcategoryService.findOne(id);
        if (!subCategory) {
            throw new NotFoundException('SubCategory does not exist!');
        }
        return this.SubcategoryService.delete(id);
    }
}