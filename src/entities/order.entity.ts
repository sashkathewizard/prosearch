import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Worker} from "./worker.entity";
import {Category} from "./category.entity";
import {SubCategory} from "./subcategory.entity";

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
    date: Date;

    @Column()
    price: number;

    @Column({
        default: 'pending'
    })
    status: string;

    @ManyToOne(() => SubCategory, Subcategory => Subcategory.orders)
    subcategory: SubCategory;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}