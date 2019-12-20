import { Ingredient, UsMeasure, MetricMeasure } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Measure extends BaseEntity<Measure> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column(() => UsMeasure)
    public us: UsMeasure;

    @Column(() => MetricMeasure)
    public metric: MetricMeasure;

    @ManyToOne(() => Ingredient, ingredient => ingredient.measurements)
    public ingredient: Ingredient;

    getDefault (): Measure {
        const measure = new Measure();
        measure.id = 0;
        measure.ingredient = null;
        measure.metric = null;
        measure.us = null;

        return measure;
    }
}
