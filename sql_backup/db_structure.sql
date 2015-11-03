
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
DROP TABLE IF EXISTS `funded_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funded_grant` (
  `grant_id` int(11) NOT NULL AUTO_INCREMENT,
  `grant_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `grant_desc` tinytext COLLATE utf8_unicode_ci,
  `grant_amount` decimal(10,0) DEFAULT NULL,
  `granter` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`grant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `funded_grant` WRITE;
/*!40000 ALTER TABLE `funded_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `funded_grant` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `project_grants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_grants` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `grant_id` int(11) DEFAULT NULL,
  `partial_amount` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `project_grants_project_id_fk_idx` (`project_id`),
  KEY `project_grants_grant_id_fk_idx` (`grant_id`),
  CONSTRAINT `project_grants_grant_id_fk` FOREIGN KEY (`grant_id`) REFERENCES `funded_grant` (`grant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_grants_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `project_grants` WRITE;
/*!40000 ALTER TABLE `project_grants` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_grants` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `project_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_info` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `project_description` text COLLATE utf8_unicode_ci,
  `hours_used` int(11) DEFAULT '0',
  `hours_allotted` int(11) DEFAULT '80',
  `start_date` datetime DEFAULT NULL,
  `completed_date` datetime DEFAULT NULL,
  `deployment_server` tinytext COLLATE utf8_unicode_ci,
  `git_repo` tinytext COLLATE utf8_unicode_ci,
  `status_id` int(11) DEFAULT NULL,
  `excess_hour_charges` decimal(12,3) DEFAULT NULL,
  `tech_used` text COLLATE utf8_unicode_ci,
  `misc_info` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`project_id`),
  KEY `project_info_status_id_fk_idx` (`status_id`),
  CONSTRAINT `project_info_status_id_fk` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `project_info` WRITE;
/*!40000 ALTER TABLE `project_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_info` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `project_researchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_researchers` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `researcher_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `pi_flag` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`idx`),
  KEY `project_researchers_researcher_id_fk_idx` (`researcher_id`),
  KEY `project_researchers_project_id_fk_idx` (`project_id`),
  CONSTRAINT `project_researchers_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_researchers_researcher_id_fk` FOREIGN KEY (`researcher_id`) REFERENCES `researcher` (`researcher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `project_researchers` WRITE;
/*!40000 ALTER TABLE `project_researchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_researchers` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `researcher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `researcher` (
  `researcher_id` int(11) NOT NULL AUTO_INCREMENT,
  `researcher_first_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `researcher_last_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `researcher_email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `researcher_phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `department` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`researcher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `researcher` WRITE;
/*!40000 ALTER TABLE `researcher` DISABLE KEYS */;
/*!40000 ALTER TABLE `researcher` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_text` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `css_class` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Active','status-active'),(2,'Blocked','status-blocked'),(3,'Not Started','status-not-started'),(4,'Completed','status-completed');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `user_project_contrib`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_project_contrib` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hours_contributed` double(8,5) DEFAULT '0.00000',
  `edit_flag` bit(1) NOT NULL DEFAULT b'0',
  `access_flag` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`idx`),
  KEY `user_project_contrib_user_id_fk_idx` (`user_id`),
  KEY `user_project_contrib_project_id_idx` (`project_id`),
  CONSTRAINT `user_project_contrib_project_id` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_project_contrib_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `user_project_contrib` WRITE;
/*!40000 ALTER TABLE `user_project_contrib` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_project_contrib` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `role_description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `user_first_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_last_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `edit_flag` bit(1) DEFAULT NULL,
  `access_flag` bit(1) DEFAULT NULL,
  `security_role` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_security_role_fk_idx` (`security_role`),
  CONSTRAINT `user_security_role_fk` FOREIGN KEY (`security_role`) REFERENCES `user_role` (`user_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

