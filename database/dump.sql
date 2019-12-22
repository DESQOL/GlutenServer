
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aisle` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `consitency` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `original` varchar(255) NOT NULL,
  `originalString` varchar(255) NOT NULL,
  `originalName` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `meta` text NOT NULL,
  `metaInformation` text NOT NULL,
  `measuresId` int(11) DEFAULT NULL,
  `recipeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_976478ff0ec188883ec8ffb66e` (`measuresId`),
  KEY `FK_a19a4b507b9e2d1efd2d73b37bc` (`recipeId`),
  CONSTRAINT `FK_976478ff0ec188883ec8ffb66ea` FOREIGN KEY (`measuresId`) REFERENCES `measures` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a19a4b507b9e2d1efd2d73b37bc` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `instruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instruction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `recipeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8ac131565357b5fb601d5728ab0` (`recipeId`),
  CONSTRAINT `FK_8ac131565357b5fb601d5728ab0` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `instruction` WRITE;
/*!40000 ALTER TABLE `instruction` DISABLE KEYS */;
/*!40000 ALTER TABLE `instruction` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `instruction_step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instruction_step` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `step` varchar(255) NOT NULL,
  `instructionId` int(11) DEFAULT NULL,
  `lengthNumber` int(11) NOT NULL,
  `lengthUnit` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b70ee76b3b9ed952d136bda33cf` (`instructionId`),
  CONSTRAINT `FK_b70ee76b3b9ed952d136bda33cf` FOREIGN KEY (`instructionId`) REFERENCES `instruction` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `instruction_step` WRITE;
/*!40000 ALTER TABLE `instruction_step` DISABLE KEYS */;
/*!40000 ALTER TABLE `instruction_step` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `instruction_step_equipment_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instruction_step_equipment_equipment` (
  `instructionStepId` int(11) NOT NULL,
  `equipmentId` int(11) NOT NULL,
  PRIMARY KEY (`instructionStepId`,`equipmentId`),
  KEY `IDX_14609a90ff2e410af08a5b9bc2` (`instructionStepId`),
  KEY `IDX_ee68d422f4a139e11528c74dde` (`equipmentId`),
  CONSTRAINT `FK_14609a90ff2e410af08a5b9bc29` FOREIGN KEY (`instructionStepId`) REFERENCES `instruction_step` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_ee68d422f4a139e11528c74dde0` FOREIGN KEY (`equipmentId`) REFERENCES `equipment` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `instruction_step_equipment_equipment` WRITE;
/*!40000 ALTER TABLE `instruction_step_equipment_equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `instruction_step_equipment_equipment` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `instruction_step_ingredients_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instruction_step_ingredients_ingredient` (
  `instructionStepId` int(11) NOT NULL,
  `ingredientId` int(11) NOT NULL,
  PRIMARY KEY (`instructionStepId`,`ingredientId`),
  KEY `IDX_ac0b8565e17b58ecea36e801d0` (`instructionStepId`),
  KEY `IDX_f18e0fe70fb793ae864b518d96` (`ingredientId`),
  CONSTRAINT `FK_ac0b8565e17b58ecea36e801d04` FOREIGN KEY (`instructionStepId`) REFERENCES `instruction_step` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_f18e0fe70fb793ae864b518d962` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `instruction_step_ingredients_ingredient` WRITE;
/*!40000 ALTER TABLE `instruction_step_ingredients_ingredient` DISABLE KEYS */;
/*!40000 ALTER TABLE `instruction_step_ingredients_ingredient` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `measures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `measures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `us_Amount` int(11) NOT NULL,
  `us_Unitshort` varchar(255) NOT NULL,
  `us_Unitlong` varchar(255) NOT NULL,
  `metric_Amount` int(11) NOT NULL,
  `metric_Unitshort` varchar(255) NOT NULL,
  `metric_Unitlong` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `measures` WRITE;
/*!40000 ALTER TABLE `measures` DISABLE KEYS */;
/*!40000 ALTER TABLE `measures` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe` (
  `vegetarian` tinyint(4) NOT NULL,
  `vegan` tinyint(4) NOT NULL,
  `glutenFree` tinyint(4) NOT NULL,
  `dairyFree` tinyint(4) NOT NULL,
  `veryHealthy` tinyint(4) NOT NULL,
  `cheap` tinyint(4) NOT NULL,
  `veryPopular` tinyint(4) NOT NULL,
  `sustainable` tinyint(4) NOT NULL,
  `weightWatcherSmartPoints` int(11) NOT NULL,
  `gaps` varchar(255) NOT NULL,
  `lowFodmap` tinyint(4) NOT NULL,
  `ketogenic` tinyint(4) NOT NULL,
  `whole30` tinyint(4) NOT NULL,
  `preparationMinutes` int(11) NOT NULL,
  `cookingMinutes` int(11) NOT NULL,
  `sourceUrl` varchar(255) NOT NULL,
  `spoonacularSourceUrl` varchar(255) NOT NULL,
  `aggregateLikes` int(11) NOT NULL,
  `spoonacularScore` int(11) NOT NULL,
  `healthScore` int(11) NOT NULL,
  `creditsText` varchar(255) NOT NULL,
  `sourceName` varchar(255) NOT NULL,
  `pricePerServing` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `readyInMinutes` int(11) NOT NULL,
  `servings` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `imageType` varchar(255) NOT NULL,
  `cuisines` text NOT NULL,
  `dishTypes` text NOT NULL,
  `diets` text NOT NULL,
  `occasions` text NOT NULL,
  `winePairing` text NOT NULL,
  `instructions` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `scopeIsadmin` tinyint(4) NOT NULL,
  `scopeRecipeRead` tinyint(4) NOT NULL,
  `scopeRecipeWrite` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_94f168faad896c0786646fa3d4a` (`userId`),
  CONSTRAINT `FK_94f168faad896c0786646fa3d4a` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,'admin',1,1,0,0),(2,'read',1,0,1,0),(3,'write',1,0,0,1),(4,'none',1,0,0,0),(5,'jeff',2,0,1,0);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Martijn Vegter','martijn.vegter@hva.nl','$2b$10$pVrNboxt8W8uEHjJrai2uu900s3JpKRw.hEuRUwB2X1R9sz4AqrIK'),(2,'Jeffrey van Riemsdijk','jeffrey.van.riemsdijk@hva.nl','$2b$10$9qi9NYEi.gq9nkBQWq4hZ.oxQGNmFxvxBX5CcG7/lbFFHJj8mlv0C');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

