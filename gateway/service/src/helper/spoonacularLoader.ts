import * as fs from 'fs';
import { getRepository } from 'typeorm';
import { Equipment, Ingredient, Instruction, InstructionStep, Measures, Recipe } from '@entity';
import { logger } from '@helper';

// Add the full path to the JSON response of Spoonacular here.
const queue = [];

export async function spoonacularLoader (): Promise<void> {
    const repoEquipment = getRepository(Equipment);
    const repoMeasures = getRepository(Measures);
    const repoIngredient = getRepository(Ingredient);
    const repoInstruction = getRepository(Instruction);
    const repoInstructionStep = getRepository(InstructionStep);
    const repoRecipe = getRepository(Recipe);

    for (const job of queue) {
        const rawRecipes = JSON.parse(fs.readFileSync(job, 'utf-8')) as Recipe[];

        for (const rawRecipe of rawRecipes) {
            let recipe = await repoRecipe.findOne(rawRecipe.id);
            if (recipe) {
                continue;
            }

            recipe = repoRecipe.create(rawRecipe);
            recipe.comments = [];
            recipe.extendedIngredients = [];
            recipe.analyzedInstructions = [];

            // Already save the recipe for foreign key relations
            recipe = await repoRecipe.save(recipe);

            for (const rawIngredient of rawRecipe.extendedIngredients) {
                let ingredient = repoIngredient.create(rawIngredient);
                ingredient.recipe = recipe;
                ingredient.instructionSteps = [];
                ingredient.measures = null;

                {
                    let measures = repoMeasures.create(rawIngredient.measures);
                    measures = await repoMeasures.save(measures);
                    ingredient.measures = measures;
                }

                // Generate a new id
                delete ingredient.id;

                ingredient = await repoIngredient.save(ingredient);
                recipe.extendedIngredients.push(ingredient);
            }

            for (const rawAnalyzedInstruction of rawRecipe.analyzedInstructions) {
                let analyzedInstruction = repoInstruction.create(rawAnalyzedInstruction);
                analyzedInstruction.recipe = recipe;

                analyzedInstruction.steps = [];
                for (const rawStep of rawAnalyzedInstruction.steps) {
                    let step = repoInstructionStep.create(rawStep);

                    step.equipment = [];
                    for (const rawEquipment of rawStep.equipment) {
                        let equipment = await repoEquipment.findOne(rawEquipment.id);
                        if (!equipment) {
                            equipment = repoEquipment.create(rawEquipment);
                            equipment = await repoEquipment.save(equipment);
                        }

                        step.equipment.push(equipment);
                    }

                    step.ingredients = [];
                    for (const rawIngredient of rawStep.ingredients) {
                        let ingredient = recipe.extendedIngredients.filter((ingr) => ingr.name === rawIngredient.name)[0];
                        if (!ingredient) {
                            // Yes, it is possible that the steps include non-ingredient ingredients
                            ingredient = repoIngredient.create(rawIngredient);

                            // Generate a new id
                            delete ingredient.id;

                            ingredient = await repoIngredient.save(ingredient);
                        }

                        step.ingredients.push(ingredient);
                    }

                    step = await repoInstructionStep.save(step);
                    analyzedInstruction.steps.push(step);
                }

                analyzedInstruction = await repoInstruction.save(analyzedInstruction);
                recipe.analyzedInstructions.push(analyzedInstruction);
            }

            // Updated recipe with new relations
            recipe = await repoRecipe.save(recipe);
        }
    }

    logger.info('Done with all jobs in the Spoon queue');
}
