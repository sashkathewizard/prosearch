import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
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
    phone: string;

    @Column({
        default: () => 'user'
    })
    role: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdDate: Date;
}
