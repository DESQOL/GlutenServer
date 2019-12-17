import { TokenScope, User } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity()
export class Token extends BaseEntity<Token> {
    public static generate (): string {
        return `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, (user) => user.tokens, {
        eager: true,
        onDelete: 'CASCADE',
    })
    public user: User;

    @Column()
    public token: string;

    @Column(() => TokenScope)
    public scope: TokenScope;

    getDefault (): Token {
        const token = new Token();
        token.id = 0;
        token.user = null;
        token.token = '';
        token.scope = null;

        return token;
    }
}
