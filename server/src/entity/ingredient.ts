import { Product, Recipe } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Product, (product) => product.recipeIngredients)
    public product: Product;

    @Column()
    public amount: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
        onDelete: 'CASCADE',
    })
    public recipe: Recipe;

}
