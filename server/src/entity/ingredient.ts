import { Product, Recipe } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Ingredient extends BaseEntity<Ingredient> {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Product, (product) => product.recipeIngredients)
    public product: Product;

    @Column()
    public amount: string ;

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
        onDelete: 'CASCADE',
    })
    public recipe: Recipe;

    getDefault(): Ingredient {
        const ingredient = new Ingredient();
        ingredient.id = 0;
        ingredient.product = null;
        ingredient.recipe = null;

        return ingredient;
    }

}
