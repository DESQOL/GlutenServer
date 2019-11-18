import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { InfoCategory } from './InfoCategory';

@Entity()
export class InfoQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToMany(type => InfoCategory, category => category.questions, {
        cascade: true
    })
    @JoinTable()
    categories: InfoCategory[];

}
