import { Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

export class UsMeasure extends BaseEntity<UsMeasure> {
    @Column()
    public amount: number;

    @Column()
    public unitShort: string;

    @Column()
    public unitLong: string;

    getDefault (): UsMeasure {
        const usMeasure = new UsMeasure();
        usMeasure.amount = 0;
        usMeasure.unitShort = '';
        usMeasure.unitLong = '';

        return usMeasure;
    }
}
