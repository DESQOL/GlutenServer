import { Column } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { ScopeRequirement } from '@type';

export const DefaultScope: ScopeRequirement = {
    isAdmin: false,
};

export class TokenScope extends BaseEntity<TokenScope> {
    public static from (partialScope: ScopeRequirement): TokenScope {
        if (!partialScope) {
            return (new TokenScope()).getDefault();
        }

        return Object.assign(new TokenScope(), DefaultScope, partialScope || {});
    }

    @Column()
    public isAdmin: boolean;

    public getDefault (): TokenScope {
        const tokenScope = new TokenScope();
        tokenScope.isAdmin = false;

        return tokenScope;
    }

    public satisfiedBy (provided: Partial<TokenScope>): boolean {
        return TokenScope.from(provided).satisfies(this);
    }

    private satisfies (partialRequired: TokenScope): boolean {
        const required = TokenScope.from(partialRequired);
        if (!this.isAdmin && (required.isAdmin !== this.isAdmin)) {
            return false;
        }

        return true;
    }
}
