import { BaseEntity, Recipe, InstructionStep } from '@entity';
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Instruction extends BaseEntity<Instruction> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(() => InstructionStep, instructionStep => instructionStep.instruction, {
        eager: true
    })
    public instructionSteps: InstructionStep[];

    @ManyToOne(() => Recipe, recipe => recipe.instructions, {
        onDelete: 'CASCADE'
    })
    public recipe: Recipe;

    getDefault (): Instruction {
        const instruction = new Instruction();
        instruction.id = 0;
        instruction.name = '';
        instruction.recipe = null;
        instruction.instructionSteps = null;

        return instruction;
    }
}
