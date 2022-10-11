-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: May 11, 2022 at 05:20 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banks`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
CREATE TABLE IF NOT EXISTS `bank_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `account_number` varchar(100) NOT NULL,
  `balance` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_number` (`account_number`),
  KEY `userid` (`userid`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bank_accounts`
--

INSERT INTO `bank_accounts` (`id`, `name`, `account_number`, `balance`, `userid`) VALUES
(37, 'Riyad Bank', '2324558899', 6000, 6),
(38, 'Rajhi Bank', '2524668877', 8000, 6),
(39, 'AlAhli', '1005581231', 6000, 8),
(40, 'AlRajhi', '4240558877', 6000, 8),
(41, 'AlAhli', '2355742879', 4000, 6);

-- --------------------------------------------------------

--
-- Table structure for table `budgets`
--

DROP TABLE IF EXISTS `budgets`;
CREATE TABLE IF NOT EXISTS `budgets` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `budgets`
--

INSERT INTO `budgets` (`id`, `year`, `userid`) VALUES
(40, 2022, 8),
(39, 2022, 8),
(37, 2022, 6),
(38, 2022, 6),
(41, 2022, 6);

-- --------------------------------------------------------

--
-- Table structure for table `budgets_details`
--

DROP TABLE IF EXISTS `budgets_details`;
CREATE TABLE IF NOT EXISTS `budgets_details` (
  `detailid` int(11) NOT NULL AUTO_INCREMENT,
  `budgetname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `budgetid` int(11) NOT NULL,
  PRIMARY KEY (`detailid`),
  KEY `budgetid` (`budgetid`)
) ENGINE=MyISAM AUTO_INCREMENT=155 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `budgets_details`
--

INSERT INTO `budgets_details` (`detailid`, `budgetname`, `amount`, `budgetid`) VALUES
(106, 'Food', 400, 37),
(107, 'Clothes', 300, 37),
(108, 'Shop', 300, 37),
(109, 'Travel', 300, 37),
(110, 'Health', 300, 37),
(111, 'Invoices', 300, 37),
(112, 'Renting', 300, 37),
(113, 'Gasoline', 300, 37),
(114, 'Sport', 300, 37),
(115, 'Food', 400, 38),
(116, 'Clothes', 300, 38),
(117, 'Shop', 300, 38),
(118, 'Travel', 300, 38),
(119, 'Health', 300, 38),
(120, 'Invoices', 300, 38),
(121, 'Renting', 300, 38),
(122, 'Gasoline', 300, 38),
(123, 'Sport', 300, 38),
(133, 'Food', 300, 39),
(125, 'Clothes', 300, 39),
(126, 'Shop', 300, 39),
(134, 'Food', 400, 40),
(128, 'Health', 300, 39),
(129, 'Invoices', 300, 39),
(146, 'Food', 400, 41),
(147, 'Clothes', 300, 41),
(135, 'Clothes', 300, 40),
(136, 'Shop', 300, 40),
(137, 'Travel', 300, 40),
(138, 'Health', 300, 40),
(139, 'Invoices', 300, 40),
(140, 'Renting', 300, 40),
(141, 'Gasoline', 300, 40),
(142, 'Sport', 300, 40),
(148, 'Shop', 300, 41),
(149, 'Travel', 300, 41),
(150, 'Health', 300, 41),
(151, 'Invoices', 300, 41),
(152, 'Renting', 300, 41),
(153, 'Gasoline', 300, 41),
(154, 'Sport', 300, 41);

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `detailid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `expensedate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bankid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `detailid` (`detailid`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `name`, `amount`, `detailid`, `userid`, `expensedate`, `bankid`) VALUES
(27, 'Shop', 100, 136, 8, '2022-03-27 14:15:17', 40),
(20, 'Health', 200, 110, 6, '2022-03-17 21:49:41', 37),
(11, 'Food', 100, 115, 6, '2022-03-04 18:06:06', 38),
(28, 'Sport', 200, 154, 6, '2022-05-11 15:48:20', 41),
(13, 'Renting', 400, 112, 6, '2022-03-04 20:21:00', 37),
(14, 'Sport', 200, 114, 6, '2022-03-04 20:21:34', 37),
(17, 'Travel', 100, 107, 6, '2022-03-06 21:47:45', 37),
(19, 'Food', 100, 115, 6, '2022-03-12 15:22:46', 38),
(26, 'Food', 100, 134, 8, '2022-03-27 14:15:10', 40),
(22, 'Clothes', 300, 125, 8, '2022-03-20 19:44:08', 39),
(23, 'Food', 300, 133, 8, '2022-03-20 19:46:18', 39),
(24, 'Food', 200, 133, 8, '2022-03-20 19:47:25', 39),
(25, 'Clothes', 200, 125, 8, '2022-03-20 19:47:31', 39);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `attempts` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `attempts`) VALUES
(6, 'ali', 'ali@gmail.com', '966544979888', 'e10adc3949ba59abbe56e057f20f883e', 0),
(7, 'sami', 'sami@gmail.com', '966544797825', 'e10adc3949ba59abbe56e057f20f883e', 0),
(8, 'kareem', 'kareem@gmail.com', '966500558121', 'e10adc3949ba59abbe56e057f20f883e', 0),
(9, 'alaa', 'alaa@gmail.com', '966544979288', 'e10adc3949ba59abbe56e057f20f883e', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
