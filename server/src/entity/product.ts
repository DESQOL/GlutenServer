import { Ingredient } from '@entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
    lazy: true,
  })
  public recipeIngredients: Ingredient[];

}
