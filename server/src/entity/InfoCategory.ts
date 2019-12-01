import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { InfoQuestion } from './InfoQuestion';

@Entity()
export class InfoCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => InfoQuestion, question => question.categories, {
        eager: true,
    })
    questions: InfoQuestion[];
    
}
