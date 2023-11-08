import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import {SubCategory} from "./subcategory.entity";

@Entity()
export class Worker {
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
    lastname: string;

    @Column()
    phone: string;

    @Column({
        type: 'date',
        nullable: true
    })
    birthday: Date | null;

    @Column()
    gender: string;

    @Column()
    city: string;

    @Column()
    description: string;

    @ManyToMany(() => SubCategory)
    @JoinTable({
        name: 'worker_subcategory',
        joinColumn: {
            name: 'specialist_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'subcategory_id',
            referencedColumnName: 'id',
        },
    })
    categories: SubCategory[];

    @Column()
    rating: number | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}
