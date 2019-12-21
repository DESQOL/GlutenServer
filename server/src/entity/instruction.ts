import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, InstructionStep, Recipe } from '@entity';

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

    @OneToOne(() => Recipe, recipe => recipe.analyzedInstructions)
    public recipe: Recipe;

    getDefault (): Instruction {
        const instruction = new Instruction();
        instruction.id = 0;
        instruction.name = '';
        instruction.steps = null;
        instruction.recipe = null;

        return instruction;
    }
}
