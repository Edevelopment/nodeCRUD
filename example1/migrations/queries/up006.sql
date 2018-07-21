CREATE TABLE IF NOT EXISTS `ru_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` int(11) DEFAULT NULL,
  `updated` int(11) DEFAULT NULL,
  `active` int(1) DEFAULT '1',
  `notification_id` INT(11) DEFAULT NULL,
  `user_id` INT(11) DEFAULT NULL,
  `text` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `ru_users`	CHANGE COLUMN `roles` `roles` ENUM('admin','user') NULL DEFAULT NULL AFTER `password`;