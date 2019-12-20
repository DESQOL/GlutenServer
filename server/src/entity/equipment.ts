import { InstructionStep } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Equipment extends BaseEntity<Equipment> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public image: string;

    @ManyToOne(() => InstructionStep, instructionStep => instructionStep.equipment)
    public instructionStep: InstructionStep;

    getDefault (): Equipment {
        const equipment = new Equipment();
        equipment.id = 0;
        equipment.name = '';
        equipment.image = '';
        equipment.instructionStep = null;

        return equipment;
    }
}
