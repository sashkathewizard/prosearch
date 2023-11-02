import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Category} from "./category.entity";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Category, category => category.subcategories)
    category: Category;

}
