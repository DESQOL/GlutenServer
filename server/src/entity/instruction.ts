import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@entity';

@Entity()
export class Instruction extends BaseEntity<Instruction> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    'steps': [];

    getDefault (): Instruction {
        const instruction = new Instruction();
        instruction.id = 0;
        instruction.name = '';
        instruction.steps = null;

        return instruction;
    }
}
