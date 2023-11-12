import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
        await this.userRepository.save(user)
        return user;
    }
}