import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Worker} from "../entities/worker.entity";
import {Repository} from "typeorm";

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Worker)
        private workerRepository: Repository<Worker>,
    ) {}

    async findAll(): Promise<Worker[]> {
        return this.workerRepository.find();
    }

    async findOne(id: number): Promise<Worker> {
        return this.workerRepository.findOne({ where: { id } });
    }

    async create(worker: Partial<Worker>): Promise<Worker> {
        const newWorker = this.workerRepository.create(worker);
        return this.workerRepository.save(newWorker);
    }
    async update(id: number, worker: Partial<Worker>): Promise<Worker> {
        await this.workerRepository.update(id, worker);
        return this.workerRepository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.workerRepository.delete(id);
    }
}