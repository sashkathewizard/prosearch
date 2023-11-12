import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, OneToMany} from 'typeorm';
import {SubCategory} from "./subcategory.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => SubCategory, subcategory => subcategory.category)
    subcategories: SubCategory[];
}
