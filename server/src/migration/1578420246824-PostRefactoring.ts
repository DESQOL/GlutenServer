import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1578420246824 implements MigrationInterface {
    name = 'PostRefactoring1578420246824';

    public async up (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `recipe_comment` (`id` int NOT NULL AUTO_INCREMENT, `comment` longtext NOT NULL, `recipeId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `recipe_comment` ADD CONSTRAINT `FK_322bce38d9024fa88bdaf2b1458` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `recipe_comment` ADD CONSTRAINT `FK_c844c35c866d5f650cccf03f9cf` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `recipe_comment` DROP FOREIGN KEY `FK_c844c35c866d5f650cccf03f9cf`', undefined);
        await queryRunner.query('ALTER TABLE `recipe_comment` DROP FOREIGN KEY `FK_322bce38d9024fa88bdaf2b1458`', undefined);
        await queryRunner.query('DROP TABLE `recipe_comment`', undefined);
    }
}
