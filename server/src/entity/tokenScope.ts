import { Column } from 'typeorm';

export type ScopeRequirement = Partial<Pick<TokenScope, 'isAdmin'>>;

export const DefaultScope: ScopeRequirement = {
    isAdmin: false,
};

export class TokenScope {

    public static from(partialScope: ScopeRequirement): TokenScope {
        return Object.assign(new TokenScope(), DefaultScope, partialScope || {});
    }

    @Column()
    public isAdmin: boolean = false;

    public satisfiedBy(provided: Partial<TokenScope>): boolean {
        return TokenScope.from(provided).satisfies(this);
    }

    private satisfies(partialRequired: TokenScope): boolean {
        const required = TokenScope.from(partialRequired);
        if (!this.isAdmin && (required.isAdmin !== this.isAdmin)) {
            return false;
        }

        return true;
    }

}
