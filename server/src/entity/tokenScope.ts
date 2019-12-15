import { Column } from 'typeorm';

export class TokenScope {

    public static from(partialScope: Partial<TokenScope>): TokenScope {
        const tokenScope = new TokenScope();
        Object.assign(tokenScope, partialScope);

        return tokenScope;
    }

    @Column()
    public isAdmin: boolean = false;

    public satisfiedBy(provided: TokenScope): boolean {
        return provided.satisfies(this);
    }

    public satisfies(required: TokenScope): boolean {
        if(!this.isAdmin && (required.isAdmin !== this.isAdmin)) {
            return false;
        }

        return true;
    }
    
}
