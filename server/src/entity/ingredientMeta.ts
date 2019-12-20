import { Ingredient } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class IngredientMeta extends BaseEntity<IngredientMeta> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public meta: string;

    @ManyToOne(() => Ingredient, ingredient => ingredient.meta, {
        onDelete: 'CASCADE'
    })
    public ingredient: Ingredient;

    getDefault (): IngredientMeta {
        const ingredientMeta = new IngredientMeta();
        ingredientMeta.id = 0;
        ingredientMeta.meta = '';

        return ingredientMeta;
    }
}
