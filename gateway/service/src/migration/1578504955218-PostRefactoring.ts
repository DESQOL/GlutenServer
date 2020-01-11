import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1578504955218 implements MigrationInterface {
    name = 'PostRefactoring1578504955218';

    public async up (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `instruction_step` DROP COLUMN `lengthNumber`', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` DROP COLUMN `lengthUnit`', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` ADD `length_Number` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query("ALTER TABLE `instruction_step` ADD `length_Unit` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `aisle` `aisle` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `consitency` `consitency` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `original` `original` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `originalString` `originalString` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `originalName` `originalName` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `amount` `amount` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `instruction` DROP COLUMN `name`', undefined);
        await queryRunner.query('ALTER TABLE `instruction` ADD `name` longtext NULL', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` DROP COLUMN `step`', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` ADD `step` longtext NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `preparationMinutes` `preparationMinutes` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `cookingMinutes` `cookingMinutes` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `creditsText` `creditsText` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `sourceName` `sourceName` varchar(255) NULL', undefined);
        await queryRunner.query("ALTER TABLE `recipe` CHANGE `image` `image` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `recipe` CHANGE `imageType` `imageType` varchar(255) NOT NULL DEFAULT ''", undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `instructions` `instructions` longtext NULL', undefined);
    }

    public async down (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `instructions` `instructions` longtext NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `imageType` `imageType` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `image` `image` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `sourceName` `sourceName` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `creditsText` `creditsText` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `cookingMinutes` `cookingMinutes` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `preparationMinutes` `preparationMinutes` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` DROP COLUMN `step`', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` ADD `step` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `instruction` DROP COLUMN `name`', undefined);
        await queryRunner.query('ALTER TABLE `instruction` ADD `name` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `amount` `amount` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `originalName` `originalName` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `originalString` `originalString` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `original` `original` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `consitency` `consitency` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `aisle` `aisle` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` DROP COLUMN `length_Unit`', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` DROP COLUMN `length_Number`', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` ADD `lengthUnit` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `instruction_step` ADD `lengthNumber` int NOT NULL', undefined);
    }
}
