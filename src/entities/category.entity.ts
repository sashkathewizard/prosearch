import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, OneToMany} from 'typeorm';
import {SubCategory} from "./subcategory.entity";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ description: 'The title of the category' })
    title: string;

    @OneToMany(() => SubCategory, subcategory => subcategory.category)
    subcategories: SubCategory[];
}
