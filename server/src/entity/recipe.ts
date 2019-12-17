import { Ingredient } from '@entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, Min } from 'class-validator';
import { BaseEntity } from './baseEntity';

@Entity()
export class Recipe extends BaseEntity<Recipe> {

    @PrimaryGeneratedColumn()
    @Min(1)
    public id: number;

    @Column()
    @MinLength(3)
    public title: string;

    @Column({ nullable: true })
    public description: string;

    @Column({ nullable: true })
    public image: string;

    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
        eager: true,
    })
    public ingredients: Ingredient[];

    @Column()
    public duration: string;

    @Column()
    public rating: number;

    getDefault(): Recipe {
        const recipe = new Recipe();
        recipe.id = 0;
        recipe.title = '';
        recipe.description = '';
        recipe.image = '';
        recipe.ingredients = null;
        recipe.duration = '';
        recipe.rating = 0;

        return recipe;
    }

}
