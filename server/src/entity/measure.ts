import { Ingredient } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Measure extends BaseEntity<Measure> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public amount: number;

    @Column()
    public unitShort: string;

    @Column()
    public unitLong: string;

    @ManyToOne(() => Ingredient, ingredient => ingredient.measurements)
    public ingredient: Ingredient;

    getDefault (): Measure {
        const measure = new Measure();
        measure.id = 0;
        measure.ingredient = null;

        return measure;
    }
}
