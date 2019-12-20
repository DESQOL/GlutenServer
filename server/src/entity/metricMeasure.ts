import { Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

export class MetricMeasure extends BaseEntity<MetricMeasure> {
    @Column()
    public amount: number;

    @Column()
    public unitShort: string;

    @Column()
    public unitLong: string;

    getDefault (): MetricMeasure {
        const metricMeasure = new MetricMeasure();
        metricMeasure.amount = 0;
        metricMeasure.unitShort = '';
        metricMeasure.unitLong = '';

        return metricMeasure;
    }
}
