import { Column } from 'typeorm';

export class TokenScope {

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
