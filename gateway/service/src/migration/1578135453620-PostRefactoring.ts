import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1578135453620 implements MigrationInterface {
    name = 'PostRefactoring1578135453620';

    public async up (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `unit` `unit` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `meta` `meta` text NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `metaInformation` `metaInformation` text NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `us_Unitshort` `us_Unitshort` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `us_Unitlong` `us_Unitlong` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `metric_Unitshort` `metric_Unitshort` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `metric_Unitlong` `metric_Unitlong` varchar(255) NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `cuisines` `cuisines` text NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `dishTypes` `dishTypes` text NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `occasions` `occasions` text NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `winePairing` `winePairing` text NULL', undefined);
    }

    public async down (queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `winePairing` `winePairing` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `occasions` `occasions` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `dishTypes` `dishTypes` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `recipe` CHANGE `cuisines` `cuisines` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `metric_Unitlong` `metric_Unitlong` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `metric_Unitshort` `metric_Unitshort` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `us_Unitlong` `us_Unitlong` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `measures` CHANGE `us_Unitshort` `us_Unitshort` varchar(255) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `metaInformation` `metaInformation` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `meta` `meta` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ingredient` CHANGE `unit` `unit` varchar(255) NOT NULL', undefined);
    }
}
