import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order.entity";
import {Worker} from "./worker.entity";

@Entity()
export class Review{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Order)
    order: Order;

    @Column()
    rating: number;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}