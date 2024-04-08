import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {Category} from "./category.entity";
import {Order} from "./order.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ description: 'The title of the subcategory' })
    title: string;

    @OneToMany(() => Order, order => order.subcategory)
    orders: Order[];

    @ManyToOne(() => Category, category => category.subcategories)
    @ApiProperty({ type: () => Category, description: 'The category to which this subcategory belongs' })
    category: Category;

}
