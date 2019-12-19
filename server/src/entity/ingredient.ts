import { Product, Recipe, Measure } from '@entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Instruction } from './instruction';

@Entity()
export class Ingredient extends BaseEntity<Ingredient> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public aisle: string;

    @Column()
    public image: string;

    @Column()
    public consistency: string;

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

    @Column({ nullable: true })
    public unit: string;

    @ManyToOne(() => Product, product => product.recipeIngredients)
    public product: Product;

    @Column()
    public source: string;

    @ManyToOne(() => Recipe, recipe => recipe.ingredients, {
        onDelete: 'CASCADE'
    })
    public recipe: Recipe;

    @ManyToOne(() => Instruction, instruction => instruction.ingredients)
    public instruction: Instruction;

    @OneToMany(() => Measure, measure => measure.ingredient, {
        eager: true
    })
    public measurements: Measure[];

    getDefault (): Ingredient {
        const ingredient = new Ingredient();
        ingredient.id = 0;
        ingredient.aisle = '';
        ingredient.image = '';
        ingredient.consistency = '';
        ingredient.name = '';
        ingredient.original = '';
        ingredient.originalString = '';
        ingredient.originalName = '';
        ingredient.amount = 0;
        ingredient.unit = '';
        ingredient.source = '';
        ingredient.product = null;
        ingredient.recipe = null;

        return ingredient;
    }
}
