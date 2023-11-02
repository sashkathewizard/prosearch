import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {UsersService} from '../../services/users.service';
import {User} from '../../entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    //get all users
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    //get user by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        } else {
            return user;
        }
    }
    //create user
    @Post()
    async create(@Body() user: User): Promise<User> {
        try {
            return this.usersService.create(user);
        } catch (error) {
            // Винятки можна обробити, наприклад, у разі некоректних даних користувача
            throw new BadRequestException('Invalid user data');
        }
    }
    //update user
    @Put(':id')
    async update (@Param('id') id: number, @Body() user: User): Promise<any> {
        return this.usersService.update(id, user);
    }
    //delete user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return this.usersService.delete(id);
    }
}