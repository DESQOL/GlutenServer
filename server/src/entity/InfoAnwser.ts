import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { InfoQuestion } from './InfoQuestion';

@Entity()
export class InfoAnwser {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => InfoQuestion)
    @JoinColumn()
    question: InfoQuestion;

    @Column()
    anwser: string;
    
}
