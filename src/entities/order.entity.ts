import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Worker} from "./worker.entity";
import {Category} from "./category.entity";
import {SubCategory} from "./subcategory.entity";
import {ApiProperty} from "@nestjs/swagger";
import {isNumber} from "@nestjs/common/utils/shared.utils";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @ApiProperty({ type: () => User, description: 'U can send id' })
    user: User;

    @ManyToOne(() => Worker)
    @ApiProperty({ type: () => Worker, description: 'U can send id' })
    worker: Worker;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    city: string;

    @Column({ type: 'date'})
    @ApiProperty({description: 'dd.mm.yyyy'})
    date: Date;

    @Column()
    @ApiProperty()
    price: number;

    @Column({
        default: 'pending'
    })
    @ApiProperty({description: 'u can send or can not send'})
    status: string;

    @ManyToOne(() => SubCategory, Subcategory => Subcategory.orders)
    @ApiProperty({type: () => SubCategory, description: "U can send id"})
    subcategory: SubCategory;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}