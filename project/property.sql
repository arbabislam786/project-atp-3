-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2020 at 03:01 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `property_id` int(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `location` varchar(20) NOT NULL,
  `purpose` varchar(10) NOT NULL,
  `price` int(10) NOT NULL,
  `floor` varchar(10) DEFAULT NULL,
  `sq_ft` int(10) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `no_of_clicks` int(20) DEFAULT NULL,
  `posted_by` varchar(20) NOT NULL,
  `posted_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`property_id`, `title`, `location`, `purpose`, `price`, `floor`, `sq_ft`, `description`, `status`, `no_of_clicks`, `posted_by`, `posted_date`) VALUES
(1, 'Single room ', 'Uttara', 'Rent', 6000, '5th', 120, 'Single room with unattached bathroom', 'Pending', 0, 'sahil55', '2020-02-25'),
(2, '2 room 2 bath', 'Badda', 'Rent', 14000, '4th', 600, '2 room 2 baranda 2 bath, 4th floor', 'Active', 0, 'sahil55', '2020-02-28'),
(3, '4 room 4 bath full furnished', 'Banani', 'Sell', 25000000, '3rd', 1950, '4 room 4 bath full furnished4 room 4 bath full furnished', 'Sold', 5, 'ashiq11', '2020-03-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`property_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `property_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
