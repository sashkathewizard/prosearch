import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import {UsersService} from '../../services/users.service';
import {User} from '../../entities/user.entity';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";
import {Express} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users', description: 'Retrieve a list of all users.' })
    @ApiResponse({ status: 200, description: 'Successful operation', type: User, isArray: true })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID', description: 'Retrieve user details by ID.' })
    @ApiResponse({ status: 200, description: 'Successful operation', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        } else {
            return user;
        }
    }

    // @Post()
    // async create(@Body() user: User): Promise<User> {
    //     try {
    //         return this.usersService.create(user);
    //     } catch (error) {
    //         throw new BadRequestException('Invalid user data');
    //     }
    // }

    @Put(':id')
    @ApiOperation({description: 'put'})
    async update (@Param('id') id: number, @Body() user: User): Promise<any> {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    @ApiOperation({description: 'delete'})
    async delete(@Param('id') id: number): Promise<any> {
        //handle error if user does not exist
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return this.usersService.delete(id);
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post(':id/upload-image')
    @ApiOperation({ summary: 'Upload photo', description: 'send file: header: file, and file. thats all!' })
    async addImage(@UploadedFile() file: Express.Multer.File,
                   @Param('id') id: number) {
        console.log(file);

        return await this.usersService.addPhoto(id, file);
    }


}