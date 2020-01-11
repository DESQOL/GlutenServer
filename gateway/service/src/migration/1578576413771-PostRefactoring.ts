import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1578576413771 implements MigrationInterface {
    name = 'PostRefactoring1578576413771';

    public async up (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `recipe_comment` ADD `rating` int NOT NULL DEFAULT 0', undefined);
    }

    public async down (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `recipe_comment` DROP COLUMN `rating`', undefined);
    }
}
