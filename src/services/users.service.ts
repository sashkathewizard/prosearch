import {Injectable, UseGuards} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {Express} from "express";
import {S3Service} from "../s3/s3.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private s3Service: S3Service
    ) {}

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }
    async update(id: number, user: Partial<User>): Promise<User> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email }});
    }

    async create(user: User, password: string): Promise<User> {
        user.password = password;
        await this.userRepository.save(user);
        return user;
    }

    async addPhoto(id: number, file: Express.Multer.File){
        const user = await this.userRepository.findOne({ where: { id } });

        const key = `${file.fieldname}${Date.now()}`

        const imageUrl = await this.s3Service.uploadFile(file, key);

        await this.userRepository.update(id, {photo: imageUrl});
    }
}