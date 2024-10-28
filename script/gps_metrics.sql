SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `gps_metrics` (
  `id` varchar(36) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `metrics` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`metrics`)),
  `gps_point` point NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
DELIMITER $$
CREATE TRIGGER `gps_metrics_insert_autogen_uuid` BEFORE INSERT ON `gps_metrics` FOR EACH ROW SET new.id = UUID()
$$
DELIMITER ;


ALTER TABLE `gps_metrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gps_gps_metrics` (`serial`) USING BTREE;


ALTER TABLE `gps_metrics`
  ADD CONSTRAINT `fk_gps_metrics_gps` FOREIGN KEY (`serial`) REFERENCES `gps` (`serial`);
COMMIT;

