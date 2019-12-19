import { BaseEntity, Recipe, Ingredient, Equipment } from '@entity';
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Instruction extends BaseEntity<Instruction> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public number: number;

    @Column()
    public step: string;

    @ManyToOne(() => Recipe, recipe => recipe.instructions, {
        onDelete: 'CASCADE'
    })
    public recipe: Recipe;

    @OneToMany(() => Ingredient, ingredient => ingredient.instruction, {
        eager: true
    })
    public ingredients: Ingredient[];

    @OneToMany(() => Equipment, equipment => equipment.instruction, {
        eager: true
    })
    public equipment: Equipment[];

    getDefault (): Instruction {
        const instruction = new Instruction();
        instruction.id = 0;
        instruction.number = 1;
        instruction.step = '';
        instruction.recipe = null;
        instruction.ingredients = null;
        instruction.equipment = null;

        return instruction;
    }
}
