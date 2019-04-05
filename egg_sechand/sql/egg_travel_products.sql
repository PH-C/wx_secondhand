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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT '0',
  `sku` int(11) DEFAULT '0',
  `pic` varchar(255) DEFAULT NULL,
  `articleNumber` varchar(255) DEFAULT NULL,
  `describe` text,
  `type` varchar(255) DEFAULT NULL,
  `readSize` int(11) DEFAULT '0',
  `isHot` tinyint(1) NOT NULL DEFAULT '0',
  `isRecommend` int(11) NOT NULL DEFAULT '0',
  `tags` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,
'全景畅销·张家界玻璃桥+天门山玻璃栈道+森林公园+凤凰 品质4日游（畅享仙境般的山水秘境）',
2199,
995,
'/uploads/a9a9df37b6bb95cf1f1e1ce7077dcd5b.jpeg,
/uploads/d85ec7f1efc8bbd11d4e0154ef6b4af8.jpeg,
/uploads/d17a37ecdf8044ca1ced533ed54d1a93.jpeg,
/uploads/80adef348b55543feb3875cd3732f4f9.jpeg',
'noash10001',
'费用包含1. 门票：行程内景点均已含（大峡谷，玻璃桥，森林公园，天门山及大索道，凤凰免门票）；2. 赠游：百龙天梯上行+凤凰农家船游沱江（价值128元）；3. 用餐：含3早餐（10元/餐），6正餐（20元/餐，10人1桌，8菜1汤）；4. 交通：空调旅游车，车型视成团人数合理安排，确保每人1座位；景区内为公共环保车；5. 导游：持证导游提供服务；',
'门票',0,0,1,'张家界','2019-03-29 22:51:26','2019-03-30 02:39:16','成人票,儿童票,学生票'),(9,'云南6日慢时光定制游（吉普车环洱海旅拍+双廊网红玻璃球/天空之境打卡+手工制作鲜花饼+索道慢游苍山+丽江古城街拍）可升级猪槽船游泸沽湖·香格里拉圣地秘境',1680,-2,'/uploads/1dd6b5182c33552d423ab5ae6e840feb.jpeg,/uploads/04e1eeb1360d90bfb6dd0eda617a9ac8.jpeg,/uploads/fbc7e2a21b44d9beb2aa8d92861661a5.jpeg,/uploads/e8b3cf8d39e2641aa49b98a5b25c6914.png,/uploads/9c9146b24ee59c5acd91ccf54a470dc3.png','n567dfff','费用说明\n费用包含\n1. 大交通：出发地往返丽江/昆明/大理/西双版纳/腾冲的机票；\n2. 酒店：丽江当地特色客栈或舒适豪华酒店、大理洱海海景酒店或精品商务酒店、泸沽湖湖景客栈/酒店或精品商务酒店、香格里拉藏式特色豪华酒店或者精品商务酒店（具体住宿酒店可根据您的需求安排）；\n3. 接送机：昆明/丽江/大理/西双版纳/腾冲机场24小时接送机服务；\n4. 包车：2人起订，车辆大小以贵宾人数而定，5座轿车（大众、丰田、比亚迪、长城），7座/9座商务车（瑞丰、阁瑞斯、奔驰），超过以上人数安排正规空调旅游大巴（宇通、金龙），自由活动时间除外；\n5. 餐饮：酒店含早餐，不含正餐，可自由选择当地特色美食；\n6. 门票：丽江（拉市海门票、束河古镇门票、玉龙雪山大门票、冰川大索道），大理（蝴蝶泉、崇圣寺三塔大门票、洱海游轮船票、南诏风情岛），香格里拉（虎跳峡、独克宗古城、香巴拉时轮坛城、普达措国家森林公园大门票、藏家土司宴），泸沽湖（泸沽湖进山费、里务比岛、摩梭家访大门票、猪槽船船票）；\n7. 导游：司机兼导游或优秀导游服务；\n8. 保险：云南省旅游组合保险、旅游人生意外保险。\n由于定制的特殊性，页面价格仅供参考，需根据您的具体需求进行二次核价。\n\n费用不含\n1. 团队机票将统一出票，一经出票不退不改，团队机票不含行李托运费； \n2. 为更好地保护世界文化遗产丽江古城，凡进入丽江古城区、玉龙纳西族自治县境内旅游及从事其他活动的人员需依法交缴丽江古城维护费50元/人，大理古城维护费35元/人，古城维护费交纳一次七日内有效，古城、客栈、酒店以及各大景区均需查验，请妥善保管票据； \n3. 因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用；\n4. 酒店内洗衣、理发、电话、传真、饮品、烟酒等个人消费；\n5. 未含行程中的餐费，我们提供美食推荐，敬请自理；\n6. 未含景区观光车费用和景区增值娱乐项目，贵宾可自愿选择；\n7. 一切个人消费及上述费用包含中未提及的项目。\n\n其他说明\n1. 因我们旅行社提供的旅游产品是打包套餐票，是所有项目都打包在一起的，报价已享受整体包价优惠，故学生证、老年证、军官证等各种特殊优待证件均不再享受二次优惠，请您谅解！\n2. 由于不可抗拒的自然因素或者个人原因，导致行程无法正常进行或全部走完的，旅行社不予退还相关费用，敬请谅解；\n3. 本产品行程实际出行中，在不减少景点的前提下，司机可能会根据天气、交通以及车程等情况，对您的行程顺序进行适当调整，以确保行程顺利进行，敬请谅解。','门票',0,0,1,NULL,'2019-03-30 00:13:28','2019-03-30 18:04:24','成人票,儿童票,学生票');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-31 21:49:45
