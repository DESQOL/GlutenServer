import { Column } from 'typeorm';
import { BaseEntity } from '@entity';

export class InstructionStepLength extends BaseEntity<InstructionStepLength> {
    @Column({ default: 0 })
    public number: number;

    @Column({ default: '' })
    public unit: string;

    getDefault (): InstructionStepLength {
        const stepLength = new InstructionStepLength();
        stepLength.number = 0;
        stepLength.unit = '';

        return stepLength;
    }
}
