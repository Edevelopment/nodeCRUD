CREATE TABLE IF NOT EXISTS `ru_notitfications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` int(11) DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `active` int(1) DEFAULT '1',
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `text` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;