import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, InstructionStep, Measures, Recipe } from '@entity';

@Entity()
export class Ingredient extends BaseEntity<Ingredient> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public aisle: string;

    @Column()
    public image: string;

    @Column()
    public consitency: string;

    @Column()
    public name: string;

    @Column()
    public original: string;

    @Column()
    public originalString: string;

    @Column()
    public originalName: string;

    @Column()
    public amount: number;

    @Column()
    public unit: string;

    @Column('simple-json')
    public meta: string[];

    @Column('simple-json')
    public metaInformation: string[];

    @OneToOne(() => Measures, measures => measures.ingredient)
    @JoinColumn()
    public measures: Measures;

    @ManyToOne(() => Recipe, recipe => recipe.extendedIngredients)
    public recipe: Recipe;

    @ManyToMany(() => InstructionStep)
    public instructionSteps: InstructionStep[];

    public getDefault (): Ingredient {
        const ingredient = new Ingredient();
        ingredient.id = 0;
        ingredient.aisle = '';
        ingredient.image = '';
        ingredient.consitency = '';
        ingredient.name = '';
        ingredient.original = '';
        ingredient.originalString = '';
        ingredient.originalName = '';
        ingredient.amount = 0;
        ingredient.unit = '';
        ingredient.meta = null;
        ingredient.metaInformation = null;
        ingredient.measures = null;
        ingredient.recipe = null;
        ingredient.instructionSteps = null;

        return ingredient;
    }
}
