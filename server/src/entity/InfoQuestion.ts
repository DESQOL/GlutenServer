import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InfoCategory } from './InfoCategory';

@Entity()
export class InfoQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToOne(type => InfoCategory, category => category.questions)
    category: InfoCategory;

}
