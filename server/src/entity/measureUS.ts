import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class MeasureUS extends BaseEntity<MeasureUS> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public amount: number;

    @Column()
    public unitShort: string;

    @Column()
    public unitLong: string;

    getDefault (): MeasureUS {
        const measureUS = new MeasureUS();
        measureUS.id = 0;
        measureUS.amount = 1;
        measureUS.unitShort = '';
        measureUS.unitLong = '';

        return measureUS;
    }
}
