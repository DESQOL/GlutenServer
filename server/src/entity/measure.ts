import { Column } from 'typeorm';
import { BaseEntity } from '@entity';

export class Measure extends BaseEntity<Measure> {
    @Column()
    public amount: number;

    @Column()
    public unitShort: string;

    @Column()
    public unitLong: string;

    getDefault (): Measure {
        const measure = new Measure();
        measure.amount = 0;
        measure.unitShort = '';
        measure.unitLong = '';

        return measure;
    }
}
