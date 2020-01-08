import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Recipe, User } from '@entity';

@Entity()
export class RecipeComment extends BaseEntity<RecipeComment> {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.comments)
    public recipe: Recipe;

    @ManyToOne(() => User, (user) => user.comments)
    public user: User;

    @Column('longtext')
    public comment: string;

    getDefault (): RecipeComment {
        const comment = new RecipeComment();
        comment.id = 0;
        comment.recipe = null;
        comment.user = null;
        comment.comment = '';

        return comment;
    }
}
