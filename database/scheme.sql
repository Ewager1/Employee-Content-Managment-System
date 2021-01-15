CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dep_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dep_name_UNIQUE` (`dep_name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `employee` (
  `empl_id` int NOT NULL AUTO_INCREMENT,
  `empl_first_name` varchar(30) NOT NULL,
  `empl_last_name` varchar(30) NOT NULL,
  `role_id` int NOT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`empl_id`),
  KEY `employee_ibfk_1` (`role_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `employee_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `employee_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_title` varchar(30) NOT NULL,
  `role_salary` decimal(10,2) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_title_UNIQUE` (`role_title`),
  KEY `employee_role_ibfk_1` (`department_id`),
  CONSTRAINT `employee_role_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

