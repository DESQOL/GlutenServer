import { BaseEntity } from '@entity';
import { Column } from 'typeorm';

export class TokenScopeRecipe extends BaseEntity<TokenScopeRecipe> {
    @Column()
    public read: boolean;

    @Column()
    public write: boolean;

    getDefault (): TokenScopeRecipe {
        const scope = new TokenScopeRecipe();
        scope.read = false;
        scope.write = false;

        return scope;
    }
}
