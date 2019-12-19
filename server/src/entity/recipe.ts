import { Ingredient, Instruction } from '@entity';
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

    @Column()
    public vegetarian: boolean;

    @Column()
    public vegan: boolean;

    @Column()
    public glutenFree: boolean;

    @Column()
    public dairyFree: boolean;

    @Column()
    public veryHealthy: boolean;

    @Column()
    public cheap: boolean;

    @Column()
    public veryPopular: boolean;

    @Column()
    public sustainable: boolean;

    @Column({ nullable: true })
    public weightWatcherSmartPoints: number;

    @Column()
    public gaps: string;

    @Column()
    public lowFodmap: boolean;

    @Column()
    public ketogenic: boolean;

    @Column()
    public whole30: boolean;

    @Column()
    public preparationMinutes: number;

    @Column()
    public cookingMinutes: number;

    @Column()
    public sourceUrl: string;

    @Column()
    public spoonacularSourceUrl: string;

    @Column()
    public aggregateLikes: number;

    @Column()
    public spoonacularScore: number;

    @Column()
    public healthScore: number;

    @Column()
    public creditsText: string;

    @Column()
    public sourceName: string;

    @Column()
    public readyInMinutes: number;

    @Column()
    public pricePerServing: number;

    @Column()
    public servings: number;

    @Column({ nullable: true })
    public image: string;

    @Column({ nullable: true })
    public imageType: string;

    @OneToMany(() => Instruction, instruction => instruction.recipe, {
        eager: true
    })
    public instructions: Instruction[];

    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {
        eager: true
    })
    public ingredients: Ingredient[];

    @Column({ nullable: true })
    public rating: number;

    getDefault (): Recipe {
        const recipe = new Recipe();
        recipe.id = 0;
        recipe.vegetarian = false;
        recipe.vegan = false;
        recipe.glutenFree = true;
        recipe.dairyFree = false;
        recipe.veryHealthy = false;
        recipe.cheap = false;
        recipe.veryPopular = false;
        recipe.sustainable = false;
        recipe.weightWatcherSmartPoints = 0;
        recipe.gaps = '';
        recipe.lowFodmap = false;
        recipe.ketogenic = false;
        recipe.whole30 = false;
        recipe.preparationMinutes = 0;
        recipe.cookingMinutes = 0;
        recipe.sourceUrl = '';
        recipe.spoonacularSourceUrl = '';
        recipe.aggregateLikes = 0;
        recipe.spoonacularScore = 0;
        recipe.healthScore = 0;
        recipe.creditsText = '';
        recipe.sourceName = '';
        recipe.pricePerServing = 0;
        recipe.title = '';
        recipe.readyInMinutes = 0;
        recipe.image = '';
        recipe.ingredients = null;
        recipe.rating = 0;
        recipe.servings = 0;
        recipe.imageType = '';
        recipe.instructions = null;

        return recipe;
    }
}
