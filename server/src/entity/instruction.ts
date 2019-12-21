import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity, InstructionStep } from '@entity';

@Entity()
export class Instruction extends BaseEntity<Instruction> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(() => InstructionStep, instructionStep => instructionStep.instruction, {
        eager: true
    })
    public steps: InstructionStep[];

    getDefault (): Instruction {
        const instruction = new Instruction();
        instruction.id = 0;
        instruction.name = '';
        instruction.steps = null;

        return instruction;
    }
}
