import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class MeasureMetric extends BaseEntity<MeasureMetric> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public amount: number;

    @Column()
    public unitShort: string;

    @Column()
    public unitLong: string;

    getDefault (): MeasureMetric {
        const measureUS = new MeasureMetric();
        measureUS.id = 0;
        measureUS.amount = 1;
        measureUS.unitShort = '';
        measureUS.unitLong = '';

        return measureUS;
    }
}
