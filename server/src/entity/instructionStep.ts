import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity, Ingredient, InstructionStepLength, Equipment, Instruction } from '@entity';

@Entity()
export class InstructionStep extends BaseEntity<InstructionStep> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public number: number;

    @Column()
    public step: string;

    @ManyToMany(() => Ingredient, {
        eager: true
    })
    @JoinTable()
    public ingredients: Ingredient[];

    @ManyToMany(() => Equipment, {
        eager: true
    })
    @JoinTable()
    public equipment: Equipment[];

    @Column(() => InstructionStepLength)
    public length: InstructionStepLength;

    @ManyToOne(() => Instruction, instruction => instruction.steps)
    public instruction: Instruction;

    getDefault (): InstructionStep {
        const instruction = new InstructionStep();
        instruction.id = 0;
        instruction.number = 0;
        instruction.step = '';
        instruction.ingredients = null;
        instruction.equipment = null;
        instruction.length = null;
        instruction.instruction = null;

        return instruction;
    }
}
