SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `geofence` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dimensions` polygon NOT NULL,
  `entity_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DELIMITER $$
CREATE TRIGGER `geofence_auto_generate_id` BEFORE INSERT ON `geofence` FOR EACH ROW SET new.id = UUID()
$$
DELIMITER ;


ALTER TABLE `geofence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_entity_geofence` (`entity_id`);


ALTER TABLE `geofence`
  ADD CONSTRAINT `fk_entity_geofence` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`);
COMMIT;
