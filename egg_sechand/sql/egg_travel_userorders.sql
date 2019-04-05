-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: egg_travel
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `userorders`
--

DROP TABLE IF EXISTS `userorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userorders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `originalPrice` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `orderState` int(11) NOT NULL DEFAULT '1',
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userorders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userorders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userorders`
--

LOCK TABLES `userorders` WRITE;
/*!40000 ALTER TABLE `userorders` DISABLE KEYS */;
INSERT INTO `userorders` VALUES (5,2199,2199,3,'李明,18998767893,江西省北京市昌平区回龙观','2019-03-29 23:06:23','2019-03-30 02:17:17',1,1,'成人票'),(6,2199,2199,3,'李明,18998767893,江西省南昌市南昌大学','2019-03-29 23:09:20','2019-03-30 02:14:07',1,1,'成人票'),(7,2199,2199,3,'李明,18998767893,江西省北京市昌平区回龙观','2019-03-30 02:34:27','2019-03-30 02:39:27',1,1,'成人票'),(8,1680,1680,3,'李明,18998767893,江西省北京市昌平区回龙观','2019-03-30 02:35:22','2019-03-30 02:39:21',9,1,'成人票'),(9,2199,2199,3,'李明,18998767893,江西省北京市昌平区回龙观','2019-03-30 02:39:15','2019-03-30 16:33:22',1,1,'成人票'),(10,1680,1680,3,'李明,18998767893,江西省南昌市南昌大学','2019-03-30 18:04:24','2019-03-30 18:08:40',9,1,'成人票');
/*!40000 ALTER TABLE `userorders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-31 21:49:44
