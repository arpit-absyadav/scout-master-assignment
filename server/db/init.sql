DROP DATABASE IF EXISTS `scoutmaster`;
CREATE DATABASE IF NOT EXISTS `scoutmaster`;

USE `scoutmaster`;
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '0 = Incomplete, 1 = Active, 2 = Inactive',
  `deleted` INT(11) NOT NULL DEFAULT 0 COMMENT '0 = False, >=1 = True',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP DATABASE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `avg_delivery_time` INT NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '0 = Incomplete, 1 = Active, 2 = Inactive',
  `deleted` INT(11) NOT NULL DEFAULT 0 COMMENT '0 = False, >=1 = True',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP DATABASE IF EXISTS `packages`;
CREATE TABLE IF NOT EXISTS `packages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_number` INT NOT NULL,
  `delivery_company_id` INT NOT NULL,
  `awb` VARCHAR(255) NOT NULL COMMENT 'Unique airwaybill',
  `weight` INT NOT NULL COMMENT 'In grams',
  `value` DECIMAL(10,4) NOT NULL COMMENT 'Value of package',
  `rejected` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 = False, 1 = True',
  `shipment_lost` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 = False, 1 = True',
  `returned_other_reason` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 = false, 1 = True',
  `dispatched_at` DATETIME DEFAULT NULL,
  `delivered_at` DATETIME  DEFAULT NULL ,
  `return_recieved_at` DATETIME DEFAULT NULL,
  `created_by` INT NOT NULL,
  `return_processed_by` INT DEFAULT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '0 = Incomplete, 1 = Active, 2 = Inactive',
  `deleted` INT(11) NOT NULL DEFAULT 0 COMMENT '0 = False, >=1 = True',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY (`created_by`),
  UNIQUE KEY `packages_uk` (`awb`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO scoutmaster.users (name) values ("arpit");
INSERT INTO scoutmaster.users (name) values ("yadav");

INSERT INTO scoutmaster.companies (name, avg_delivery_time) values ("BlueDart", 5);
INSERT INTO scoutmaster.companies (name, avg_delivery_time) values ("FexEx", 6);
INSERT INTO scoutmaster.companies (name, avg_delivery_time) values ("DHL",5);
INSERT INTO scoutmaster.companies (name, avg_delivery_time) values ("Shree Maruti",4);
INSERT INTO scoutmaster.companies (name, avg_delivery_time) values ("DTDC",6);
INSERT INTO scoutmaster.companies (name, avg_delivery_time) values ("India Post",4);

-- scoutmaster

DELIMITER $$
USE scoutmaster$$
DROP TRIGGER IF EXISTS packages_on_delete_trigger $$
CREATE
    TRIGGER packages_on_delete_trigger BEFORE UPDATE ON packages
    FOR EACH ROW BEGIN
	IF (NEW.deleted_at IS NULL) THEN SET NEW.deleted = 0; ELSE SET NEW.deleted = OLD.id; END IF;
    END;
$$
DELIMITER ;


DELIMITER $$
USE scoutmaster$$
DROP TRIGGER IF EXISTS users_on_delete_trigger $$
CREATE
    TRIGGER users_on_delete_trigger BEFORE UPDATE ON users
    FOR EACH ROW BEGIN
	IF (NEW.deleted_at IS NULL) THEN SET NEW.deleted = 0; ELSE SET NEW.deleted = OLD.id; END IF;
    END;
$$
DELIMITER ;


DELIMITER $$
USE scoutmaster$$
DROP TRIGGER IF EXISTS companies_on_delete_trigger $$
CREATE
    TRIGGER companies_on_delete_trigger BEFORE UPDATE ON companies
    FOR EACH ROW BEGIN
	IF (NEW.deleted_at IS NULL) THEN SET NEW.deleted = 0; ELSE SET NEW.deleted = OLD.id; END IF;
    END;
$$
DELIMITER ;
