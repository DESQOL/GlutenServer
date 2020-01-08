import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Ingredient, Instruction, RecipeComment } from '@entity';
import { Min } from 'class-validator';

@Entity()
export class Recipe extends BaseEntity<Recipe> {
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

    @Column()
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
    public pricePerServing: number;

    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {
        eager: true
    })
    public extendedIngredients: Ingredient[];

    @PrimaryGeneratedColumn()
    @Min(1)
    public id: number;

    @Column()
    public title: string;

    @Column()
    public readyInMinutes: number;

    @Column()
    public servings: number;

    @Column()
    public image: string;

    @Column()
    public imageType: string;

    @Column({ type: 'simple-json', nullable: true })
    public cuisines: string[];

    @Column({ type: 'simple-json', nullable: true })
    public dishTypes: string[];

    @Column('simple-json')
    public diets: string[];

    @Column({ type: 'simple-json', nullable: true })
    public occasions: string[];

    @Column({ type: 'simple-json', nullable: true })
    public winePairing: {};

    @Column({ type: 'longtext' })
    public instructions: string;

    @OneToMany(() => Instruction, instruction => instruction.recipe, {
        eager: true
    })
    public analyzedInstructions: Instruction[];

    @OneToMany(() => RecipeComment, (recipeComment) => recipeComment.recipe, {
        lazy: true,
    })
    public comments: RecipeComment[];

    getDefault (): Recipe {
        const recipe = new Recipe();
        recipe.vegetarian = false;
        recipe.vegan = false;
        recipe.glutenFree = false;
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
        recipe.extendedIngredients = null;
        recipe.id = 0;
        recipe.title = '';
        recipe.readyInMinutes = 0;
        recipe.servings = 0;
        recipe.image = '';
        recipe.imageType = '';
        recipe.cuisines = null;
        recipe.dishTypes = null;
        recipe.diets = null;
        recipe.occasions = null;
        recipe.winePairing = null;
        recipe.instructions = '';
        recipe.analyzedInstructions = null;
        recipe.comments = null;

        return recipe;
    }
}
