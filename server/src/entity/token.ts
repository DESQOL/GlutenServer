import { TokenScope, User } from '@entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {

    public static generate (): string {
        return `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;
    }

    @PrimaryGeneratedColumn()
    public id: number = 0;

    @ManyToOne(() => User, (user) => user.tokens, {
        eager: true,
        onDelete: 'CASCADE',
    })
    public user: User;

    @Column()
    public token: string = '';

    @Column(() => TokenScope)
    public scope: TokenScope;

}
