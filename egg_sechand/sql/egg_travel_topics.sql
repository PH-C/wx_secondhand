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
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `pic` varchar(1255) DEFAULT NULL,
  `content` text,
  `readSize` int(11) DEFAULT '0',
  `commentSize` int(11) DEFAULT '0',
  `tags` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'遇见最美教堂，无法想象的俄罗斯',
'/uploads/2f27765760a211fa1d01cecd1cc2dea3.jpeg,/uploads/8160ca1983abf2a5b05cadc54eb305f2.jpeg',
'俄罗斯 这个近邻总是若即若离\n老一辈人有很强的 俄罗斯 情节\n莫斯科 郊外的晚上，喀秋莎……\n而在年轻一代心目中\n俄罗斯 的形象则是冰冷和落后的\n远没有 法国 、 意大利 、 德国 、 英国 \n这些 欧洲 发达国家有吸引力\n再加上 俄罗斯 在 中国 的旅游宣传力度始终不大\n基础设施落后，办事效率低，国民英语水平等问题\n让 俄罗斯 旅游在 中国 主流阶层一直不温不火\n但其实 俄罗斯 在自然景观\n人文风情上一点不差\n甚至是让我惊喜'
,79,5,NULL,'2019-03-22 23:42:36','2019-03-30 21:07:53',1),(3,'11天漫游旧金山，一场圣诞节的私奔之旅（未完待续，更新中~~）','/uploads/b4a90197529d823626830c63e8f4226f.jpeg,/uploads/cdfb4c9286eeebe820386ae0b6fc328c.jpeg,/uploads/819f16dcfaf1f6802cc9f4521488ee58.jpeg,/uploads/342d02c310c448ad5af7ed20ad52d788.jpeg','朋友：“一个人的时候做多的最多的事情是什么？” 我：“旅行” 朋友：“不觉得无聊吗？” 我：“从未觉得，相反我会觉得更有趣和有意义” 朋友：“好吧” ··········',5,1,NULL,'2019-03-23 22:51:56','2019-03-30 20:45:49',5),(4,'飞越一万多公里，寻找伊斯坦布尔的猫和地中海的蓝（土耳其自驾）','/uploads/84f8c95ee2264ba9fd1d69b65490c681.jpg,/uploads/86fdfc786c2a21795e495e01bd4069af.jpeg,/uploads/563f9b33b55985c583a01a62f6a1a863.jpeg,/uploads/9e6a7d71383345d954b05592c8b65d52.jpeg','选择旅行的目的地，最重要的就是那个地方最吸引你的是什么，于我而言， 土耳其 最吸引我的三点就是： 伊斯坦布尔 的猫、 地中海 的蓝以及 格雷梅 的热气球。所以，我来了',9,0,'推荐','2019-03-29 21:17:52','2019-03-31 20:39:47',1),(6,'To the end of the earth-Antarctica南极','/uploads/6be05bec8ff5d3a96050660c33792932.jpeg,/uploads/2f46055a65a571d7f05691c787a08ebf.jpeg,/uploads/f469eaa06c122460b36ce3202ff65595.jpeg,/uploads/c5803282f5abcb96cbb75e5ee2ffd25f.jpeg,/uploads/548e8e027cf302259231a0e1e6bcaaa1.jpeg,/uploads/3593179fbcbeacd32bd810458dad1276.jpeg','明明还是几天以前的事情，回想起来，却遥远而又美好的像一场梦。 昨天刚刚回到 洛杉矶 ，从3月9号开始返航到回到家中，足足用了6天。在 布宜诺斯艾利斯 的机场我还和同行的船友感叹，就为了三天的登陆，前前后后搭进去了多少日子。船友说，正是因为南极是这样的遥远和难以到达，才显示出她的珍贵呀。 南极，这是世界最南端的大陆，也是世界上唯一一块没有常住人口的陆地。它不属于任何国家，有的只是冰雪和可爱的野生动物们，从它被发现到现在，人们都在小心翼翼的保护它，大概是想守住这最后的纯净吧。 很多年前我就开始在网上关注南极旅行的信息了，和大多数人一样，被去南极的高昂费用吓得望而却步。很多旅行社推出的团费基本都在10万元上下，基本不是普通人能够承担的价格。再加上从国内去到南美再坐船去南极这趟行程看上去就远的吓人，我也始终没有认认真真去做过攻略，查船票查机票之类。',11,0,'推荐','2019-03-29 22:34:57','2019-03-30 18:01:22',1);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-31 21:49:43
