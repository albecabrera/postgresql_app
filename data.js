// DVD Rental sample data – SQLite-compatible schema + data
window.DVD_RENTAL_SQL = `
-- ── TABLES ────────────────────────────────────────────────────────────

CREATE TABLE country (
  country_id   INTEGER PRIMARY KEY,
  country      TEXT NOT NULL
);

CREATE TABLE city (
  city_id    INTEGER PRIMARY KEY,
  city       TEXT NOT NULL,
  country_id INTEGER REFERENCES country(country_id)
);

CREATE TABLE address (
  address_id  INTEGER PRIMARY KEY,
  address     TEXT NOT NULL,
  district    TEXT,
  city_id     INTEGER REFERENCES city(city_id),
  postal_code TEXT,
  phone       TEXT
);

CREATE TABLE language (
  language_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL
);

CREATE TABLE category (
  category_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL
);

CREATE TABLE actor (
  actor_id   INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL
);

CREATE TABLE film (
  film_id          INTEGER PRIMARY KEY,
  title            TEXT NOT NULL,
  description      TEXT,
  release_year     INTEGER,
  language_id      INTEGER REFERENCES language(language_id),
  rental_duration  INTEGER DEFAULT 3,
  rental_rate      REAL DEFAULT 4.99,
  length           INTEGER,
  replacement_cost REAL DEFAULT 19.99,
  rating           TEXT DEFAULT 'G'
);

CREATE TABLE film_actor (
  actor_id INTEGER REFERENCES actor(actor_id),
  film_id  INTEGER REFERENCES film(film_id),
  PRIMARY KEY (actor_id, film_id)
);

CREATE TABLE film_category (
  film_id     INTEGER REFERENCES film(film_id),
  category_id INTEGER REFERENCES category(category_id),
  PRIMARY KEY (film_id, category_id)
);

CREATE TABLE inventory (
  inventory_id INTEGER PRIMARY KEY,
  film_id      INTEGER REFERENCES film(film_id),
  store_id     INTEGER
);

CREATE TABLE customer (
  customer_id INTEGER PRIMARY KEY,
  store_id    INTEGER,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT,
  address_id  INTEGER REFERENCES address(address_id),
  active      INTEGER DEFAULT 1
);

CREATE TABLE staff (
  staff_id   INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  address_id INTEGER REFERENCES address(address_id),
  email      TEXT,
  store_id   INTEGER,
  active     INTEGER DEFAULT 1,
  username   TEXT NOT NULL,
  password   TEXT
);

CREATE TABLE store (
  store_id         INTEGER PRIMARY KEY,
  manager_staff_id INTEGER REFERENCES staff(staff_id),
  address_id       INTEGER REFERENCES address(address_id)
);

CREATE TABLE rental (
  rental_id    INTEGER PRIMARY KEY,
  rental_date  TEXT NOT NULL,
  inventory_id INTEGER REFERENCES inventory(inventory_id),
  customer_id  INTEGER REFERENCES customer(customer_id),
  return_date  TEXT,
  staff_id     INTEGER REFERENCES staff(staff_id)
);

CREATE TABLE payment (
  payment_id  INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customer(customer_id),
  staff_id    INTEGER REFERENCES staff(staff_id),
  rental_id   INTEGER REFERENCES rental(rental_id),
  amount      REAL NOT NULL,
  payment_date TEXT NOT NULL
);

-- ── DATA ──────────────────────────────────────────────────────────────

INSERT INTO country VALUES
(1,'Afghanistan'),(2,'Algeria'),(3,'American Samoa'),(4,'Angola'),
(5,'Anguilla'),(6,'Argentina'),(7,'Armenia'),(8,'Australia'),
(9,'Austria'),(10,'Azerbaijan'),(11,'Bahrain'),(12,'Bangladesh'),
(13,'Belarus'),(14,'Bolivia'),(15,'Brazil'),(16,'Bulgaria'),
(17,'Cambodia'),(18,'Cameroon'),(19,'Canada'),(20,'Chad'),
(21,'Chile'),(22,'China'),(23,'Colombia'),(24,'Congo, The Democratic Republic of the'),
(25,'Czech Republic'),(26,'Dominican Republic'),(27,'Ecuador'),(28,'Egypt'),
(29,'Estonia'),(30,'Ethiopia'),(31,'Faroe Islands'),(32,'Finland'),
(33,'France'),(34,'French Guiana'),(35,'French Polynesia'),(36,'Gambia'),
(37,'Germany'),(38,'Greece'),(39,'Greenland'),(40,'Holy See (Vatican City State)'),
(41,'Hong Kong'),(42,'Hungary'),(43,'India'),(44,'Indonesia'),
(45,'Iran'),(46,'Iraq'),(47,'Israel'),(48,'Italy'),
(49,'Japan'),(50,'Kazakstan'),(51,'Kenya'),(52,'Kuwait'),
(53,'Latvia'),(54,'Liechtenstein'),(55,'Lithuania'),(56,'Madagascar'),
(57,'Malawi'),(58,'Malaysia'),(59,'Mali'),(60,'Mexico'),
(61,'Moldova'),(62,'Morocco'),(63,'Mozambique'),(64,'Myanmar'),
(65,'Nauru'),(66,'Nepal'),(67,'Netherlands'),(68,'New Zealand'),
(69,'Nigeria'),(70,'North Korea'),(71,'Oman'),(72,'Pakistan'),
(73,'Paraguay'),(74,'Peru'),(75,'Philippines'),(76,'Poland'),
(77,'Puerto Rico'),(78,'Romania'),(79,'Russian Federation'),(80,'Saint Vincent and the Grenadines'),
(81,'Saudi Arabia'),(82,'Senegal'),(83,'Slovakia'),(84,'South Korea'),
(85,'Spain'),(86,'Sri Lanka'),(87,'Sudan'),(88,'Sweden'),
(89,'Switzerland'),(90,'Taiwan'),(91,'Tanzania'),(92,'Thailand'),
(93,'Tonga'),(94,'Tunisia'),(95,'Turkey'),(96,'Turkmenistan'),
(97,'Tuvalu'),(98,'Ukraine'),(99,'United Arab Emirates'),(100,'United Kingdom'),
(101,'United States'),(102,'Venezuela'),(103,'Vietnam'),(104,'Virgin Islands, U.S'),
(105,'Yemen'),(106,'Yugoslavia'),(107,'Zambia'),(108,'Zimbabwe');

INSERT INTO city VALUES
(1,'A Corua (La Corua)',87),(2,'Abha',81),(3,'Abu Dhabi',99),
(4,'Acua',60),(5,'Adana',95),(6,'Addis Abeba',30),
(7,'Aden',105),(8,'Adoni',43),(9,'Ahmadnagar',43),
(10,'Akishima',49),(11,'Akron',101),(12,'al-Ayn',99),
(13,'al-Hawiya',81),(14,'al-Manama',11),(15,'al-Qadarif',87),
(16,'al-Qatif',81),(17,'Alessandria',48),(18,'Allappuzha (Alleppey)',43),
(19,'Allende',60),(20,'Almirante Brown',6),(21,'Alvorada',15),
(22,'Ambattur',43),(23,'Amersfoort',67),(24,'Amroha',43),
(25,'Angra dos Reis',15),(26,'Anjarakandy',43),(27,'Ankawa',46),
(28,'Antalya',95),(29,'Antofagasta',21),(30,'Aparecida de Goinia',15),
(31,'Apeldoorn',67),(32,'Araatuba',15),(33,'Arak',45),
(34,'Arecibo',77),(35,'Arlington',101),(36,'Ashdod',47),
(37,'Ashgabat',96),(38,'Ashqelon',47),(39,'Asuncin',73),
(40,'Athens',38),(41,'Athenai',38),(42,'Atinsk',79),
(43,'Augusta-Richmond County',101),(44,'Aurora',101),(45,'Ava',64),
(46,'Baha Blanca',6),(47,'Baicheng',22),(48,'Baiyin',22),
(49,'Baku',10),(50,'Balaiha',79),(51,'Balikesir',95),
(52,'Balurghat',43),(53,'Bamenda',18),(54,'Bandar Seri Begawan',3),
(55,'Banjul',36),(56,'Barcelona',102),(57,'Basel',89),
(58,'Bat Yam',47),(59,'Batman',95),(60,'Batna',2),
(61,'Battambang',17),(62,'Beira',63),(63,'Belm',15),
(64,'Benguela',4),(65,'Beni-Mellal',62),(66,'Benin City',69),
(67,'Bergamo',48),(68,'Berhampore (Baharampur)',43),(69,'Bhavnagar',43),
(70,'Bhilwara',43),(71,'Bhimavaram',43),(72,'Bhopal',43),
(73,'Bhusawal',43),(74,'Bijapur',43),(75,'Bilbays',28),
(76,'Binzhou',22),(77,'Birjand',45),(78,'Bishkek',50),
(79,'Blumenau',15),(80,'Boksburg',84),(81,'Botosani',78),
(82,'Botshabelo',84),(83,'Bradford',100),(84,'Braslia',15),
(85,'Bratislava',83),(86,'Brockton',101),(87,'Cam Ranh',103),
(88,'Cape Coral',101),(89,'Caracas',102),(90,'Carmen',60),
(91,'Cavite',75),(92,'Celaya',60),(93,'Chandrapur',43),
(94,'Changhwa',90),(95,'Changzhou',22),(96,'Chapra',43),
(97,'Charlotte Amalie',104),(98,'Chengdu',22),(99,'Chennai (Madras)',43),
(100,'Chisinau',61),(101,'Chungho',90),(102,'Cianjur',44),
(103,'Ciomas',44),(104,'Ciparay',44),(105,'Citrus Heights',101),
(106,'Ciudad del Este',73),(107,'Clarksville',101),(108,'Coacalco de Berriozbal',60),
(109,'Cobija',14),(110,'Cochabamba',14),(111,'Coimbra',86),
(112,'Columbuo',101),(113,'Compton',101),(114,'Coquimbo',21),
(115,'Crdoba',6),(116,'Cuautla',60),(117,'Cuiab',15),
(118,'Culiacan',60),(119,'Cundinamarca',23),(120,'Czestochowa',76);

INSERT INTO city VALUES
(121,'Dadu',72),(122,'Dakar',82),(123,'Dammam',81),(124,'Damoh',43),
(125,'Davao',75),(126,'Dehri',43),(127,'Denizli',95),(128,'Dhule (Dhulia)',43),
(129,'Dongying',22),(130,'Donostia-San Sebastin',85),(131,'Dordrecht',67),
(132,'Downey',101),(133,'Drobeta-Turnu Severin',78),(134,'Duque de Caxias',15),
(135,'Dushanbe',92),(136,'Esfahan',45),(137,'Eskisehir',95),(138,'Etawah',43),
(139,'Ezeiza',6),(140,'Ezhou',22),(141,'Faaa',35),(142,'Faisalabad',72),
(143,'Firozabad',43),(144,'Florencia',23),(145,'Fontana',101),(146,'Fukuyama',49),
(147,'Funafuti',97),(148,'Fuyu',22),(149,'Fuzhou',22),(150,'Gandhinagar',43),
(151,'Garden Grove',101),(152,'Garland',101),(153,'Gaza',47),(154,'Gaziantep',95),
(155,'Gijn',85),(156,'Gizeh',28),(157,'Goinia',15),(158,'Gorontalo',44),
(159,'Grand Prairie',101),(160,'Graz',9),(161,'Groriesain',37),
(162,'Guadalajara',60),(163,'Guaruj',15),(164,'guilin',22),(165,'Gujranwala',72),
(166,'Gulbarga',43),(167,'Gungoren',95),(168,'Guoxian',22),(169,'Haikou',22),
(170,'Hami',22),(171,'Hannover',37),(172,'Hanoi',103),(173,'Harare',108),
(174,'Harbin',22),(175,'Haiphong',103),(176,'Hilla',46),(177,'Hino',49),
(178,'Hitachi',49),(179,'Hodeida',105),(180,'Hokitika',68),(181,'Homs',100),
(182,'Huaian',22),(183,'Hubli-Dharwad',43),(184,'Hyderabad',43),
(185,'Hyderabad',72),(186,'Ibirit',15),(187,'Idfu',28),(188,'Ife',69),
(189,'Ikerre',69),(190,'Iligan',75),(191,'Ilorin',69),(192,'Imus',75),
(193,'Inegl',95),(194,'Ipoh',58),(195,'Ismailia',28),(196,'Ivanovo',79),
(197,'Iwaki',49),(198,'Izhevsk',79),(199,'Jaboatao dos Guararapes',15),
(200,'Jahra',52);

INSERT INTO city VALUES
(201,'Jaipur',43),(202,'Jakarta',44),(203,'Jalandhar',43),(204,'Jalgaon',43),
(205,'Jalib al-Shuyukh',52),(206,'Jambi',44),(207,'Janow Lubelski',76),
(208,'Jastrzebie-Zdroj',76),(209,'Jedda',81),(210,'Jelets',79),(211,'Jiddah',81),
(212,'Jinchang',22),(213,'Jining',22),(214,'Jinzhou',22),(215,'Jodhpur',43),
(216,'Johannesburg',84),(217,'Jolo',75),(218,'Juazeiro do Norte',15),
(219,'Juiz de Fora',15),(220,'Junan',22),(221,'Kabul',1),(222,'Kaduna',69),
(223,'Kakamigahara',49),(224,'Kaliningrad',79),(225,'Kalisz',76),(226,'Kamarhati',43),
(227,'Kamjanets-Podilskyi',98),(228,'Kamyin',79),(229,'Kananga',24),(230,'Kanchrapara',43),
(231,'Kansas City',101),(232,'Karachi',72),(233,'Karnal',43),(234,'Katihar',43),
(235,'Kermanshah',45),(236,'Kilis',95),(237,'Kimberley',84),(238,'Kimchon',84),
(239,'Kingstown',80),(240,'Kirovo-Tepetsk',79),(241,'Kisumu',51),(242,'Kitwe',107),
(243,'Klerksdorp',84),(244,'Kolpino',79),(245,'Konotop',98),(246,'Koriyama',49),
(247,'Korla',22),(248,'Kota',43),(249,'Kuching',58),(250,'Kumasi',36),
(251,'Kunming',22),(252,'Kurashiki',49),(253,'Kurgan',79),(254,'Kursk',79),
(255,'Kuwana',49),(256,'Kwekwe (Que Que)',108),(257,'Kyoto',49),(258,'La Paz',14),
(259,'La Plata',6),(260,'La Romana',26),(261,'Laiwu',22),(262,'Lancaster',101),
(263,'Laohekou',22),(264,'Lapu-Lapu',75),(265,'Laredo',101),(266,'Lausanne',89),
(267,'Leizhou',22),(268,'Leninsk-Kuznetski',79),(269,'Liaocheng',22),(270,'Liepaja',53),
(271,'Lilongwe',57),(272,'Lima',74),(273,'Linfen',22),(274,'Linz',9),
(275,'Lipetsk',79),(276,'Livorno',48),(277,'Ljubertsy',79),(278,'Lodz',76),
(279,'Loja',27),(280,'Lomas de Zamora',6);

INSERT INTO language VALUES
(1,'English'),(2,'Italian'),(3,'Japanese'),(4,'Mandarin'),
(5,'French'),(6,'German');

INSERT INTO category VALUES
(1,'Action'),(2,'Animation'),(3,'Children'),(4,'Classics'),
(5,'Comedy'),(6,'Documentary'),(7,'Drama'),(8,'Family'),
(9,'Foreign'),(10,'Games'),(11,'Horror'),(12,'Music'),
(13,'New'),(14,'Sci-Fi'),(15,'Sports'),(16,'Travel');

INSERT INTO actor VALUES
(1,'Penelope','Guiness'),(2,'Nick','Wahlberg'),(3,'Ed','Chase'),
(4,'Jennifer','Davis'),(5,'Johnny','Lollobrigida'),(6,'Bette','Nicholson'),
(7,'Grace','Mostel'),(8,'Matthew','Johansson'),(9,'Joe','Swank'),
(10,'Christian','Gable'),(11,'Zero','Cage'),(12,'Karl','Berry'),
(13,'Uma','Wood'),(14,'Vivien','Bergen'),(15,'Cuba','Olivier'),
(16,'Fred','Costner'),(17,'Helen','Voight'),(18,'Dan','Torn'),
(19,'Bob','Fawcett'),(20,'Lucille','Tracy'),(21,'Kirsten','Paltrow'),
(22,'Elvis','Marx'),(23,'Sandra','Kilmer'),(24,'Cameron','Streep'),
(25,'Kevin','Bloom'),(26,'Rip','Crawford'),(27,'Julia','Mcqueen'),
(28,'Woody','Hoffman'),(29,'Alec','Wayne'),(30,'Sandra','Peck'),
(31,'Sissy','Sobieski'),(32,'Tim','Hackman'),(33,'Milla','Peck'),
(34,'Audrey','Olivier'),(35,'Judy','Dean'),(36,'Burt','Dukakis'),
(37,'Val','Bolger'),(38,'Tom','Mckellen'),(39,'Goldie','Brody'),
(40,'Johnny','Cage'),(41,'Jodie','Degeneres'),(42,'Tom','Miranda'),
(43,'Kirk','Jovovich'),(44,'Nick','Stallone'),(45,'Reese','Kilmer'),
(46,'Parker','Goldberg'),(47,'Julia','Barrymore'),(48,'Frances','Day-Lewis'),
(49,'Anne','Cronyn'),(50,'Ewan','Gooding'),(51,'Gary','Phoenix'),
(52,'Carmen','Hunt'),(53,'Mena','Temple'),(54,'Penelope','Pinkett'),
(55,'Fay','Kilmer'),(56,'Dan','Harris'),(57,'Jude','Cruise'),
(58,'Christian','Akroyd'),(59,'Dustin','Tautou'),(60,'Henry','Berry'),
(61,'Christian','Neeson'),(62,'Jayne','Neeson'),(63,'Cameron','Wray'),
(64,'Ray','Johansson'),(65,'Angela','Hudson'),(66,'Mary','Tandy'),
(67,'Jessica','Bailey'),(68,'Rip','Winslet'),(69,'Kenneth','Paltrow'),
(70,'Michelle','Mcconaughey'),(71,'Adam','Grant'),(72,'Sean','Williams'),
(73,'Gary','Penn'),(74,'Milla','Keitel'),(75,'Burt','Posey'),
(76,'Angelina','Astaire'),(77,'Cary','McConaughey'),(78,'Groucho','Sinatra'),
(79,'Mae','Hoffman'),(80,'Ralph','Cruz'),(81,'Scarlett','Damon'),
(82,'Woody','Jolie'),(83,'Ben','Willis'),(84,'James','Pitt'),
(85,'Minnie','Zellweger'),(86,'Greg','Chaplin'),(87,'Spencer','Peck'),
(88,'Matthew','Carrey'),(89,'Emily','Dee'),(90,'Sean','Guiness'),
(91,'Christopher','Berry'),(92,'Kirsten','Akroyd'),(93,'Ellen','Presley'),
(94,'Kenneth','Torn'),(95,'Daryl','Wahlberg'),(96,'Gene','Willis'),
(97,'Bob','Tandy'),(98,'Chris','Berry'),(99,'Jim','Mostel'),
(100,'Angela','Egg'),(101,'Susan','Davis'),(102,'Walter','Torn'),
(103,'Matthew','Leigh'),(104,'Penelope','Cronyn'),(105,'Scarlett','Bening'),
(106,'Groucho','Dunst'),(107,'Gina','Degeneres'),(108,'Warren','Nolte'),
(109,'Sylvester','Dern'),(110,'Susan','Davis'),(111,'Cameron','Zellweger'),
(112,'Russell','Close'),(113,'Morgan','Mcdormand'),(114,'Morgan','Mcdormand'),
(115,'Harrison','Bale'),(116,'Dan','Streep'),(117,'Renee','Tracy'),
(118,'Cuba','Allen'),(119,'Warren','Jackman'),(120,'Penelope','Monroe'),
(121,'Liza','Bergman'),(122,'Thora','Temple'),(123,'Julianne','Dench'),
(124,'Scarlett','Bening'),(125,'Albert','Nolte'),(126,'Frances','Tomei'),
(127,'Kevin','Garland'),(128,'Cate','Mcqueen'),(129,'Daryl','Crawford'),
(130,'Greta','Keitel'),(131,'Jane','Jackman'),(132,'Adam','Hopper'),
(133,'Richard','Penn'),(134,'Gene','Hopkins'),(135,'Rita','Reynolds'),
(136,'Ed','Mansfield'),(137,'Morgan','Williams'),(138,'Lucille','Dee'),
(139,'Ewan','Gooding'),(140,'Whoopi','Hurt'),(141,'Cate','Harris'),
(142,'Jada','Ryder'),(143,'River','Dean'),(144,'Angela','Witherspoon'),
(145,'Kim','Allen'),(146,'Albert','Johansson'),(147,'Fay','Winslet'),
(148,'Emily','Blunt'),(149,'Russell','Temple'),(150,'Debbie','Akroyd'),
(151,'Geoffrey','Heston'),(152,'Ben','Harris'),(153,'Minnie','Kilmer'),
(154,'Meryl','Gibson'),(155,'Ian','Tandy'),(156,'Fay','Wood'),
(157,'Greta','Malden'),(158,'Vivien','Silverstone'),(159,'Laura','Sullivan'),
(160,'Chris','Depp'),(161,'Harvey','Hope'),(162,'Oprah','Kilmer'),
(163,'Christopher','West'),(164,'Humphrey','Willis'),(165,'Jayne','Nolte'),
(166,'Nick','Degeneres'),(167,'Laurence','Bullock'),(168,'Will','Wilson'),
(169,'Kenneth','Hoffman'),(170,'Mena','Hopper'),(171,'Olympia','Pfeiffer'),
(172,'Groucho','Williams'),(173,'Alan','Dreyfuss'),(174,'Dona','Speiser'),
(175,'William','Hackman'),(176,'Jon','Chase'),(177,'Gene','Mckellen'),
(178,'Lisa','Monroe'),(179,'Ed','Guiness'),(180,'Jeff','Silverstone'),
(181,'Matthew','Carrey'),(182,'Debbie','Waller'),(183,'Russell','Bacall'),
(184,'Humphrey','Garland'),(185,'Michael','Bolger'),(186,'Julia','Zellweger'),
(187,'Renee','Ball'),(188,'Rock','Dukakis'),(189,'Cuba','Birch'),
(190,'Audrey','Bailey'),(191,'Gregory','Gooding'),(192,'John','Suvari'),
(193,'Burt','Temple'),(194,'Meryl','Allen'),(195,'Jayne','Silverstone'),
(196,'Bela','Walken'),(197,'Reese','West'),(198,'Mary','Keitel'),
(199,'Julia','Fawcett'),(200,'Thora','Temple');

INSERT INTO address VALUES
(1,'47 MySakila Drive',NULL,1,'',''),
(2,'28 MySQL Boulevard',NULL,1,'',''),
(3,'23 Workhaven Lane',NULL,1,'',''),
(4,'1411 Lillydale Drive',NULL,1,'',''),
(5,'1913 Hanoi Way','Nagasaki',87,'35200','28303384290'),
(6,'1121 Loja Avenue','California',449,'17886','838635286'),
(7,'692 Joliet Street','Attika',38,'83579','448477190'),
(8,'1566 Inegl Manor','Mandalay',45,'53561','705814003'),
(9,'53 Idfu Parkway','Nantou',68,'42399','10655648674'),
(10,'1795 Santiago de Compostela Way','Texas',101,'18743','860452626');

INSERT INTO staff VALUES
(1,'Mike','Hillyer',3,'Mike.Hillyer@sakilastaff.com',1,1,'Mike',NULL),
(2,'Jon','Stephens',4,'Jon.Stephens@sakilastaff.com',2,1,'Jon',NULL);

INSERT INTO store VALUES
(1,1,1),(2,2,2);

INSERT INTO customer VALUES
(1,1,'Mary','Smith','mary.smith@sakilacustomer.org',5,1),
(2,1,'Patricia','Johnson','patricia.johnson@sakilacustomer.org',6,1),
(3,1,'Linda','Williams','linda.williams@sakilacustomer.org',7,1),
(4,2,'Barbara','Jones','barbara.jones@sakilacustomer.org',8,1),
(5,1,'Elizabeth','Brown','elizabeth.brown@sakilacustomer.org',9,1),
(6,2,'Jennifer','Davis','jennifer.davis@sakilacustomer.org',10,1),
(7,1,'Maria','Miller','maria.miller@sakilacustomer.org',10,1),
(8,2,'Susan','Wilson','susan.wilson@sakilacustomer.org',10,1),
(9,2,'Margaret','Moore','margaret.moore@sakilacustomer.org',10,1),
(10,1,'Dorothy','Taylor','dorothy.taylor@sakilacustomer.org',10,1),
(11,2,'Lisa','Anderson','lisa.anderson@sakilacustomer.org',10,1),
(12,1,'Nancy','Thomas','nancy.thomas@sakilacustomer.org',10,1),
(13,2,'Karen','Jackson','karen.jackson@sakilacustomer.org',10,1),
(14,1,'Betty','White','betty.white@sakilacustomer.org',10,1),
(15,2,'Helen','Harris','helen.harris@sakilacustomer.org',10,1),
(16,2,'Sandra','Martin','sandra.martin@sakilacustomer.org',10,1),
(17,1,'Donna','Thompson','donna.thompson@sakilacustomer.org',10,1),
(18,1,'Carol','Garcia','carol.garcia@sakilacustomer.org',10,1),
(19,2,'Ruth','Martinez','ruth.martinez@sakilacustomer.org',10,1),
(20,1,'Sharon','Robinson','sharon.robinson@sakilacustomer.org',10,1);

INSERT INTO film VALUES
(1,'Academy Dinosaur','A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies',2006,1,6,0.99,86,20.99,'PG'),
(2,'Ace Goldfinger','A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China',2006,1,3,4.99,48,12.99,'G'),
(3,'Adaptation Holes','A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory',2006,1,7,2.99,50,18.99,'NC-17'),
(4,'Affair Prejudice','A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank',2006,1,5,2.99,117,26.99,'G'),
(5,'African Egg','A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico',2006,1,6,2.99,130,22.99,'G'),
(6,'Agent Truman','A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China',2006,1,3,2.99,169,17.99,'PG'),
(7,'Airplane Sierra','A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat',2006,1,6,4.99,62,28.99,'PG-13'),
(8,'Airport Pollock','A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India',2006,1,6,4.99,54,15.99,'R'),
(9,'Alabama Devil','A Thoughtful Panorama of a Database Administrator And a Mad Scientist who must Outgun a Mad Scientist in A Jet Boat',2006,1,3,2.99,114,21.99,'PG-13'),
(10,'Aladdin Calendar','A Action-Packed Tale of a Man And a Lumberjack who must Reach a Feminist in Ancient China',2006,1,6,4.99,63,24.99,'NC-17'),
(11,'Alamo Videotape','A Boring Epistle of a Butler And a Cat who must Fight a Pastry Chef in A MySQL Convention',2006,1,6,0.99,126,16.99,'G'),
(12,'Alaska Phantom','A Fanciful Saga of a Hunter And a Pastry Chef who must Vanquish a Boy in Australia',2006,1,6,0.99,136,22.99,'PG'),
(13,'Ali Forever','A Action-Packed Drama of a Dentist And a Crocodile who must Battle a Feminist in The Canadian Rockies',2006,1,4,4.99,150,21.99,'PG'),
(14,'Alice Fantasia','A Emotional Drama of a A Shark And a Database Administrator who must Vanquish a Pioneer in Soviet Georgia',2006,1,6,0.99,94,23.99,'NC-17'),
(15,'Alien Center','A Brilliant Drama of a Cat And a Mad Scientist who must Battle a Feminist in A MySQL Convention',2006,1,5,2.99,46,10.99,'NC-17'),
(16,'Alley Evolution','A Fast-Paced Drama of a Robot And a Composer who must Battle a Astronaut in New Orleans',2006,1,6,2.99,180,23.99,'NC-17'),
(17,'Alone Trip','A Fast-Paced Character Study of a Composer And a Dog who must Outgun a Boat in An Abandoned Fun House',2006,1,3,0.99,82,14.99,'R'),
(18,'Alter Victory','A Thoughtful Drama of a Composer And a Feminist who must Meet a Secret Agent in The Canadian Rockies',2006,1,6,0.99,57,27.99,'PG-13'),
(19,'Amadeus Holy','A Emotional Display of a Pioneer And a Technical Writer who must Battle a Man in A Baloon',2006,1,6,0.99,113,20.99,'PG'),
(20,'Amelie Hellfighters','A Boring Drama of a Woman And a Squirrel who must Conquer a Dog in A Monastery',2006,1,4,4.99,79,28.99,'R'),
(21,'American Circus','A Insightful Drama of a Girl And a Astronaut who must Face a Database Administrator in A Shark Tank',2006,1,3,4.99,129,17.99,'R'),
(22,'Amistad Midsummer','A Emotional Character Study of a Dentist And a Crocodile who must Meet a Sumo Wrestler in California',2006,1,6,2.99,85,10.99,'G'),
(23,'Anaconda Confessions','A Lacklustre Display of a Dentist And a Dentist who must Fight a Girl in Australia',2006,1,3,0.99,92,9.99,'R'),
(24,'Analyze Hobo','A Thoughtful Display of a Explorer And a Pastry Chef who must Redeem a Film in A U-Boat',2006,1,6,2.99,181,19.99,'R'),
(25,'Angels Life','A Thoughtful Display of a Woman And a Astronaut who must Battle a Robot in Berlin',2006,1,7,2.99,74,15.99,'G'),
(26,'Annie Identity','A Amazing Panorama of a Pastry Chef And a Boat who must Escape a Woman in An Abandoned Amusement Park',2006,1,3,0.99,86,19.99,'G'),
(27,'Antitrust Tomatoes','A Fateful Yarn of a Womanizer And a Feminist who must Overcome a Dog in A Monastery',2006,1,5,2.99,168,11.99,'NC-17'),
(28,'Apocalypse Flamingos','A Astounding Story of a Dog And a Squirrel who must Redeem a Woman in New Orleans',2006,1,6,2.99,119,11.99,'R'),
(29,'Apollo Teen','A Action-Packed Reflection of a Sumo Wrestler And a Feminist who must Battle a Frisbee in A MySQL Convention',2006,1,4,2.99,153,9.99,'PG-13'),
(30,'Apt Pupil','A Thoughtful Panorama of a Teacher And a Feminist who must Escape a Sumo Wrestler in The Gulf of Mexico',2006,1,3,3.99,186,18.99,'NC-17'),
(31,'Archie Behavior','A Amazing Drama of a Dentist And a Frisbee who must Find a Dog in A Shark Tank',2006,1,4,0.99,176,56.99,'NC-17'),
(32,'Arachnophobia','A Action-Packed Drama of a Mad Scientist And a Dog who must Escape a Frisbee in A Jet Boat',2006,1,6,4.99,71,30.99,'R'),
(33,'Armageddon Lost','A Fast-Paced Tale of a Husband And a Feminist who must Build a Womanizer in The Gulf of Mexico',2006,1,5,0.99,99,10.99,'G'),
(34,'Arizona Bang','A Brilliant Panorama of a Mad Scientist And a Mad Scientist who must Battle a Feminist in Berlin',2006,1,3,2.99,121,28.99,'PG'),
(35,'Army Flintstones','A Action-Packed Reflection of a Crocodile And a Waitress who must Battle a Squirrel in An Abandoned Mine Shaft',2006,1,7,4.99,104,28.99,'R'),
(36,'Arsenic Independence','A Touching Panorama of a Mad Scientist And a Dog who must Defeat a Dentist in Ancient China',2006,1,4,0.99,137,35.99,'PG'),
(37,'Artist Coldblooded','A Surprising Reflection of a Robot And a Squirrel who must Vanquish a Sumo Wrestler in A MySQL Convention',2006,1,3,1.99,170,10.99,'NC-17'),
(38,'Atlantis Cause','A Thrilling Yarn of a Feminist And a Hunter who must Redeem a Pioneer in A U-Boat',2006,1,6,2.99,170,15.99,'G'),
(39,'Attacks Hate','A Fast-Paced Panorama of a Technical Writer And a Moose who must Pursue a Dentist in An Abandoned Amusement Park',2006,1,5,0.99,113,12.99,'PG-13'),
(40,'Attraction Newton','A Astounding Story of a Feminist And a Student who must Conquer a Womanizer in Siberia',2006,1,5,5.99,83,28.99,'PG-13'),
(41,'Autumn Crow','A Beautiful Drama of a Womanizer And a Robot who must Fight a Dog in A MySQL Convention',2006,1,5,2.99,108,9.99,'G'),
(42,'Baby Hall','A Touching Panorama of a Boy And a Frisbee who must Reach a Frisbee in An Abandoned Mine Shaft',2006,1,6,2.99,153,19.99,'NC-17'),
(43,'Back Armageddon','A Boring Saga of a Woman And a Squirrel who must Succumb a Husband in A Jet Boat',2006,1,5,2.99,118,24.99,'G'),
(44,'Bad Boy','A Astounding Epistle of a Technical Writer And a Waitress who must Find a Woman in A Shark Tank',2006,1,3,4.99,106,10.99,'NC-17'),
(45,'Bad Luck','A Gorgeous Epistle of a Car And a Technical Writer who must Find a Feminist in A MySQL Convention',2006,1,3,2.99,149,19.99,'NC-17'),
(46,'Badman Dawn','A Thoughtful Yarn of a Feminist And a Monkey who must Battle a Robot in A U-Boat',2006,1,6,2.99,162,49.99,'PG'),
(47,'Balloon Homeward','A Stunning Reflection of a Feminist And a Sumo Wrestler who must Outgun a Dog in The Gulf of Mexico',2006,1,5,2.99,75,32.99,'G'),
(48,'Bamboozled','A Touching Panorama of a Sumo Wrestler And a Crocodile who must Pursue a Dog in New Orleans',2006,1,6,2.99,68,31.99,'PG-13'),
(49,'Bang Kwai','A Epic Drama of a Madman And a Car who must Face a Boy in A Monastery',2006,1,6,2.99,87,24.99,'NC-17'),
(50,'Bare Instinct','A Stunning Reflection of a Pastry Chef And a Robot who must Escape a Husband in A Monastery',2006,1,4,4.99,182,16.99,'PG-13');

INSERT INTO film VALUES
(51,'Barbarella Ajax','A Thoughtful Panorama of a Technical Writer And a Boy who must Overcome a Robot in A Baloon',2006,1,3,2.99,81,17.99,'NC-17'),
(52,'Barcelona Lovers','A Sensational Reflection of a Student And a Frisbee who must Conquer a Frisbee in An Abandoned Amusement Park',2006,1,6,0.99,105,12.99,'NC-17'),
(53,'Barge Laden','A Thoughtful Yarn of a Crocodile And a Database Administrator who must Battle a Waitress in A Monastery',2006,1,4,2.99,73,15.99,'PG-13'),
(54,'Barrymore Crazy','A Amazing Panorama of a Teacher And a Dog who must Pursue a Database Administrator in A Shark Tank',2006,1,7,4.99,128,26.99,'PG'),
(55,'Basic Duluth','A Awe-Inspiring Panorama of a Feminist And a Car who must Discover a Robot in Soviet Georgia',2006,1,6,0.99,99,19.99,'PG-13'),
(56,'Batman Forever','A Amazing Reflection of a Boat And a Database Administrator who must Confront a Dog in A MySQL Convention',2006,1,7,4.99,102,19.99,'NC-17'),
(57,'Beads Birds','A Fast-Paced Panorama of a Astronaut And a Squirrel who must Discover a Pioneer in The Sahara Desert',2006,1,4,4.99,98,29.99,'NC-17'),
(58,'Beauty Grease','A Fateful Reflection of a Boy And a Frisbee who must Escape a Girl in Ancient Japan',2006,1,5,2.99,120,39.99,'G'),
(59,'Bed Highball','A Awe-Inspiring Epistle of a Feminist And a Robot who must Face a Dog in An Abandoned Amusement Park',2006,1,7,3.99,99,30.99,'NC-17'),
(60,'Bedazzled Married','A Astounding Panorama of a Composer And a Cat who must Find a Car in A U-Boat',2006,1,4,2.99,73,59.99,'PG');

INSERT INTO film_actor VALUES
(1,1),(1,23),(1,25),(1,106),(1,140),(1,166),(2,3),(2,31),(2,65),(2,90),
(3,21),(3,37),(3,91),(4,6),(4,40),(4,54),(4,75),(4,115),(4,116),
(5,46),(5,48),(5,100),(5,137),(6,28),(6,40),(6,77),(6,135),(6,152),
(7,9),(7,52),(7,64),(7,76),(7,125),(8,82),(8,141),(8,152),(8,153),
(9,17),(9,26),(9,46),(9,55),(9,95),(10,62),(10,73),(10,115),(10,141),
(11,71),(11,140),(11,141),(11,152),(11,167),(12,7),(12,9),(12,32),(12,167),
(13,3),(13,26),(13,71),(13,88),(13,138),(14,26),(14,29),(14,59),(14,89),(14,107),
(15,27),(15,97),(15,120),(15,162),(15,194),(16,2),(16,58),(16,95),(16,106),(16,140),
(17,13),(17,53),(17,80),(17,134),(17,140),(18,96),(18,120),(18,146),(18,157),(18,196),
(19,3),(19,41),(19,102),(19,129),(19,168),(20,8),(20,44),(20,94),(20,112),(20,181),
(21,18),(21,55),(21,68),(21,152),(21,195),(22,5),(22,38),(22,53),(22,89),(22,171),
(23,10),(23,27),(23,102),(23,134),(23,148),(24,1),(24,37),(24,133),(24,150),(24,167),
(25,70),(25,77),(25,90),(25,107),(25,147),(26,22),(26,55),(26,106),(26,143),(26,193),
(27,19),(27,52),(27,80),(27,124),(27,155),(28,28),(28,30),(28,82),(28,120),(28,170),
(29,6),(29,51),(29,85),(29,107),(29,163),(30,55),(30,87),(30,149),(30,175),(30,198);

INSERT INTO film_category VALUES
(1,6),(2,11),(3,6),(4,11),(5,8),(6,9),(7,5),(8,11),(9,11),(10,15),
(11,6),(12,9),(13,15),(14,7),(15,9),(16,2),(17,5),(18,3),(19,3),(20,9),
(21,5),(22,15),(23,11),(24,5),(25,2),(26,6),(27,15),(28,4),(29,7),(30,2),
(31,4),(32,11),(33,11),(34,9),(35,4),(36,6),(37,3),(38,8),(39,11),(40,9),
(41,5),(42,3),(43,4),(44,4),(45,9),(46,5),(47,9),(48,4),(49,2),(50,14),
(51,10),(52,7),(53,6),(54,7),(55,5),(56,11),(57,8),(58,9),(59,14),(60,5);

INSERT INTO inventory VALUES
(1,1,1),(2,1,1),(3,1,2),(4,1,2),(5,2,1),(6,2,1),(7,2,2),(8,2,2),
(9,3,1),(10,3,1),(11,3,2),(12,3,2),(13,4,1),(14,4,1),(15,4,2),(16,4,2),
(17,5,1),(18,5,1),(19,5,2),(20,5,2),(21,6,1),(22,6,1),(23,6,2),(24,6,2),
(25,7,1),(26,7,1),(27,7,2),(28,7,2),(29,8,1),(30,8,1),(31,8,2),(32,8,2),
(33,9,1),(34,9,1),(35,9,2),(36,9,2),(37,10,1),(38,10,1),(39,10,2),(40,10,2),
(41,11,1),(42,11,1),(43,12,1),(44,12,1),(45,13,1),(46,13,1),(47,14,1),(48,14,1),
(49,15,1),(50,15,1),(51,16,1),(52,16,1),(53,17,1),(54,17,1),(55,18,1),(56,18,1),
(57,19,1),(58,19,1),(59,20,1),(60,20,1);

INSERT INTO rental VALUES
(1,'2005-05-24 22:53:30',367,130,'2005-05-26 22:04:30',1),
(2,'2005-05-24 22:54:33',1525,459,'2005-05-28 19:40:33',1),
(3,'2005-05-24 23:03:39',1711,408,'2005-06-01 22:12:39',1),
(4,'2005-05-24 23:04:41',2452,333,'2005-06-03 01:43:41',2),
(5,'2005-05-24 23:05:21',2079,222,'2005-06-02 04:33:21',1),
(6,'2005-05-24 23:08:07',2792,549,'2005-05-27 01:32:07',1),
(7,'2005-05-24 23:11:53',3995,269,'2005-05-29 20:34:53',2),
(8,'2005-05-24 23:31:46',2346,239,'2005-05-27 23:33:46',2),
(9,'2005-05-25 00:00:40',2580,126,'2005-05-28 00:22:40',1),
(10,'2005-05-25 00:02:21',1824,399,'2005-05-31 22:44:21',2),
(11,'2005-05-25 00:09:21',4443,142,'2005-06-02 20:56:21',2),
(12,'2005-05-25 00:12:59',2021,295,'2005-05-28 07:08:59',1),
(13,'2005-05-25 00:19:27',1330,479,'2005-05-29 01:21:27',2),
(14,'2005-05-25 00:22:55',2732,430,'2005-05-27 07:56:55',1),
(15,'2005-05-25 00:31:15',1044,581,'2005-05-30 05:14:15',1),
(16,'2005-05-25 00:39:22',1490,3,'2005-05-29 16:12:22',2),
(17,'2005-05-25 00:43:11',1987,228,'2005-05-27 03:01:11',1),
(18,'2005-05-25 01:06:36',2817,319,'2005-05-28 00:43:36',1),
(19,'2005-05-25 01:10:47',3386,503,'2005-05-29 01:53:47',2),
(20,'2005-05-25 01:17:24',2168,208,'2005-05-28 03:37:24',1);

INSERT INTO payment VALUES
(1,1,1,76,2.99,'2005-05-25 11:30:37'),
(2,1,1,573,0.99,'2005-05-28 10:35:23'),
(3,1,1,1185,5.99,'2005-06-15 00:54:12'),
(4,1,2,1422,0.99,'2005-06-15 18:02:53'),
(5,1,2,1476,9.99,'2005-06-15 21:08:46'),
(6,1,1,1725,4.99,'2005-06-16 15:18:57'),
(7,1,1,2308,4.99,'2005-06-18 08:41:48'),
(8,1,2,2363,0.99,'2005-06-18 13:33:59'),
(9,1,1,3284,3.99,'2005-06-21 06:24:45'),
(10,2,2,3,2.99,'2005-05-25 11:30:37'),
(11,2,2,36,2.99,'2005-05-25 11:30:37'),
(12,3,1,48,4.99,'2005-05-26 11:30:37'),
(13,4,2,12,9.99,'2005-05-25 14:15:37'),
(14,5,1,14,5.99,'2005-05-25 16:45:37'),
(15,6,1,17,2.99,'2005-05-25 19:30:37'),
(16,7,2,3,4.99,'2005-05-25 21:00:37'),
(17,8,1,5,1.99,'2005-05-26 08:15:37'),
(18,9,2,6,2.99,'2005-05-26 10:00:37'),
(19,10,1,7,3.99,'2005-05-26 12:30:37'),
(20,11,2,8,0.99,'2005-05-26 14:00:37'),
(21,12,1,9,5.99,'2005-05-26 16:30:37'),
(22,13,2,10,2.99,'2005-05-26 18:00:37'),
(23,14,1,11,4.99,'2005-05-26 20:15:37'),
(24,15,2,13,3.99,'2005-05-27 09:30:37'),
(25,16,1,14,1.99,'2005-05-27 11:00:37'),
(26,17,2,15,2.99,'2005-05-27 13:45:37'),
(27,18,1,16,4.99,'2005-05-27 15:30:37'),
(28,19,2,17,0.99,'2005-05-27 17:00:37'),
(29,20,1,18,3.99,'2005-05-27 19:15:37'),
(30,1,2,19,5.99,'2005-05-27 21:30:37');
`;

// Schema definition for the Schema tab
window.SCHEMA_INFO = [
  {
    name: 'actor', rows: '200',
    fields: [
      { name: 'actor_id', type: 'INTEGER', pk: true },
      { name: 'first_name', type: 'TEXT' },
      { name: 'last_name', type: 'TEXT' },
    ]
  },
  {
    name: 'film', rows: '60',
    fields: [
      { name: 'film_id', type: 'INTEGER', pk: true },
      { name: 'title', type: 'TEXT' },
      { name: 'description', type: 'TEXT' },
      { name: 'release_year', type: 'INTEGER' },
      { name: 'language_id', type: 'INTEGER', fk: 'language' },
      { name: 'rental_duration', type: 'INTEGER' },
      { name: 'rental_rate', type: 'REAL' },
      { name: 'length', type: 'INTEGER' },
      { name: 'replacement_cost', type: 'REAL' },
      { name: 'rating', type: 'TEXT' },
    ]
  },
  {
    name: 'film_actor', rows: '—',
    fields: [
      { name: 'actor_id', type: 'INTEGER', fk: 'actor' },
      { name: 'film_id', type: 'INTEGER', fk: 'film' },
    ]
  },
  {
    name: 'film_category', rows: '—',
    fields: [
      { name: 'film_id', type: 'INTEGER', fk: 'film' },
      { name: 'category_id', type: 'INTEGER', fk: 'category' },
    ]
  },
  {
    name: 'category', rows: '16',
    fields: [
      { name: 'category_id', type: 'INTEGER', pk: true },
      { name: 'name', type: 'TEXT' },
    ]
  },
  {
    name: 'language', rows: '6',
    fields: [
      { name: 'language_id', type: 'INTEGER', pk: true },
      { name: 'name', type: 'TEXT' },
    ]
  },
  {
    name: 'customer', rows: '20',
    fields: [
      { name: 'customer_id', type: 'INTEGER', pk: true },
      { name: 'store_id', type: 'INTEGER' },
      { name: 'first_name', type: 'TEXT' },
      { name: 'last_name', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'address_id', type: 'INTEGER', fk: 'address' },
      { name: 'active', type: 'INTEGER' },
    ]
  },
  {
    name: 'rental', rows: '20',
    fields: [
      { name: 'rental_id', type: 'INTEGER', pk: true },
      { name: 'rental_date', type: 'TEXT' },
      { name: 'inventory_id', type: 'INTEGER', fk: 'inventory' },
      { name: 'customer_id', type: 'INTEGER', fk: 'customer' },
      { name: 'return_date', type: 'TEXT' },
      { name: 'staff_id', type: 'INTEGER', fk: 'staff' },
    ]
  },
  {
    name: 'payment', rows: '30',
    fields: [
      { name: 'payment_id', type: 'INTEGER', pk: true },
      { name: 'customer_id', type: 'INTEGER', fk: 'customer' },
      { name: 'staff_id', type: 'INTEGER', fk: 'staff' },
      { name: 'rental_id', type: 'INTEGER', fk: 'rental' },
      { name: 'amount', type: 'REAL' },
      { name: 'payment_date', type: 'TEXT' },
    ]
  },
  {
    name: 'inventory', rows: '60',
    fields: [
      { name: 'inventory_id', type: 'INTEGER', pk: true },
      { name: 'film_id', type: 'INTEGER', fk: 'film' },
      { name: 'store_id', type: 'INTEGER' },
    ]
  },
  {
    name: 'staff', rows: '2',
    fields: [
      { name: 'staff_id', type: 'INTEGER', pk: true },
      { name: 'first_name', type: 'TEXT' },
      { name: 'last_name', type: 'TEXT' },
      { name: 'address_id', type: 'INTEGER', fk: 'address' },
      { name: 'email', type: 'TEXT' },
      { name: 'store_id', type: 'INTEGER' },
      { name: 'username', type: 'TEXT' },
    ]
  },
  {
    name: 'store', rows: '2',
    fields: [
      { name: 'store_id', type: 'INTEGER', pk: true },
      { name: 'manager_staff_id', type: 'INTEGER', fk: 'staff' },
      { name: 'address_id', type: 'INTEGER', fk: 'address' },
    ]
  },
  {
    name: 'address', rows: '10',
    fields: [
      { name: 'address_id', type: 'INTEGER', pk: true },
      { name: 'address', type: 'TEXT' },
      { name: 'district', type: 'TEXT' },
      { name: 'city_id', type: 'INTEGER', fk: 'city' },
      { name: 'postal_code', type: 'TEXT' },
      { name: 'phone', type: 'TEXT' },
    ]
  },
  {
    name: 'city', rows: '280',
    fields: [
      { name: 'city_id', type: 'INTEGER', pk: true },
      { name: 'city', type: 'TEXT' },
      { name: 'country_id', type: 'INTEGER', fk: 'country' },
    ]
  },
  {
    name: 'country', rows: '108',
    fields: [
      { name: 'country_id', type: 'INTEGER', pk: true },
      { name: 'country', type: 'TEXT' },
    ]
  },
];
