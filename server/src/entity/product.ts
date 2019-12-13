import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Ingredient from './ingredient';

@Entity()
export default class Product {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
    lazy: true,
  })
  public recipeIngredients: Ingredient[];

}
