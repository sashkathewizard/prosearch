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

    @Column()
    birthdate: string;

    @Column()
    gender: string;

    @Column()
    city: string;

    @Column()
    description: string;

    @ManyToMany(() => SubCategory)
    @JoinTable({
        name: 'specialist_subcategory', // Ім'я таблиці-сполучника
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
    rating: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}
