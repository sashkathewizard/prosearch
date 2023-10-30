// user.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    phone: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}
