import { MeasureUS, MeasureMetric, Ingredient } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Measure extends BaseEntity<Measure> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column(() => MeasureUS)
    public us: MeasureUS;

    @Column(() => MeasureMetric)
    public metric: MeasureMetric;

    @ManyToOne(() => Ingredient, ingredient => ingredient.measurements)
    public ingredient: Ingredient;

    getDefault (): Measure {
        const measure = new Measure();
        measure.id = 0;
        measure.us = null;
        measure.metric = null;
        measure.ingredient = null;

        return measure;
    }
}
