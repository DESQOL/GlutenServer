import { Ingredient } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class IngredientMetaInformation extends BaseEntity<IngredientMetaInformation> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public metaInformation: string;

    @ManyToOne(() => Ingredient, ingredient => ingredient.metaInformation, {
        onDelete: 'CASCADE'
    })
    public ingredient: Ingredient;

    getDefault (): IngredientMetaInformation {
        const ingredientMetaInformation = new IngredientMetaInformation();
        ingredientMetaInformation.id = 0;
        ingredientMetaInformation.metaInformation = '';

        return ingredientMetaInformation;
    }
}
