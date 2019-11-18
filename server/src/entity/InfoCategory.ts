import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InfoQuestion } from './InfoQuestion';

@Entity()
export class InfoCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @OneToMany(type => InfoQuestion, question => question.category)
    questions: InfoQuestion[];
    
}
