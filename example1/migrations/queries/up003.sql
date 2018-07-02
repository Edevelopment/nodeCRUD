CREATE TABLE IF NOT EXISTS `ru_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` int(11) DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `active` int(1) DEFAULT '1',
  `type` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` TEXT DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `finish_date` int(11) DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;