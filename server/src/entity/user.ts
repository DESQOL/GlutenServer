import bcrypt from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';
import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
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

  public async validatePassword (password: string): Promise<boolean> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(this.id, { select: ['password'] });

    return bcrypt.compare(password, user.password);
  }
}
