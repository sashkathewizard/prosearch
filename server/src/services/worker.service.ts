import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Worker} from "../entities/worker.entity";
import {In, Repository} from "typeorm";
import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';
import {SubCategory} from "../entities/subcategory.entity";

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Worker)
        private workerRepository: Repository<Worker>
    ) {}

    async findAll(): Promise<Worker[]> {
        return this.workerRepository.find();
    }

    async findOne(id: number): Promise<Worker> {
        return this.workerRepository.findOne({ where: { id } });
    }

    async create(worker: Partial<Worker>): Promise<Worker> {
        if (worker.birthday) {
            worker.birthday = parse(worker.birthday.toString(), 'dd.MM.yyyy', new Date());
        }
        if(worker.rating){
            worker.rating = +worker.rating;
        }
        const newWorker = this.workerRepository.create(worker);
        return this.workerRepository.save(newWorker);
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
}