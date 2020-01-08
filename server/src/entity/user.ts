import { BaseEntity, Recipe, Token } from '@entity';
import bcrypt from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';
import { Column, Entity, getRepository, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeComment } from './recipeComment';

@Entity()
export class User extends BaseEntity<User> {
    public static async hashPassword (password: string): Promise<string> {
        const hash = await bcrypt.genSalt();
        return bcrypt.hash(password, hash);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    @IsEmail()
    public email: string;

    @Column({ select: false })
    @MinLength(8)
    public password: string;

    @OneToMany(() => Token, (token) => token.user, {
        lazy: true,
    })
    public tokens: Token[];

    @ManyToMany(() => Recipe, {
        eager: true,
    })
    @JoinTable()
    public favoriteRecipes: Recipe[];

    @OneToMany(() => RecipeComment, (recipeComment) => recipeComment.user, {
        lazy: true,
    })
    public comments: RecipeComment[];

    public getDefault (): User {
        const user = new User();
        user.id = 0;
        user.name = '';
        user.email = '';
        user.password = '';
        user.tokens = null;
        user.favoriteRecipes = null;
        user.comments = null;

        return user;
    }

    public async validatePassword (password: string): Promise<boolean> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(this.id, { select: ['id', 'password'] });

        return bcrypt.compare(password, user.password);
    }
}
