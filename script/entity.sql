SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `entity` (
  `id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DELIMITER $$
CREATE TRIGGER `entity_insert_autogen_uuid` BEFORE INSERT ON `entity` FOR EACH ROW SET new.id = UUID()
$$
DELIMITER ;


ALTER TABLE `entity`
  ADD PRIMARY KEY (`id`);
COMMIT;
