import { Column } from 'typeorm';
import { BaseEntity, TokenScopeRecipe } from '@entity';
import { ScopeRequirement } from '@type';

export const DefaultScope: ScopeRequirement = {
    isAdmin: false,
    recipe: {
        read: true,
        write: false,
    }
};

export class TokenScope extends BaseEntity<TokenScope> {
    public static from (partialScope: ScopeRequirement): TokenScope {
        if (!partialScope) {
            return TokenScope.from(DefaultScope);
        }

        return Object.assign(new TokenScope(), DefaultScope, partialScope || {});
    }

    @Column()
    public isAdmin: boolean;

    @Column(() => TokenScopeRecipe)
    public recipe: TokenScopeRecipe;

    public getDefault (): TokenScope {
        const tokenScope = new TokenScope();
        tokenScope.isAdmin = false;
        tokenScope.recipe = null;

        return tokenScope;
    }

    public satisfiedBy (provided: Partial<TokenScope>): boolean {
        return TokenScope.from(provided).satisfies(this);
    }

    private satisfies (partialRequired: TokenScope): boolean {
        const required = TokenScope.from(partialRequired);

        if (this.isAdmin) {
            return true;
        }

        if (!this.isAdmin && (required.isAdmin !== this.isAdmin)) {
            return false;
        }

        if (required.recipe) {
            if (required.recipe.write && !this.recipe.write) {
                return false;
            }

            if (required.recipe.read && !this.recipe.read && !this.recipe.write) {
                return false;
            }
        }

        return true;
    }
}
