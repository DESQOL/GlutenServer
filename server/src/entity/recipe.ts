import { Ingredient } from '@entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, Min } from 'class-validator';

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    @Min(1)
    public id: number = 0;

    @Column()
    @MinLength(3)
    public title: string = '';

    @Column({ nullable: true })
    public description: string = '';

    @Column({ nullable: true })
    public image: string = '';

    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
        eager: true,
    })
    public ingredients: Ingredient[];

    @Column()
    public duration: string = '';

    @Column()
    public rating: number = 0;

}
