-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.28 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for gluten
DROP DATABASE IF EXISTS `gluten`;
CREATE DATABASE IF NOT EXISTS `gluten` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `gluten`;

-- Dumping structure for table gluten.info_anwser
DROP TABLE IF EXISTS `info_anwser`;
CREATE TABLE IF NOT EXISTS `info_anwser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anwser` varchar(255) NOT NULL,
  `questionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_3c3cb931308be5263ff93c4c00` (`questionId`),
  CONSTRAINT `FK_3c3cb931308be5263ff93c4c009` FOREIGN KEY (`questionId`) REFERENCES `info_question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table gluten.info_anwser: ~0 rows (approximately)
/*!40000 ALTER TABLE `info_anwser` DISABLE KEYS */;
REPLACE INTO `info_anwser` (`id`, `anwser`, `questionId`) VALUES
	(1, '42', 1);
/*!40000 ALTER TABLE `info_anwser` ENABLE KEYS */;

-- Dumping structure for table gluten.info_category
DROP TABLE IF EXISTS `info_category`;
CREATE TABLE IF NOT EXISTS `info_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table gluten.info_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `info_category` DISABLE KEYS */;
REPLACE INTO `info_category` (`id`, `name`) VALUES
	(1, 'medication'),
	(2, 'inform');
/*!40000 ALTER TABLE `info_category` ENABLE KEYS */;

-- Dumping structure for table gluten.info_question
DROP TABLE IF EXISTS `info_question`;
CREATE TABLE IF NOT EXISTS `info_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table gluten.info_question: ~1 rows (approximately)
/*!40000 ALTER TABLE `info_question` DISABLE KEYS */;
REPLACE INTO `info_question` (`id`, `name`) VALUES
	(1, 'Purpose of life?');
/*!40000 ALTER TABLE `info_question` ENABLE KEYS */;

-- Dumping structure for table gluten.info_question_categories_info_category
DROP TABLE IF EXISTS `info_question_categories_info_category`;
CREATE TABLE IF NOT EXISTS `info_question_categories_info_category` (
  `infoQuestionId` int(11) NOT NULL,
  `infoCategoryId` int(11) NOT NULL,
  PRIMARY KEY (`infoQuestionId`,`infoCategoryId`),
  KEY `IDX_61ae8b97242112c5debe145d88` (`infoQuestionId`),
  KEY `IDX_a7d39d2d36e6c165cab5d6e9a3` (`infoCategoryId`),
  CONSTRAINT `FK_61ae8b97242112c5debe145d881` FOREIGN KEY (`infoQuestionId`) REFERENCES `info_question` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_a7d39d2d36e6c165cab5d6e9a3e` FOREIGN KEY (`infoCategoryId`) REFERENCES `info_category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table gluten.info_question_categories_info_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `info_question_categories_info_category` DISABLE KEYS */;
REPLACE INTO `info_question_categories_info_category` (`infoQuestionId`, `infoCategoryId`) VALUES
	(1, 1);
/*!40000 ALTER TABLE `info_question_categories_info_category` ENABLE KEYS */;

-- Dumping structure for table gluten.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table gluten.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
