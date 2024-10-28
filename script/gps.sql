SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `gps` (
  `id` varchar(36) NOT NULL,
  `entity_id` varchar(255) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DELIMITER $$
CREATE TRIGGER `gps_insert_autogen_uuid` BEFORE INSERT ON `gps` FOR EACH ROW SET new.id = UUID()
$$
DELIMITER ;


ALTER TABLE `gps`
  ADD PRIMARY KEY (`serial`) USING BTREE,
  ADD KEY `fk_entity_gps` (`entity_id`) USING BTREE;


ALTER TABLE `gps`
  ADD CONSTRAINT `gps_ibfk_1` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`);
COMMIT;

