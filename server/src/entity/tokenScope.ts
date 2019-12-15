import { Column } from 'typeorm';

export const DefaultScope: Partial<TokenScope> = {
    isAdmin: false,
};

export class TokenScope {

    public static from(partialScope: Partial<TokenScope>): TokenScope {
        return { 
            ...new TokenScope(), 
            ...DefaultScope,
            ...partialScope
        } as TokenScope;
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
