import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BaseEntity, Measure, Ingredient } from '@entity';

@Entity()
export class Measures extends BaseEntity<Measures> {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Ingredient, ingredient => ingredient.measures)
    public ingredient: Ingredient;

    @Column(() => Measure, { prefix: 'us_' })
    public us: Measure;

    @Column(() => Measure, { prefix: 'metric_' })
    public metric: Measure;

    public getDefault (): Measures {
        const measures = new Measures();
        measures.id = 0;
        measures.ingredient = null;
        measures.us = null;
        measures.metric = null;

        return measures;
    }
}
