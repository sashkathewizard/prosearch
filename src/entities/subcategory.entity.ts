import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {Category} from "./category.entity";
import {Order} from "./order.entity";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @OneToMany(() => Order, order => order.subcategory)
    // orders: Order[];

    @ManyToOne(() => Category, category => category.subcategories)
    category: Category;

}
