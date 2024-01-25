import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Worker} from "../entities/worker.entity";
import {In, Like, Repository} from "typeorm";
import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';
import {SubCategory} from "../entities/subcategory.entity";
import {User} from "../entities/user.entity";
import {Express} from "express";
import {S3Service} from "../s3/s3.service";

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Worker)
        private workerRepository: Repository<Worker>,
        private s3Service: S3Service
    ) {}

    async findAll(): Promise<Worker[]> {
        return this.workerRepository.find();
    }

    async search(searchTerm: string): Promise<Worker[]> {
        return this.workerRepository.find({
            where: [
                { name: Like(`%${searchTerm}%`) },
                { surname: Like(`%${searchTerm}%`) },
                { lastname: Like(`%${searchTerm}%`) },
            ],
        });
    }

    async findOne(id: number): Promise<Worker> {
        return this.workerRepository.findOne({ where: { id } });
    }

    async create(worker: Partial<Worker>, password: string): Promise<Worker> {
        if (worker.birthday) {
            worker.birthday = parse(worker.birthday.toString(), 'dd.MM.yyyy', new Date());
        }
        if(worker.rating){
            worker.rating = +worker.rating;
        }
        worker.password = password;
        await this.workerRepository.save(worker)
        return await this.workerRepository.save(worker);
    }

    async update(id: number, worker: Partial<Worker>): Promise<Worker> {
        if (worker.birthday) {
            worker.birthday = parse(worker.birthday.toString(), 'dd.MM.yyyy', new Date());
        }
        if(worker.rating){
            worker.rating = +worker.rating;
        }
        await this.workerRepository.update(id, worker);
        return this.workerRepository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.workerRepository.delete(id);
    }

    async findByEmail(email: string): Promise<Worker | undefined> {
        return this.workerRepository.findOne({ where: { email }});
    }

    async addPhoto(id: number, file: Express.Multer.File){
        const user = await this.workerRepository.findOne({ where: { id } });

        const key = `${file.fieldname}${Date.now()}`

        const imageUrl = await this.s3Service.uploadFile(file, key);

        await this.workerRepository.update(id, {photo: imageUrl});
    }
}