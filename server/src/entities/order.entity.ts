import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Worker} from "./worker.entity";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Worker)
    worker: Worker;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    city: string;

    @Column({ type: 'date'})
    date: string;

    @Column()
    price: number;

    @Column()
    status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}