import recipeSpec from './recipe.spec.test';
import userSpec from './users.spec.test';

export default (): void => {
    describe('/recipe', recipeSpec);
    describe('/user', userSpec);
};
