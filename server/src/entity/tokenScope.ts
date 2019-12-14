import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Token from './token';

@Entity()
export default class TokenScope {

  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Token, (token) => token.scope, {
    lazy: true,
  })
  @JoinColumn()
  public token: Token;

  @Column({ default: false })
  public isAdmin: boolean;

}
