import { BaseEntity, Instruction, Ingredient, Equipment } from '@entity';
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InstructionStep extends BaseEntity<InstructionStep> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public number: number;

    @Column()
    public step: string;

    @OneToMany(() => Ingredient, ingredient => ingredient.instructionStep, {
        eager: true
    })
    public ingredients: Ingredient[];

    @OneToMany(() => Equipment, equipment => equipment.instructionStep, {
        eager: true
    })
    public equipment: Equipment[];

    @ManyToOne(() => Instruction, instruction => instruction.instructionSteps, {
        onDelete: 'CASCADE'
    })
    public instruction: Instruction;

    getDefault (): InstructionStep {
        const instructionStep = new InstructionStep();
        instructionStep.id = 0;
        instructionStep.number = 1;
        instructionStep.step = '';
        instructionStep.ingredients = null;
        instructionStep.equipment = null;
        instructionStep.instruction = null;

        return instructionStep;
    }
}
