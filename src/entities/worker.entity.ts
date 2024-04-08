import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import {SubCategory} from "./subcategory.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Worker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    photo: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    surname: string;

    @Column()
    @ApiProperty()
    lastname: string;

    @Column()
    @ApiProperty()
    phone: string;

    @Column({
        type: 'date',
        nullable: true
    })
    @ApiProperty({description: "dd.mm.yyyy"})
    birthday: Date | null;

    @Column()
    @ApiProperty()
    gender: string;

    @Column()
    @ApiProperty()
    city: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty({description: 'string or null'})
    rating: number | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}
