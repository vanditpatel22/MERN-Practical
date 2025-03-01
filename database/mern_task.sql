-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2025 at 11:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mern_task`
--
CREATE DATABASE IF NOT EXISTS `mern_task` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mern_task`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` text NOT NULL,
  `email_verify` enum('Pending','Verified') NOT NULL DEFAULT 'Pending',
  `verify_time` datetime DEFAULT NULL,
  `login_status` enum('Online','Offline') NOT NULL DEFAULT 'Offline',
  `last_login` datetime DEFAULT NULL,
  `role` enum('Customer','Admin') NOT NULL DEFAULT 'Customer',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `first_name`, `last_name`, `email`, `password`, `email_verify`, `verify_time`, `login_status`, `last_login`, `role`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(6, 'Vandit', 'Patel', 'vanditpatel887@gmail.com', 'iymCJHlOIQeI3xsV854oZg==', 'Verified', '2025-03-01 15:45:18', 'Online', '2025-03-01 15:37:19', 'Admin', 1, 0, '2025-03-01 10:05:59', '2025-03-01 10:15:18'),
(7, 'Vandit', 'Patel', 'vanditpatel887+001@gmail.com', 'iymCJHlOIQeI3xsV854oZg==', 'Verified', '2025-03-01 15:46:45', 'Offline', NULL, 'Admin', 1, 0, '2025-03-01 10:16:20', '2025-03-01 10:16:45'),
(8, 'Vandit', 'Vandit', 'vanditpatel887+009@gmail.com', 'iymCJHlOIQeI3xsV854oZg==', 'Pending', NULL, 'Offline', NULL, 'Admin', 1, 0, '2025-03-01 10:31:40', '2025-03-01 10:31:40'),
(9, 'Vandit', 'Vandit', 'vanditpatel887+0010@gmail.com', 'iymCJHlOIQeI3xsV854oZg==', 'Pending', NULL, 'Offline', NULL, 'Admin', 1, 0, '2025-03-01 10:32:13', '2025-03-01 10:32:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
