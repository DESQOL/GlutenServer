import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Recipe, User } from '@entity';
import { Max, Min } from 'class-validator';

@Entity()
export class RecipeComment extends BaseEntity<RecipeComment> {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.comments)
    public recipe: Recipe;

    @ManyToOne(() => User, (user) => user.comments, {
        eager: true
    })
    public user: User;

    @Column({ default: 0 })
    @Min(0)
    @Max(5)
    public rating: number;

    @Column('longtext')
    public comment: string;

    getDefault (): RecipeComment {
        const comment = new RecipeComment();
        comment.id = 0;
        comment.recipe = null;
        comment.user = null;
        comment.rating = 0;
        comment.comment = '';

        return comment;
    }
}
