import { BaseEntity, Ingredient } from '@entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity<Product> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
        lazy: true,
    })
    public recipeIngredients: Ingredient[];

    getDefault (): Product {
        const product = new Product();
        product.id = 0;
        product.name = '';
        product.recipeIngredients = undefined;

        return product;
    }
}
