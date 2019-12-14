import { TokenScope, User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {

    public static generateToken () {
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

    @OneToOne(() => TokenScope, (scope) => scope.token, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    public scope: TokenScope;

}
