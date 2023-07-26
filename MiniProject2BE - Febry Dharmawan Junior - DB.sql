CREATE DATABASE  IF NOT EXISTS `minpro2be` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `minpro2be`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: minpro2be
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `blogs_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `content` text,
  `video_url` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`blogs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (9,'Prabowo Subianto Dinilai Pemimpin Berani dan Bernyali',1,'image_url\\1689608791223-452121592.jpg',3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Eu ultrices vitae auctor eu. Ut sem nulla pharetra diam sit amet. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero. Dui faucibus in ornare quam viverra. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.','https://www.youtube.com/watch?v=phuAFkjF8s0','Prabs Jokowi Mega',1,'2023-07-17 15:46:31','2023-07-17 15:46:31'),(10,'Jokowi Jawab Kenapa Menkominfo Bukan dari NasDem, PDIP dan NasDem Beri Komentar',1,'image_url\\1689648610918-170459191.jpg',5,'Presiden Jokowi resmi melantik Budi Arie Setiadi sebagai Menteri Komunikasi dan Informatika (Menkominfo).\n\nBudi Arie sebelumnya menjabat Wakil Menteri Desa, Pembangunan Daerah Tertinggal dan Transmigrasi.\n\nAcara pelantikan berlangsung di Istana Negara, Jakarta, pada Senin, (17/72023).\n','https://www.youtube.com/watch?v=phuAFkjF8s0','Politik',3,'2023-07-18 02:50:11','2023-07-18 02:50:11'),(11,'Penemuan inovatif dalam riset medis menjanjikan pengobatan baru untuk alzheimer: harapan bagi penderita dan keluarga',2,'image_url\\1689651786830-513301199.png',2,'Dalam sebuah penelitian riset medis yang inovatif, para ilmuwan telah menemukan terobosan yang menjanjikan dalam upaya menemukan pengobatan baru untuk penyakit alzheimer. penemuan ini memberikan harapan baru bagi jutaan penderita alzheimer dan keluarga mereka. studi tersebut mengungkapkan pendekatan terapeutik yang berpotensi melambatkan perkembangan penyakit ini. temuan ini memberikan optimisme dalam menghadapi tantangan neurodegeneratif yang mempengaruhi fungsi otak.','https://www.youtube.com/watch?v=nrG0tKSYMHc','Alzheimer, riset medis, terobosan medis',3,'2023-07-18 03:43:07','2023-07-18 03:43:07'),(12,'Pameran consumer electronics show: melihat perkembangan terkini dalam teknologi',2,'image_url\\1689651985599-45794392.jpeg',1,'Pameran consumer electronics show (ces) telah memperkenalkan berbagai perkembangan terkini dalam dunia teknologi. dari smartphone canggih hingga perangkat rumah pintar, ces memamerkan produk-produk terbaru yang menarik perhatian. acara ini menjadi sorotan utama dengan kehadiran kecerdasan buatan, teknologi wearable, dan solusi ramah lingkungan yang akan mengubah cara kita berinteraksi dengan teknologi dalam kehidupan sehari-hari.','https://www.youtube.com/watch?v=iEpp2ZPIccI','consumer electronics show, teknologi, inovasi',2,'2023-07-18 03:46:25','2023-07-18 03:46:25'),(13,'Kesepakatan global dalam sidang perserikatan bangsa-bangsa: mengatasi perubahan iklim bersama-sama',2,'image_url\\1689652231643-617814142.jpeg',2,'Pemimpin dunia telah mencapai kesepakatan global dalam sidang perserikatan bangsa-bangsa untuk mengatasi perubahan iklim. kesepakatan ini bertujuan untuk mengurangi emisi gas rumah kaca dan mendorong upaya berkelanjutan dalam rangka menghadapi perubahan iklim. inisiatif ini menandai kolaborasi internasional dalam menjaga keberlanjutan planet kita dan memberikan solusi untuk tantangan perubahan iklim.','https://www.youtube.com/watch?v=PexfoAqbXL8','perubahan iklim, sidang perserikatan bangsa-bangsa, kesepakatan global',1,'2023-07-18 03:50:31','2023-07-18 03:50:31'),(14,'Kemitraan global dalam sidang perserikatan bangsa-bangsa: mengatasi krisis pengungsi secara bersama-sama',2,'image_url\\1689652454488-535114721.jpeg',2,'Pemimpin dunia telah mencapai kemitraan global dalam sidang perserikatan bangsa-bangsa untuk mengatasi krisis pengungsi secara bersama-sama. Kesepakatan ini bertujuan untuk meningkatkan perlindungan pengungsi, memperkuat kerjasama internasional dalam hal bantuan kemanusiaan, dan mendorong solusi berkelanjutan untuk pengungsi di seluruh dunia. Inisiatif ini menandai upaya kolaboratif yang kuat dalam menjaga kemanusiaan dan memberikan solusi bagi tantangan krisis pengungsi global.','https://www.youtube.com/watch?v=8LcE3Z_dEFs','Krisis pengungsi, sidang perserikatan bangsa-bangsa, kemitraan global',4,'2023-07-18 03:54:14','2023-07-18 03:54:14'),(15,'Prestasi Gemilang Atlet Renang di Kejuaraan Dunia',2,'image_url\\1689652630704-993935813.jpeg',1,'Seorang atlet renang telah mencapai prestasi gemilang dalam Kejuaraan Dunia. Dengan teknik yang sempurna dan kecepatan yang luar biasa, atlet ini berhasil memenangkan beberapa medali emas dan memecahkan rekor dunia. Keberhasilan ini menegaskan dominasi atlet dalam cabang olahraga renang dan menginspirasi para atlet muda untuk mengikuti jejaknya. Prestasi gemilang ini menjadi sorotan utama dalam dunia renang dan membangkitkan kebanggaan bagi negara atlet tersebut.','https://www.youtube.com/watch?v=DEF456','atlet renang, Kejuaraan Dunia, prestasi gemilang',4,'2023-07-18 03:57:10','2023-07-18 03:57:10'),(16,'Pertandingan Final Olimpiade: Duel Sengit antara Rival Abadi',2,'image_url\\1689652690426-889723673.jpeg',5,'Pertandingan final Olimpiade antara dua tim/individu rival telah menghasilkan duel sengit yang memukau penonton. Kedua pihak bermain dengan semangat kompetitif yang tinggi, memberikan pertunjukan olahraga yang luar biasa. Skor akhir yang tipis dan momen dramatis di lapangan membuat pertandingan ini menjadi salah satu yang tidak terlupakan dalam sejarah Olimpiade','https://www.youtube.com/watch?v=CDEFG123','final Olimpiade, rival abadi, duel sengit',3,'2023-07-18 03:58:10','2023-07-18 03:58:10'),(17,'Rekor Baru Dalam Lari Maraton: Mencapai Prestasi Luar Biasa',1,'image_url\\1689652712808-860346445.jpeg',4,'Seorang atlet lari maraton berhasil mencetak rekor baru yang menakjubkan dalam sebuah kompetisi. Dengan kecepatan dan ketahanan yang luar biasa, atlet ini berhasil menyelesaikan lomba dengan waktu yang lebih cepat daripada rekor sebelumnya. Prestasi ini tidak hanya mencerminkan dedikasi dan kerja keras atlet tersebut, tetapi juga menjadi inspirasi bagi para pelari di seluruh dunia untuk mendorong batas kemampuan mereka dan meraih prestasi yang luar biasa.','https://www.youtube.com/watch?v=789ABC','lari maraton, rekor baru, prestasi luar biasa',2,'2023-07-18 03:58:32','2023-07-18 03:58:32'),(18,'Kemenangan Dramatis Tim Nasional dalam Final Piala Dunia',2,'image_url\\1689652732102-652798009.jpeg',1,'Tim nasional sepak bola mencetak kemenangan yang mengejutkan dalam final Piala Dunia. Pertandingan yang penuh dengan ketegangan ini berakhir dengan skor akhir yang memenangkan tim nasional dan memastikan mereka menjadi juara dunia. Performa luar biasa dari para pemain dan strategi yang brilian membuat momen ini menjadi salah satu yang tak terlupakan dalam sejarah olahraga.','https://www.youtube.com/watch?v=123456','tim nasional, final Piala Dunia, kemenangan dramatis',1,'2023-07-18 03:58:52','2023-07-18 03:58:52'),(19,'Dampak Positif Olahraga dalam Kesehatan Mental',1,'image_url\\1689652814956-427225243.jpeg',5,'Olahraga memiliki dampak positif yang signifikan terhadap kesehatan mental seseorang. Aktivitas fisik yang teratur dapat membantu mengurangi stres, meningkatkan suasana hati, dan mengurangi risiko depresi dan kecemasan. Selain itu, olahraga juga dapat meningkatkan kepercayaan diri, konsentrasi, dan kualitas tidur. Dengan menjadikan olahraga sebagai bagian dari rutinitas sehari-hari, seseorang dapat meningkatkan kesehatan fisik dan mental mereka secara menyeluruh.','https://www.youtube.com/watch?v=ABC789','olahraga, kesehatan mental, dampak positif',4,'2023-07-18 04:00:15','2023-07-18 04:00:15'),(20,'Pentingnya Kesehatan Mental: Menjaga Keseimbangan Emosi dan Kesejahteraan',1,'image_url\\1689652915312-424700768.jpeg',1,'Kesehatan mental merupakan aspek penting dalam menjaga keseimbangan emosi dan kesejahteraan seseorang. Menjaga kesehatan mental melibatkan perhatian terhadap stres, kecemasan, dan depresi yang dapat mempengaruhi kualitas hidup seseorang. Dengan pemahaman yang lebih baik tentang pentingnya kesehatan mental, masyarakat semakin menyadari pentingnya mencari dukungan, berbagi pengalaman, dan mengakses layanan kesehatan mental.','https://www.youtube.com/watch?v=456DEF','kesehatan mental, keseimbangan emosi, kesejahteraan',2,'2023-07-18 04:01:55','2023-07-18 04:01:55'),(21,'Penemuan Terbaru dalam Pengobatan Kanker: Terapi Inovatif Menjanjikan',1,'image_url\\1689652932221-181246578.jpeg',4,'Dunia medis telah mengalami terobosan penting dalam pengobatan kanker dengan penemuan terapi inovatif yang menjanjikan. Terapi ini menggabungkan pendekatan baru dalam pengobatan kanker yang melibatkan penggunaan imunoterapi dan terapi gen. Melalui penelitian dan uji coba klinis, terapi ini telah menunjukkan hasil yang sangat menjanjikan dalam merangsang respons imun tubuh untuk melawan sel-sel kanker secara efektif.','https://www.youtube.com/watch?v=123ABC','pengobatan kanker, terapi inovatif, penemuan terbaru',1,'2023-07-18 04:02:12','2023-07-18 04:02:12'),(23,'The Starlight Chronicles: A Tale of Love and Destiny Across the Cosmos',1,'image_url\\1689653125981-693100470.jpeg',2,'In a distant galaxy, two star-crossed souls find themselves entangled in a celestial love story across the cosmos. As they traverse nebulae, planetary realms, and ancient civilizations, their paths intertwine, guided by a mysterious force. Along their journey','https://www.youtube.com/watch?v=ABC789','starlight chronicles, love, destiny, cosmic journey',2,'2023-07-18 04:05:26','2023-07-18 04:05:26'),(24,'The Secret Key: Unlocking the Mysteries of a Hidden Society',1,'image_url\\1689653183768-249996255.jpeg',1,'In a bustling city, an ordinary individual stumbles upon a hidden key granting access to a secret society beneath everyday life. As they navigate corridors, encounter enigmatic characters, and solve riddles, they unravel the society\'s origins and its role in shaping the world. ','https://www.youtube.com/watch?v=DEF789','secret key, hidden society, mystery, self-discovery',3,'2023-07-18 04:06:23','2023-07-18 04:06:23'),(25,'Embracing Diversity: Celebrating Cultural Heritage and Inclusion',1,'image_url\\1689653275743-655591984.jpeg',2,'Embrace diversity and celebrate cultural heritage. Foster inclusivity, promote understanding, and value different perspectives. By embracing diversity, we learn, broaden our horizons, and create harmonious societies. Explore the importance of cultural heritage, the benefits of inclusion, and the power of embracing diversity.','https://www.youtube.com/watch?v=789DEF','diversity, cultural heritage, inclusion, global perspective',3,'2023-07-18 04:07:55','2023-07-18 04:07:55'),(26,'Exploring the Wonders of the Universe: Journey to the Cosmos',2,'image_url\\1689653288160-803008000.jpeg',2,'Embark on a journey to the cosmos and explore the wonders of the universe. From captivating images captured by telescopes to mind-boggling theories of astrophysics, delve into topics like black holes and the origins of the universe. Expand your understanding of the cosmos and ponder the mysteries beyond our earthly realm.','https://www.youtube.com/watch?v=456ABC','universe, cosmos, exploration, astrophysics',2,'2023-07-18 04:08:08','2023-07-18 04:08:08'),(27,'The Art of Storytelling: Unleashing Creativity and Captivating Audiences',1,'image_url\\1689653299749-722584823.jpeg',4,'Experience the art of storytelling, a timeless tradition that entertains, educates, and inspires. Stories transport us, evoke emotions, and shape our lives. They share important messages and ignite our imagination. Discover the power of storytelling, its impact on society, and the ways it unleashes creativity.','https://www.youtube.com/watch?v=ABC789','storytelling, creativity, narratives, impact',4,'2023-07-18 04:08:20','2023-07-18 04:08:20'),(28,'The Rise of E-commerce: Transforming the Way We Shop',2,'image_url\\1689653352512-848486146.jpeg',2,'The advent of e-commerce has revolutionized the retail industry, transforming the way we shop. Online platforms have made it easier than ever for businesses to reach a global customer base, while consumers enjoy the convenience of browsing and purchasing products from the comfort of their homes. This topic explores the growth of e-commerce, its impact on traditional brick-and-mortar stores, and the strategies businesses employ to thrive in the digital marketplace.','https://www.youtube.com/watch?v=123XYZ','e-commerce, online shopping, retail industry',1,'2023-07-18 04:09:12','2023-07-18 04:09:12'),(30,'The Future of Work: Embracing Automation and AI',1,'image_url\\1689653383160-841191134.jpeg',1,'Rapid advancements in automation and artificial intelligence (AI) are reshaping the future of work. As businesses seek efficiency and productivity gains, technology plays an increasingly significant role in various industries. This topic explores the benefits and challenges of automation and AI in the workplace, the potential impact on jobs, and the importance of upskilling and adapting to the evolving work landscape.','https://www.youtube.com/watch?v=ABC789','future of work, automation, artificial intelligence',4,'2023-07-18 04:09:43','2023-07-18 04:09:43'),(31,'The Rise of Artificial Intelligence: Exploring Its Potential and Impact',2,'image_url\\1689653957478-16777027.jpeg',6,'Artificial Intelligence (AI) has emerged as a transformative technology with the potential to revolutionize various industries. From autonomous vehicles and virtual assistants to machine learning algorithms, AI is reshaping the way we live and work. This topic delves into the advancements, applications, and ethical considerations surrounding AI, highlighting its potential to drive innovation, improve efficiency, and raise important questions about the future of technology and humanity.','https://www.youtube.com/watch?v=123XYZ','artificial intelligence, technology, innovation',1,'2023-07-18 04:19:17','2023-07-18 04:19:17'),(32,' Smart Cities: Membangun Lingkungan Perkotaan Berkelanjutan',2,'image_url\\1689648610918-170459191.jpg',3,' Smart cities memanfaatkan teknologi dan data untuk menciptakan lingkungan perkotaan yang berkelanjutan dan efisien. Topik ini menjelajahi integrasi teknologi digital, IoT, dan analisis data untuk meningkatkan infrastruktur, mobilitas, dan alokasi sumber daya yang optimal. Temukan bagaimana smart cities meningkatkan kualitas hidup, mempromosikan keberlanjutan lingkungan, dan memungkinkan partisipasi warga dalam membentuk kota-kota masa depan.',' https://www.youtube.com/watch?v=ABC789',' smart cities, keberlanjutan perkotaan, teknologi digital',4,'2023-07-19 16:30:51','2023-07-19 16:30:51'),(33,' The Power of Innovation: Mendorong Pertumbuhan Ekonomi dan Daya Saing',1,'image_url\\1689648610918-170459191.jpg',6,' Inovasi memainkan peran penting dalam mendorong pertumbuhan ekonomi, meningkatkan produktivitas, dan memperkuat daya saing. Topik ini menjelajahi pentingnya riset dan pengembangan, kemajuan teknologi, dan kewirausahaan dalam menciptakan ekosistem inovasi. Temukan bagaimana inovasi menciptakan lapangan kerja, mengguncang industri, dan menghasilkan kemakmuran ekonomi di dunia yang dinamis dan saling terhubung saat ini.',' https://www.youtube.com/watch?v=789DEF',' inovasi, pertumbuhan ekonomi, kewirausahaan',3,'2023-07-19 16:31:17','2023-07-19 16:31:17'),(34,' The Gig Economy: Mengubah Konsep Kerja di Era Digital',1,'image_url\\1689648610918-170459191.jpg',2,' Ekonomi gig telah mengubah cara orang bekerja dengan menawarkan fleksibilitas dan peluang bagi pekerja lepas dan kontraktor mandiri. Topik ini mengkaji dampak ekonomi gig pada pola kerja, munculnya pekerjaan berbasis platform, serta tantangan dan manfaat bagi pekerja dan bisnis. Temukan perkembangan lanskap kerja, kontribusi ekonomi gig pada inovasi, dan pentingnya perlindungan tenaga kerja di era baru ini.',' https://www.youtube.com/watch?v=456ABC',' ekonomi gig, pekerja lepas, pekerjaan berbasis platform',2,'2023-07-19 16:31:28','2023-07-19 16:31:28'),(35,' Transformasi Digital: Membekali Bisnis untuk Masa Depan',2,'image_url\\1689784542039-822780161.jpg',1,' Transformasi digital telah menjadi keharusan strategis bagi bisnis yang ingin tetap bersaing di era digital. Topik ini menjelajahi adopsi teknologi digital, seperti komputasi awan, kecerdasan buatan, dan analisis data, untuk mengoptimalkan proses, meningkatkan pengalaman pelanggan, dan mendorong inovasi. Temukan manfaat',' https://www.youtube.com/watch?v=123XYZ',' transformasi digital, adopsi teknologi, inovasi',1,'2023-07-19 16:35:42','2023-07-19 16:35:42'),(36,' Mendorong Kewirausahaan: Mendorong Inovasi dan Pertumbuhan Ekonomi',2,'image_url\\1689785170567-470292872.jpg',6,' Kewirausahaan adalah salah satu pendorong utama inovasi, penciptaan lapangan kerja, dan pertumbuhan ekonomi. Topik ini menjelajahi mentalitas kewirausahaan, proses memulai dan mengembangkan bisnis, serta pentingnya menciptakan ekosistem kewirausahaan yang kondusif. Temukan tantangan dan peluang yang dihadapi oleh para pengusaha, peran kewirausahaan dalam mendorong perkembangan sosial dan ekonomi, serta sistem dukungan yang tersedia untuk membantu mengembangkan para pengusaha berbakat.',' https://www.youtube.com/watch?v=789DEF',' kewirausahaan, inovasi, pertumbuhan ekonomi',3,'2023-07-19 16:46:10','2023-07-19 16:46:10'),(37,' Revolusi Industri 4.0: Membentuk Masa Depan Produksi dan Ketenagakerjaan',2,'image_url\\1689785856925-677932862.jpg',2,' Revolusi Industri 4.0 merujuk pada revolusi teknologi yang membawa perubahan mendasar dalam berbagai sektor industri. Dengan adopsi teknologi seperti Internet of Things (IoT), kecerdasan buatan (AI), dan otomatisasi, Industri 4.0 mendorong efisiensi, produktivitas, dan inovasi. Topik ini menjelajahi peran teknologi dalam Industri 4.0, dampaknya terhadap lapangan kerja, dan persiapan yang diperlukan dalam menghadapi perubahan ini.',' https://www.youtube.com/watch?v=789DEF',' Industri 4.0, Internet of Things, kecerdasan buatan',3,'2023-07-19 16:57:37','2023-07-19 16:57:37'),(38,' Analitika Data: Menggali Wawasan Berharga untuk Keputusan Bisnis',1,'image_url\\1689785878546-294196680.jpg',5,' Analitika data menjadi alat penting bagi bisnis dalam memperoleh wawasan, membuat keputusan yang terinformasi, dan mencapai kesuksesan. Dengan memanfaatkan kekuatan data, perusahaan dapat mengidentifikasi tren, mengoptimalkan operasi, dan mempersonalisasi pengalaman pelanggan. Topik ini menjelajahi dunia analitika data, aplikasinya di berbagai industri, dan bagaimana bisnis memanfaatkannya untuk tetap kompetitif dalam lanskap bisnis yang didorong oleh data saat ini.',' https://www.youtube.com/watch?v=ABC789',' analitika data, wawasan bisnis, pengambilan keputusan',4,'2023-07-19 16:57:58','2023-07-19 16:57:58'),(39,' Politik Identitas: Menjelajahi Peran Identitas dalam Dinamika Politik',1,'image_url\\1689786046888-249647097.jpg',1,' Politik identitas mengacu pada pengaruh identitas seperti etnis, agama, dan gender dalam proses politik dan pembentukan opini publik. Topik ini menjelaskan peran politik identitas dalam mendorong solidaritas kelompok, membentuk persepsi politik, dan memengaruhi kebijakan publik. Temukan bagaimana politik identitas memengaruhi dinamika politik di tingkat lokal dan global, serta tantangan dan peluang yang muncul dalam membangun masyarakat yang inklusif dan beragam.',' https://www.youtube.com/watch?v=ABC789',' politik identitas, solidaritas kelompok, kebijakan publik',4,'2023-07-19 17:00:46','2023-07-19 17:00:46'),(40,' Pemerintahan yang Baik: Mendorong Transparansi dan Akuntabilitas',1,'image_url\\1689786082763-176138997.jpg',4,' Pemerintahan yang baik merupakan prinsip yang menekankan transparansi, partisipasi publik, dan akuntabilitas dalam tata kelola negara. Topik ini membahas pentingnya pemerintahan yang baik dalam memastikan keadilan, efisiensi, dan responsivitas pemerintah terhadap kebutuhan rakyat. Temukan bagaimana praktik pemerintahan yang baik dapat meningkatkan kualitas hidup masyarakat, memerangi korupsi, dan membangun kepercayaan antara pemerintah dan rakyat.',' https://www.youtube.com/watch?v=789DEF',' pemerintahan yang baik, transparansi, akuntabilitas',3,'2023-07-19 17:01:22','2023-07-19 17:01:22');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Umum','2023-07-21 11:12:18','2023-07-21 11:12:18'),(2,'Olahraga','2023-07-21 11:12:18','2023-07-21 11:12:18'),(3,'Ekonomi','2023-07-21 11:12:18','2023-07-21 11:12:18'),(4,'Politik','2023-07-21 11:12:18','2023-07-21 11:12:18'),(5,'Bisnis','2023-07-21 11:12:18','2023-07-21 11:12:18'),(6,'Fiksi','2023-07-21 11:12:18','2023-07-21 11:12:18');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Indonesia','2023-07-21 11:01:49','2023-07-21 11:01:49'),(2,'Malaysia','2023-07-21 11:01:49','2023-07-21 11:01:49'),(3,'Argentina','2023-07-21 11:01:49','2023-07-21 11:01:49'),(4,'Paraguay','2023-07-21 11:01:49','2023-07-21 11:01:49'),(5,'Jepang','2023-07-21 11:01:49','2023-07-21 11:01:49'),(6,'Inggris','2023-07-21 11:01:49','2023-07-21 11:01:49'),(7,'Australia','2023-07-21 11:01:49','2023-07-21 11:01:49'),(8,'Kenya','2023-07-21 11:01:49','2023-07-21 11:01:49'),(9,'Nigeria','2023-07-21 11:01:49','2023-07-21 11:01:49'),(10,'Uganda','2023-07-21 11:01:49','2023-07-21 11:01:49'),(11,'Somalia','2023-07-21 11:01:49','2023-07-21 11:01:49');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230712114442-create-users-table.js'),('20230712123125-create-users.js'),('20230712123418-create-users.js'),('20230716095258-create-table-blogs.js'),('20230716100032-create-table-category.js'),('20230716100353-create-table-countries.js'),('20230717023903-create-table-blogs.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `isverified` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'angsa1','$2b$10$3TEszodLs09m25MPr.NQ8udaiVz64g6MmrS3Rn4dalmElkmZYZZwe','123456789','angsabelanda1@gmail.com',NULL,1,'2023-07-12 12:37:51','2023-07-13 12:54:27'),(2,'admin','$2b$10$zgmo8Z4UuCQmDZfF.rp6dOajJVfYLlctSIlvF4U14YKKHzwNg9oAy','12334567','angsa12@gmail.com','avatars\\admin-20230724-960635154.jpg',1,'2023-07-13 12:13:13','2023-07-13 14:26:26'),(7,'febryjunior','$2b$10$dhO.PyIM3pw2PMUOluCwpe5785YrrRHx1iuEBb70lPnXpbN7uo1gu','08123456789','pratojoko@gmail.com','avatars\\febryjunior-20230725-369404527.png',1,'2023-07-25 13:04:30','2023-07-25 13:23:39');
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

-- Dump completed on 2023-07-26 11:45:04
