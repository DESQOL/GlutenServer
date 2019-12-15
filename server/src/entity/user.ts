import { Token } from '@entity';
import bcrypt from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';
import { Column, Entity, getRepository, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    public static async hashPassword (password: string): Promise<string> {
        const hash = await bcrypt.genSalt();
        return bcrypt.hash(password, hash);
    }

    @PrimaryGeneratedColumn()
    public id: number = 0;

    @Column()
    public name: string = '';

    @Column()
    @IsEmail()
    public email: string = '';

    @Column({ select: false })
    @MinLength(8)
    public password: string = '';

    @OneToMany(() => Token, (token) => token.user, {
        lazy: true,
    })
    public tokens: Token[];

    public displayUnit (): object {
        return {
            name: this.name,
            email: this.email,
        };
    }

    public async validatePassword (password: string): Promise<boolean> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(this.id, { select: ['password'] });

        return bcrypt.compare(password, user.password);
    }
}
