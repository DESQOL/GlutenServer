-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: gluten
-- ------------------------------------------------------
-- Server version	5.7.28

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

--
-- Table structure for table `info_anwser`
--

DROP TABLE IF EXISTS `info_anwser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_anwser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anwser` varchar(255) NOT NULL,
  `questionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_3c3cb931308be5263ff93c4c00` (`questionId`),
  CONSTRAINT `FK_3c3cb931308be5263ff93c4c009` FOREIGN KEY (`questionId`) REFERENCES `info_question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_anwser`
--

LOCK TABLES `info_anwser` WRITE;
/*!40000 ALTER TABLE `info_anwser` DISABLE KEYS */;
INSERT INTO `info_anwser` VALUES (1,'42',1);
/*!40000 ALTER TABLE `info_anwser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_category`
--

DROP TABLE IF EXISTS `info_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_category`
--

LOCK TABLES `info_category` WRITE;
/*!40000 ALTER TABLE `info_category` DISABLE KEYS */;
INSERT INTO `info_category` VALUES (1,'medication'),(2,'inform');
/*!40000 ALTER TABLE `info_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_question`
--

DROP TABLE IF EXISTS `info_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_question`
--

LOCK TABLES `info_question` WRITE;
/*!40000 ALTER TABLE `info_question` DISABLE KEYS */;
INSERT INTO `info_question` VALUES (1,'Purpose of life?');
/*!40000 ALTER TABLE `info_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_question_categories_info_category`
--

DROP TABLE IF EXISTS `info_question_categories_info_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_question_categories_info_category` (
  `infoQuestionId` int(11) NOT NULL,
  `infoCategoryId` int(11) NOT NULL,
  PRIMARY KEY (`infoQuestionId`,`infoCategoryId`),
  KEY `IDX_61ae8b97242112c5debe145d88` (`infoQuestionId`),
  KEY `IDX_a7d39d2d36e6c165cab5d6e9a3` (`infoCategoryId`),
  CONSTRAINT `FK_61ae8b97242112c5debe145d881` FOREIGN KEY (`infoQuestionId`) REFERENCES `info_question` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_a7d39d2d36e6c165cab5d6e9a3e` FOREIGN KEY (`infoCategoryId`) REFERENCES `info_category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_question_categories_info_category`
--

LOCK TABLES `info_question_categories_info_category` WRITE;
/*!40000 ALTER TABLE `info_question_categories_info_category` DISABLE KEYS */;
INSERT INTO `info_question_categories_info_category` VALUES (1,1);
/*!40000 ALTER TABLE `info_question_categories_info_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
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

