import { Column } from 'typeorm';
import { BaseEntity } from '@entity';

export class InstructionStepLength extends BaseEntity<InstructionStepLength> {
    @Column()
    public number: number;

    @Column()
    public unit: string;

    getDefault (): InstructionStepLength {
        const stepLength = new InstructionStepLength();
        stepLength.number = 0;
        stepLength.unit = '';

        return stepLength;
    }
}
