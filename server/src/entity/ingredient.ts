import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import Recipe from './recipe';

@Entity()
export default class Ingredient {

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
