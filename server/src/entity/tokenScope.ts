import { Token } from '@entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokenScope {

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
