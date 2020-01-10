import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, InstructionStep, Measures, Recipe } from '@entity';

@Entity()
export class Ingredient extends BaseEntity<Ingredient> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public aisle: string;

    @Column()
    public image: string;

    @Column({ nullable: true })
    public consitency: string;

    @Column()
    public name: string;

    @Column({ nullable: true })
    public original: string;

    @Column({ nullable: true })
    public originalString: string;

    @Column({ nullable: true })
    public originalName: string;

    @Column({ nullable: true })
    public amount: number;

    @Column({ nullable: true })
    public unit: string;

    @Column({ type: 'simple-json', nullable: true })
    public meta: string[];

    @Column({ type: 'simple-json', nullable: true })
    public metaInformation: string[];

    @OneToOne(() => Measures, measures => measures.ingredient, {
        eager: true,
    })
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
