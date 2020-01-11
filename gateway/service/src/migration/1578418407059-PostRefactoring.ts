import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1578418407059 implements MigrationInterface {
    name = 'PostRefactoring1578418407059';

    public async up (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `user_favorite_recipes_recipe` (`userId` int NOT NULL, `recipeId` int NOT NULL, INDEX `IDX_ac7e011f61dde4ba68a295f5be` (`userId`), INDEX `IDX_eedce219e439c004d5b8b53d77` (`recipeId`), PRIMARY KEY (`userId`, `recipeId`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `user_favorite_recipes_recipe` ADD CONSTRAINT `FK_ac7e011f61dde4ba68a295f5be9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `user_favorite_recipes_recipe` ADD CONSTRAINT `FK_eedce219e439c004d5b8b53d77c` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    }

    public async down (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user_favorite_recipes_recipe` DROP FOREIGN KEY `FK_eedce219e439c004d5b8b53d77c`', undefined);
        await queryRunner.query('ALTER TABLE `user_favorite_recipes_recipe` DROP FOREIGN KEY `FK_ac7e011f61dde4ba68a295f5be9`', undefined);
        await queryRunner.query('DROP INDEX `IDX_eedce219e439c004d5b8b53d77` ON `user_favorite_recipes_recipe`', undefined);
        await queryRunner.query('DROP INDEX `IDX_ac7e011f61dde4ba68a295f5be` ON `user_favorite_recipes_recipe`', undefined);
        await queryRunner.query('DROP TABLE `user_favorite_recipes_recipe`', undefined);
    }
}
