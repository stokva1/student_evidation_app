-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Čtv 25. dub 2024, 23:26
-- Verze serveru: 10.4.27-MariaDB
-- Verze PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `student_evidation`
--

-- --------------------------------------------------------

--
-- Zástupná struktura pro pohled `absenceinfo`
-- (Vlastní pohled viz níže)
--
CREATE TABLE `absenceinfo` (
`tAttendanceID` int(11)
,`scheduleActionID` int(11)
,`firstname` varchar(20)
,`surname` varchar(20)
,`isPresent` bit(1)
,`isExcused` bit(1)
,`absencetype` varchar(30)
,`tAbsenceTypeID` int(11)
);

-- --------------------------------------------------------

--
-- Zástupná struktura pro pohled `scheduleactioninfo`
-- (Vlastní pohled viz níže)
--
CREATE TABLE `scheduleactioninfo` (
`tScheduleActionID` int(11)
,`tTeacherID` int(11)
,`date` datetime
,`subjectName` varchar(100)
,`type` varchar(30)
,`studentCount` bigint(21)
);

-- --------------------------------------------------------

--
-- Struktura tabulky `tabsencetype`
--

CREATE TABLE `tabsencetype` (
  `name` varchar(30) NOT NULL,
  `tAbsenceTypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tabsencetype`
--

INSERT INTO `tabsencetype` (`name`, `tAbsenceTypeID`) VALUES
('Nemoc', 1),
('Rodinné důvody', 2),
('Problém s dopravou', 3),
('Zaspání', 4),
('Školní akce', 5),
('Jiné', 6);

-- --------------------------------------------------------

--
-- Struktura tabulky `tattendance`
--

CREATE TABLE `tattendance` (
  `isPresent` bit(1) NOT NULL,
  `tAttendanceID` int(11) NOT NULL,
  `tAbsenceTypeID` int(11) DEFAULT NULL,
  `tStudentID` int(11) NOT NULL,
  `tScheduleActionID` int(11) NOT NULL,
  `isExcused` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tattendance`
--

INSERT INTO `tattendance` (`isPresent`, `tAttendanceID`, `tAbsenceTypeID`, `tStudentID`, `tScheduleActionID`, `isExcused`) VALUES
(b'0', 1, NULL, 1, 1, b'0'),
(b'0', 2, NULL, 2, 2, b'0'),
(b'0', 3, NULL, 3, 3, b'0'),
(b'0', 4, NULL, 4, 4, b'0'),
(b'0', 5, NULL, 5, 5, b'0'),
(b'0', 6, NULL, 6, 6, b'0'),
(b'0', 7, NULL, 7, 7, b'0'),
(b'0', 8, NULL, 8, 8, b'0'),
(b'0', 9, NULL, 9, 9, b'0'),
(b'0', 10, NULL, 10, 10, b'0'),
(b'0', 11, NULL, 11, 1, b'0'),
(b'0', 12, NULL, 12, 2, b'0'),
(b'0', 13, NULL, 13, 3, b'0'),
(b'0', 14, NULL, 14, 4, b'0'),
(b'0', 15, NULL, 15, 5, b'0'),
(b'0', 16, NULL, 16, 6, b'0'),
(b'0', 17, NULL, 17, 7, b'0'),
(b'0', 18, NULL, 18, 8, b'0'),
(b'0', 19, NULL, 19, 9, b'0'),
(b'0', 20, NULL, 20, 10, b'0'),
(b'0', 21, NULL, 21, 1, b'0'),
(b'0', 22, NULL, 22, 2, b'0'),
(b'0', 23, NULL, 23, 3, b'0'),
(b'0', 24, NULL, 24, 4, b'0'),
(b'0', 25, NULL, 25, 5, b'0'),
(b'0', 26, NULL, 26, 6, b'0'),
(b'0', 27, NULL, 27, 7, b'0'),
(b'0', 28, NULL, 28, 8, b'0'),
(b'0', 29, NULL, 29, 9, b'0'),
(b'0', 30, NULL, 30, 10, b'0'),
(b'0', 31, NULL, 31, 1, b'0'),
(b'0', 32, NULL, 32, 2, b'0'),
(b'0', 33, NULL, 33, 3, b'0'),
(b'0', 34, NULL, 34, 4, b'0'),
(b'0', 35, NULL, 35, 5, b'0'),
(b'0', 36, NULL, 36, 6, b'0'),
(b'0', 37, NULL, 37, 7, b'0'),
(b'0', 38, NULL, 38, 8, b'0'),
(b'0', 39, NULL, 39, 9, b'0'),
(b'0', 40, NULL, 40, 10, b'0'),
(b'0', 41, NULL, 41, 1, b'0'),
(b'0', 42, NULL, 42, 2, b'0'),
(b'0', 43, NULL, 43, 3, b'0'),
(b'0', 44, NULL, 44, 4, b'0'),
(b'0', 45, NULL, 45, 5, b'0'),
(b'0', 46, NULL, 46, 6, b'0'),
(b'0', 47, NULL, 47, 7, b'0'),
(b'0', 48, NULL, 48, 8, b'0'),
(b'0', 49, NULL, 49, 9, b'0'),
(b'0', 50, NULL, 50, 10, b'0'),
(b'0', 51, NULL, 51, 1, b'0'),
(b'0', 52, NULL, 52, 2, b'0'),
(b'0', 53, NULL, 53, 3, b'0'),
(b'0', 54, 3, 54, 4, b'1'),
(b'0', 55, NULL, 55, 5, b'0'),
(b'0', 56, NULL, 56, 6, b'0'),
(b'0', 57, NULL, 57, 7, b'0'),
(b'0', 58, NULL, 58, 8, b'0'),
(b'0', 59, NULL, 59, 9, b'0'),
(b'0', 60, NULL, 60, 10, b'0'),
(b'0', 61, NULL, 61, 1, b'0'),
(b'0', 62, NULL, 62, 2, b'0'),
(b'0', 63, NULL, 63, 3, b'0'),
(b'0', 64, NULL, 64, 4, b'0'),
(b'0', 65, NULL, 65, 5, b'0'),
(b'0', 66, NULL, 66, 6, b'0'),
(b'0', 67, NULL, 67, 7, b'0'),
(b'0', 68, NULL, 68, 8, b'0'),
(b'0', 69, NULL, 69, 9, b'0'),
(b'0', 70, NULL, 70, 10, b'0'),
(b'0', 71, NULL, 71, 1, b'0'),
(b'0', 72, NULL, 72, 2, b'0'),
(b'0', 73, NULL, 73, 3, b'1'),
(b'0', 74, NULL, 74, 4, b'0'),
(b'0', 75, NULL, 75, 5, b'0'),
(b'1', 76, NULL, 76, 6, b'0'),
(b'0', 77, NULL, 77, 7, b'0'),
(b'0', 78, NULL, 78, 8, b'0'),
(b'0', 79, NULL, 79, 9, b'0'),
(b'0', 80, NULL, 80, 10, b'0'),
(b'0', 81, NULL, 81, 1, b'0'),
(b'0', 82, NULL, 82, 2, b'0'),
(b'0', 83, NULL, 83, 3, b'0'),
(b'0', 84, NULL, 84, 4, b'0'),
(b'0', 85, NULL, 85, 5, b'0'),
(b'0', 86, NULL, 86, 6, b'0'),
(b'0', 87, NULL, 87, 7, b'0'),
(b'0', 88, NULL, 88, 8, b'0'),
(b'0', 89, NULL, 89, 9, b'0'),
(b'0', 90, NULL, 90, 10, b'0'),
(b'0', 91, NULL, 91, 1, b'0'),
(b'0', 92, NULL, 92, 2, b'0'),
(b'0', 93, NULL, 93, 3, b'1'),
(b'0', 94, NULL, 94, 4, b'0'),
(b'0', 95, NULL, 95, 5, b'0'),
(b'0', 96, NULL, 96, 6, b'0'),
(b'0', 97, NULL, 97, 7, b'0'),
(b'0', 98, NULL, 98, 8, b'0'),
(b'0', 99, NULL, 99, 9, b'0'),
(b'0', 100, NULL, 100, 10, b'0'),
(b'0', 118, NULL, 119, 21, b'1'),
(b'0', 119, NULL, 120, 21, b'0'),
(b'0', 120, NULL, 121, 21, b'0'),
(b'0', 121, NULL, 122, 21, b'0'),
(b'0', 122, NULL, 123, 21, b'0'),
(b'0', 123, NULL, 124, 21, b'0'),
(b'0', 124, NULL, 125, 21, b'0'),
(b'0', 125, NULL, 126, 21, b'0'),
(b'0', 126, NULL, 127, 21, b'0'),
(b'0', 127, NULL, 128, 21, b'0'),
(b'0', 128, NULL, 129, 21, b'0'),
(b'0', 129, NULL, 130, 21, b'0'),
(b'0', 130, NULL, 131, 21, b'0'),
(b'0', 131, NULL, 132, 21, b'0'),
(b'0', 132, NULL, 133, 21, b'0'),
(b'0', 133, NULL, 134, 21, b'0'),
(b'0', 134, NULL, 135, 21, b'0'),
(b'0', 135, 4, 119, 24, b'1'),
(b'0', 136, 3, 120, 24, b'1'),
(b'1', 137, NULL, 121, 24, b'0'),
(b'0', 138, 3, 122, 24, b'1'),
(b'0', 139, NULL, 123, 24, b'1'),
(b'0', 140, NULL, 124, 24, b'0'),
(b'0', 141, NULL, 125, 24, b'0'),
(b'0', 142, NULL, 126, 24, b'0'),
(b'0', 143, NULL, 127, 24, b'0'),
(b'0', 144, NULL, 128, 24, b'0'),
(b'0', 145, NULL, 129, 24, b'0'),
(b'0', 146, NULL, 130, 24, b'0'),
(b'0', 147, NULL, 131, 24, b'0'),
(b'0', 148, NULL, 132, 24, b'0'),
(b'0', 149, NULL, 133, 24, b'0'),
(b'0', 150, NULL, 134, 24, b'0'),
(b'0', 151, NULL, 135, 24, b'0'),
(b'0', 152, NULL, 119, 25, b'0'),
(b'0', 153, NULL, 120, 25, b'0'),
(b'0', 154, NULL, 121, 25, b'0'),
(b'0', 155, NULL, 122, 25, b'0'),
(b'0', 156, NULL, 123, 25, b'0'),
(b'0', 157, NULL, 124, 25, b'0'),
(b'0', 158, NULL, 125, 25, b'0'),
(b'0', 159, NULL, 126, 25, b'0'),
(b'0', 160, NULL, 127, 25, b'0'),
(b'0', 161, NULL, 128, 25, b'0'),
(b'0', 162, NULL, 129, 25, b'0'),
(b'0', 163, NULL, 130, 25, b'0'),
(b'0', 164, NULL, 131, 25, b'0'),
(b'0', 165, NULL, 132, 25, b'0'),
(b'0', 166, NULL, 133, 25, b'0'),
(b'0', 167, NULL, 134, 25, b'0'),
(b'0', 168, NULL, 135, 25, b'0'),
(b'1', 169, NULL, 119, 26, b'0'),
(b'0', 170, NULL, 120, 26, b'0'),
(b'0', 171, NULL, 121, 26, b'0'),
(b'0', 172, NULL, 122, 26, b'0'),
(b'0', 173, NULL, 123, 26, b'0'),
(b'0', 174, NULL, 124, 26, b'0'),
(b'0', 175, NULL, 125, 26, b'0'),
(b'0', 176, NULL, 126, 26, b'0'),
(b'0', 177, NULL, 127, 26, b'0'),
(b'0', 178, NULL, 128, 26, b'0'),
(b'0', 179, NULL, 129, 26, b'0'),
(b'0', 180, NULL, 130, 26, b'0'),
(b'0', 181, NULL, 131, 26, b'0'),
(b'0', 182, NULL, 132, 26, b'0'),
(b'0', 183, NULL, 133, 26, b'0'),
(b'0', 184, NULL, 134, 26, b'0'),
(b'0', 185, NULL, 135, 26, b'0'),
(b'0', 186, NULL, 119, 27, b'0'),
(b'0', 187, NULL, 120, 27, b'0'),
(b'0', 188, NULL, 121, 27, b'0'),
(b'0', 189, NULL, 122, 27, b'0'),
(b'0', 190, NULL, 123, 27, b'0'),
(b'0', 191, NULL, 124, 27, b'0'),
(b'0', 192, NULL, 125, 27, b'0'),
(b'0', 193, NULL, 126, 27, b'0'),
(b'0', 194, NULL, 127, 27, b'0'),
(b'0', 195, NULL, 128, 27, b'0'),
(b'0', 196, NULL, 129, 27, b'0'),
(b'0', 197, NULL, 130, 27, b'0'),
(b'0', 198, NULL, 131, 27, b'0'),
(b'0', 199, NULL, 132, 27, b'0'),
(b'0', 200, NULL, 133, 27, b'0'),
(b'0', 201, NULL, 134, 27, b'0'),
(b'0', 202, NULL, 135, 27, b'0'),
(b'1', 203, NULL, 119, 28, b'0'),
(b'0', 204, NULL, 120, 28, b'0'),
(b'0', 205, NULL, 121, 28, b'0'),
(b'0', 206, NULL, 122, 28, b'0'),
(b'0', 207, NULL, 123, 28, b'0'),
(b'0', 208, NULL, 124, 28, b'0'),
(b'0', 209, NULL, 125, 28, b'0'),
(b'0', 210, NULL, 126, 28, b'0'),
(b'0', 211, NULL, 127, 28, b'0'),
(b'0', 212, NULL, 128, 28, b'0'),
(b'0', 213, NULL, 129, 28, b'0'),
(b'0', 214, NULL, 130, 28, b'0'),
(b'0', 215, NULL, 131, 28, b'0'),
(b'0', 216, NULL, 132, 28, b'0'),
(b'0', 217, NULL, 133, 28, b'0'),
(b'0', 218, NULL, 134, 28, b'0'),
(b'0', 219, NULL, 135, 28, b'0'),
(b'0', 220, NULL, 119, 29, b'0'),
(b'0', 221, NULL, 120, 29, b'0'),
(b'0', 222, NULL, 121, 29, b'0'),
(b'0', 223, NULL, 122, 29, b'0'),
(b'0', 224, NULL, 123, 29, b'0'),
(b'0', 225, NULL, 124, 29, b'0'),
(b'0', 226, NULL, 125, 29, b'0'),
(b'0', 227, NULL, 126, 29, b'0'),
(b'0', 228, NULL, 127, 29, b'0'),
(b'0', 229, NULL, 128, 29, b'0'),
(b'0', 230, NULL, 129, 29, b'0'),
(b'0', 231, NULL, 130, 29, b'0'),
(b'0', 232, NULL, 131, 29, b'0'),
(b'0', 233, NULL, 132, 29, b'0'),
(b'0', 234, NULL, 133, 29, b'0'),
(b'0', 235, NULL, 134, 29, b'0'),
(b'0', 236, NULL, 135, 29, b'0'),
(b'0', 237, NULL, 119, 30, b'0'),
(b'0', 238, NULL, 120, 30, b'0'),
(b'0', 239, NULL, 121, 30, b'0'),
(b'0', 240, NULL, 122, 30, b'0'),
(b'0', 241, NULL, 123, 30, b'0'),
(b'0', 242, NULL, 124, 30, b'0'),
(b'0', 243, NULL, 125, 30, b'0'),
(b'0', 244, NULL, 126, 30, b'0'),
(b'0', 245, NULL, 127, 30, b'0'),
(b'0', 246, NULL, 128, 30, b'0'),
(b'0', 247, NULL, 129, 30, b'0'),
(b'0', 248, NULL, 130, 30, b'0'),
(b'0', 249, NULL, 131, 30, b'0'),
(b'0', 250, NULL, 132, 30, b'0'),
(b'0', 251, NULL, 133, 30, b'0'),
(b'0', 252, NULL, 134, 30, b'0'),
(b'0', 253, NULL, 135, 30, b'0'),
(b'0', 254, NULL, 119, 31, b'0'),
(b'0', 255, NULL, 120, 31, b'0'),
(b'0', 256, NULL, 121, 31, b'0'),
(b'0', 257, NULL, 122, 31, b'0'),
(b'0', 258, NULL, 123, 31, b'0'),
(b'0', 259, NULL, 124, 31, b'0'),
(b'0', 260, NULL, 125, 31, b'0'),
(b'0', 261, NULL, 126, 31, b'0'),
(b'0', 262, NULL, 127, 31, b'0'),
(b'0', 263, NULL, 128, 31, b'0'),
(b'0', 264, NULL, 129, 31, b'0'),
(b'0', 265, NULL, 130, 31, b'0'),
(b'0', 266, NULL, 131, 31, b'0'),
(b'0', 267, NULL, 132, 31, b'0'),
(b'0', 268, NULL, 133, 31, b'0'),
(b'0', 269, NULL, 134, 31, b'0'),
(b'0', 270, NULL, 135, 31, b'0'),
(b'0', 271, NULL, 119, 32, b'0'),
(b'0', 272, NULL, 120, 32, b'0'),
(b'0', 273, NULL, 121, 32, b'0'),
(b'0', 274, NULL, 122, 32, b'0'),
(b'0', 275, NULL, 123, 32, b'0'),
(b'0', 276, NULL, 124, 32, b'0'),
(b'0', 277, NULL, 125, 32, b'0'),
(b'0', 278, NULL, 126, 32, b'0'),
(b'0', 279, NULL, 127, 32, b'0'),
(b'0', 280, NULL, 128, 32, b'0'),
(b'0', 281, NULL, 129, 32, b'0'),
(b'0', 282, NULL, 130, 32, b'0'),
(b'0', 283, NULL, 131, 32, b'0'),
(b'0', 284, NULL, 132, 32, b'0'),
(b'0', 285, NULL, 133, 32, b'0'),
(b'0', 286, NULL, 134, 32, b'0'),
(b'0', 287, NULL, 135, 32, b'0'),
(b'0', 288, NULL, 119, 33, b'0'),
(b'0', 289, NULL, 120, 33, b'0'),
(b'0', 290, NULL, 121, 33, b'0'),
(b'0', 291, NULL, 122, 33, b'0'),
(b'0', 292, NULL, 123, 33, b'0'),
(b'0', 293, NULL, 124, 33, b'0'),
(b'0', 294, NULL, 125, 33, b'0'),
(b'0', 295, NULL, 126, 33, b'0'),
(b'0', 296, NULL, 127, 33, b'0'),
(b'0', 297, NULL, 128, 33, b'0'),
(b'0', 298, NULL, 129, 33, b'0'),
(b'0', 299, NULL, 130, 33, b'0'),
(b'0', 300, NULL, 131, 33, b'0'),
(b'0', 301, NULL, 132, 33, b'0'),
(b'0', 302, NULL, 133, 33, b'0'),
(b'0', 303, NULL, 134, 33, b'0'),
(b'0', 304, NULL, 135, 33, b'0'),
(b'0', 322, NULL, 119, 35, b'0'),
(b'0', 323, NULL, 120, 35, b'0'),
(b'0', 324, NULL, 121, 35, b'0'),
(b'0', 325, NULL, 122, 35, b'0'),
(b'0', 326, NULL, 123, 35, b'0'),
(b'0', 327, NULL, 124, 35, b'0'),
(b'0', 328, NULL, 125, 35, b'0'),
(b'0', 329, NULL, 126, 35, b'0'),
(b'0', 330, NULL, 127, 35, b'0'),
(b'0', 331, NULL, 128, 35, b'0'),
(b'0', 332, NULL, 129, 35, b'0'),
(b'0', 333, NULL, 130, 35, b'0'),
(b'0', 334, NULL, 131, 35, b'0'),
(b'0', 335, NULL, 132, 35, b'0'),
(b'0', 336, NULL, 133, 35, b'0'),
(b'0', 337, NULL, 134, 35, b'0'),
(b'0', 338, NULL, 135, 35, b'0'),
(b'0', 339, 3, 119, 36, b'1'),
(b'1', 340, NULL, 120, 36, b'0'),
(b'1', 341, NULL, 121, 36, b'0'),
(b'1', 342, NULL, 122, 36, b'0'),
(b'1', 343, NULL, 123, 36, b'0'),
(b'1', 344, NULL, 124, 36, b'0'),
(b'0', 345, NULL, 125, 36, b'0'),
(b'0', 346, NULL, 126, 36, b'0'),
(b'0', 347, NULL, 127, 36, b'0'),
(b'0', 348, NULL, 128, 36, b'0'),
(b'0', 349, NULL, 129, 36, b'0'),
(b'0', 350, NULL, 130, 36, b'0'),
(b'0', 351, NULL, 131, 36, b'0'),
(b'0', 352, NULL, 132, 36, b'0'),
(b'0', 353, NULL, 133, 36, b'0'),
(b'0', 354, NULL, 134, 36, b'0'),
(b'0', 355, NULL, 135, 36, b'0'),
(b'0', 356, NULL, 119, 37, b'0'),
(b'0', 357, NULL, 120, 37, b'0'),
(b'0', 358, NULL, 121, 37, b'0'),
(b'0', 359, NULL, 122, 37, b'0'),
(b'0', 360, NULL, 123, 37, b'0'),
(b'0', 361, NULL, 124, 37, b'0'),
(b'0', 362, NULL, 125, 37, b'0'),
(b'0', 363, NULL, 126, 37, b'0'),
(b'0', 364, NULL, 127, 37, b'0'),
(b'0', 365, NULL, 128, 37, b'0'),
(b'0', 366, NULL, 129, 37, b'0'),
(b'0', 367, NULL, 130, 37, b'0'),
(b'0', 368, NULL, 131, 37, b'0'),
(b'0', 369, NULL, 132, 37, b'0'),
(b'0', 370, NULL, 133, 37, b'0'),
(b'0', 371, NULL, 134, 37, b'0'),
(b'0', 372, NULL, 135, 37, b'0'),
(b'0', 730, NULL, 119, 59, b'0'),
(b'0', 731, NULL, 120, 59, b'0'),
(b'0', 732, NULL, 121, 59, b'0'),
(b'0', 733, NULL, 122, 59, b'0'),
(b'0', 734, NULL, 123, 59, b'0'),
(b'0', 735, NULL, 124, 59, b'0'),
(b'0', 736, NULL, 125, 59, b'0'),
(b'0', 737, NULL, 126, 59, b'0'),
(b'0', 738, NULL, 127, 59, b'0'),
(b'0', 739, NULL, 128, 59, b'0'),
(b'0', 740, NULL, 129, 59, b'0'),
(b'0', 741, NULL, 130, 59, b'0'),
(b'0', 742, NULL, 131, 59, b'0'),
(b'0', 743, NULL, 132, 59, b'0'),
(b'0', 744, NULL, 133, 59, b'0'),
(b'0', 745, NULL, 134, 59, b'0'),
(b'0', 746, NULL, 135, 59, b'0'),
(b'1', 747, NULL, 119, 60, b'0'),
(b'1', 748, NULL, 120, 60, b'0'),
(b'1', 749, NULL, 121, 60, b'0'),
(b'0', 750, NULL, 122, 60, b'0'),
(b'0', 751, NULL, 123, 60, b'0'),
(b'0', 752, NULL, 124, 60, b'0'),
(b'0', 753, NULL, 125, 60, b'0'),
(b'0', 754, NULL, 126, 60, b'0'),
(b'0', 755, NULL, 127, 60, b'0'),
(b'0', 756, NULL, 128, 60, b'0'),
(b'0', 757, NULL, 129, 60, b'0'),
(b'0', 758, NULL, 130, 60, b'0'),
(b'0', 759, NULL, 131, 60, b'0'),
(b'0', 760, NULL, 132, 60, b'0'),
(b'0', 761, NULL, 133, 60, b'0'),
(b'0', 762, NULL, 134, 60, b'0'),
(b'0', 763, NULL, 135, 60, b'0');

-- --------------------------------------------------------

--
-- Struktura tabulky `tenrolledstudents`
--

CREATE TABLE `tenrolledstudents` (
  `tEnrolledStudentsID` int(11) NOT NULL,
  `tStudentID` int(11) NOT NULL,
  `tSubjectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tenrolledstudents`
--

INSERT INTO `tenrolledstudents` (`tEnrolledStudentsID`, `tStudentID`, `tSubjectID`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 2),
(4, 4, 2),
(5, 5, 3),
(6, 6, 2),
(7, 7, 2),
(8, 8, 2),
(9, 9, 1),
(10, 10, 1),
(11, 11, 2),
(12, 12, 2),
(13, 13, 3),
(14, 14, 2),
(15, 15, 2),
(16, 16, 1),
(17, 17, 1),
(18, 18, 1),
(19, 19, 2),
(20, 20, 1),
(21, 21, 2),
(22, 22, 1),
(23, 23, 3),
(24, 24, 1),
(25, 25, 1),
(26, 26, 2),
(27, 27, 2),
(28, 28, 1),
(29, 29, 2),
(30, 30, 2),
(31, 31, 2),
(32, 32, 2),
(33, 33, 1),
(34, 34, 2),
(35, 35, 2),
(36, 36, 2),
(37, 37, 2),
(38, 38, 3),
(39, 39, 1),
(40, 40, 1),
(41, 41, 2),
(42, 42, 1),
(43, 43, 1),
(44, 44, 1),
(45, 45, 2),
(46, 46, 1),
(47, 47, 1),
(48, 48, 1),
(49, 49, 1),
(50, 50, 3),
(51, 51, 2),
(52, 52, 1),
(53, 53, 2),
(54, 54, 2),
(55, 55, 1),
(56, 56, 2),
(57, 57, 2),
(58, 58, 1),
(59, 59, 2),
(60, 60, 1),
(61, 61, 3),
(62, 62, 1),
(63, 63, 2),
(64, 64, 1),
(65, 65, 2),
(66, 66, 3),
(67, 67, 2),
(68, 68, 1),
(69, 69, 3),
(70, 70, 1),
(71, 71, 1),
(72, 72, 2),
(73, 73, 1),
(74, 74, 2),
(75, 75, 2),
(76, 76, 2),
(77, 77, 1),
(78, 78, 2),
(79, 79, 2),
(80, 80, 2),
(81, 81, 1),
(82, 82, 2),
(83, 83, 2),
(84, 84, 1),
(85, 85, 1),
(86, 86, 1),
(87, 87, 1),
(88, 88, 1),
(89, 89, 1),
(90, 90, 2),
(91, 91, 1),
(92, 92, 2),
(93, 93, 1),
(94, 94, 2),
(95, 95, 2),
(96, 96, 2),
(97, 97, 2),
(98, 98, 2),
(99, 99, 1),
(100, 100, 1),
(119, 119, 3),
(120, 120, 3),
(121, 121, 3),
(122, 122, 3),
(123, 123, 3),
(124, 124, 3),
(125, 125, 3),
(126, 126, 3),
(127, 127, 3),
(128, 128, 3),
(129, 129, 3),
(130, 130, 3),
(131, 131, 3),
(132, 132, 3),
(133, 133, 3),
(134, 134, 3),
(135, 135, 3),
(136, 119, 2),
(137, 120, 2),
(138, 121, 2),
(139, 122, 2),
(140, 123, 2),
(141, 124, 2),
(142, 125, 2),
(143, 126, 2),
(144, 127, 2),
(145, 128, 2),
(146, 129, 2),
(147, 130, 2),
(148, 131, 2),
(149, 132, 2),
(150, 133, 2),
(151, 134, 2),
(152, 135, 2),
(153, 119, 1),
(154, 120, 1),
(155, 121, 1),
(156, 122, 1),
(157, 123, 1),
(158, 124, 1),
(159, 125, 1),
(160, 126, 1),
(161, 127, 1),
(162, 128, 1),
(163, 129, 1),
(164, 130, 1),
(165, 131, 1),
(166, 132, 1),
(167, 133, 1),
(168, 134, 1),
(169, 135, 1),
(170, 119, 14),
(171, 120, 14),
(172, 121, 14),
(173, 122, 14),
(174, 123, 14),
(175, 124, 14),
(176, 125, 14),
(177, 126, 14),
(178, 127, 14),
(179, 128, 14),
(180, 129, 14),
(181, 130, 14),
(182, 131, 14),
(183, 132, 14),
(184, 133, 14),
(185, 134, 14),
(186, 135, 14),
(204, 119, 15),
(205, 120, 15),
(206, 121, 15),
(207, 122, 15),
(208, 123, 15),
(209, 124, 15),
(210, 125, 15),
(211, 126, 15),
(212, 127, 15),
(213, 128, 15),
(214, 129, 15),
(215, 130, 15),
(216, 131, 15),
(217, 132, 15),
(218, 133, 15),
(219, 134, 15),
(220, 135, 15),
(272, 119, 13),
(273, 120, 13),
(274, 121, 13),
(275, 122, 13),
(276, 123, 13),
(277, 124, 13),
(278, 125, 13),
(279, 126, 13),
(280, 127, 13),
(281, 128, 13),
(282, 129, 13),
(283, 130, 13),
(284, 131, 13),
(285, 132, 13),
(286, 133, 13),
(287, 134, 13),
(288, 135, 13);

-- --------------------------------------------------------

--
-- Struktura tabulky `tlogin`
--

CREATE TABLE `tlogin` (
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `tLoginID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tlogin`
--

INSERT INTO `tlogin` (`email`, `password`, `tLoginID`) VALUES
('a@a.a', '$2b$10$kIGPyEnDt8bqTX6rwPJKfOYqe12u7ZJ1Gbs5wgmQlCmK5mace.zJC', 1),
('alhasbi1@uhk.cz', '', 2),
('bhattde1@uhk.cz', '', 3),
('johnal1@uhk.cz', '', 4),
('gardiri1@uhk.cz', '', 5),
('naeemha1@uhk.cz', '', 6),
('bhativi1@uhk.cz', '', 7),
('radonja1@uhk.cz', '', 8),
('vnuckgr1@uhk.cz', '', 9),
('hubaciv1@uhk.cz', '', 10),
('balogzo1@uhk.cz', '', 11),
('cengiko1@uhk.cz', '', 12),
('butte1@uhk.cz', '', 13),
('sealay1@uhk.cz', '', 14),
('bouzksa1@uhk.cz', '', 15),
('ivenzpe1@uhk.cz', '', 16),
('nesrsvi1@uhk.cz', '', 17),
('yaroab1@uhk.cz', '', 18),
('vychohe1@uhk.cz', '', 19),
('lisaja1@uhk.cz', '', 20),
('konvima1@uhk.cz', '', 21),
('yasmifa1@uhk.cz', '', 22),
('almerlu1@uhk.cz', '', 23),
('rasoosa1@uhk.cz', '', 24),
('akbarmi1@uhk.cz', '', 25),
('miffeda1@uhk.cz', '', 26),
('moravon3@uhk.cz', '', 27),
('lasista1@uhk.cz', '', 28),
('janecma1@uhk.cz', '', 29),
('polakpe3@uhk.cz', '', 30),
('odeisa1@uhk.cz', '', 31),
('lnenili1@uhk.cz', '', 32),
('akbarah1@uhk.cz', '', 33),
('pospiev3@uhk.cz', '', 34),
('jakkasu1@uhk.cz', '', 35),
('zvackan1@uhk.cz', '', 36),
('vorelvo2@uhk.cz', '', 37),
('svoboto1@uhk.cz', '', 38),
('malyka1@uhk.cz', '', 39),
('rohrma1@uhk.cz', '', 40),
('patocja1@uhk.cz', '', 41),
('trnkoga1@uhk.cz', '', 42),
('safrast1@uhk.cz', '', 43),
('zilvami1@uhk.cz', '', 44),
('svatkzu1@uhk.cz', '', 45),
('macija1@uhk.cz', '', 46),
('pozleto1@uhk.cz', '', 47),
('bonscji1@uhk.cz', '', 48),
('schmida1@uhk.cz', '', 49),
('bauerpe1@uhk.cz', '', 50),
('cervive1@uhk.cz', '', 51),
('burdato2@uhk.cz', '', 52),
('pallado1@uhk.cz', '', 53),
('korinmi1@uhk.cz', '', 54),
('bouraja1@uhk.cz', '', 55),
('ledvito1@uhk.cz', '', 56),
('kirimay1@uhk.cz', '', 57),
('kralma2@uhk.cz', '', 58),
('urbanpa1@uhk.cz', '', 59),
('dvorami2@uhk.cz', '', 60),
('vondrda3@uhk.cz', '', 61),
('medkoja1@uhk.cz', '', 62),
('mrnakto1@uhk.cz', '', 63),
('vojkora1@uhk.cz', '', 64),
('tomanjo1@uhk.cz', '', 65),
('blazepa1@uhk.cz', '', 66),
('matejma1@uhk.cz', '', 67),
('dobromi1@uhk.cz', '', 68),
('alparor1@uhk.cz', '', 69),
('zankema1@uhk.cz', '', 70),
('langeja1@uhk.cz', '', 71),
('macinmi1@uhk.cz', '', 72),
('benesja4@uhk.cz', '', 73),
('froncka1@uhk.cz', '', 74),
('borkoan1@uhk.cz', '', 75),
('kucaka1@uhk.cz', '', 76),
('hasekfr1@uhk.cz', '', 77),
('petruja2@uhk.cz', '', 78),
('hamplev1@uhk.cz', '', 79),
('srameka1@uhk.cz', '', 80),
('kopecto1@uhk.cz', '', 81),
('zelenjo1@uhk.cz', '', 82),
('mikulpe1@uhk.cz', '', 83),
('slaniga1@uhk.cz', '', 84),
('slabyan1@uhk.cz', '', 85),
('levinma1@uhk.cz', '', 86),
('hynekjo1@uhk.cz', '', 87),
('cerveji1@uhk.cz', '', 88),
('nachato1@uhk.cz', '', 89),
('bartuan1@uhk.cz', '', 90),
('zejdada1@uhk.cz', '', 91),
('secda1@uhk.cz', '', 92),
('budinja1@uhk.cz', '', 93),
('reznylu1@uhk.cz', '', 94),
('krizpa1@uhk.cz', '', 95),
('fskadam1@uhk.cz', '', 96),
('cechpa1@uhk.cz', '', 97),
('holubhe1@uhk.cz', '', 98),
('fsotcet1@uhk.cz', '', 99),
('gavalta1@uhk.cz', '', 100),
('zubrva1@uhk.cz', '', 101),
('paskoma1@uhk.cz', '', 102),
('hrusoda1@uhk.cz', '', 103),
('fshusam2@uhk.cz', '', 104),
('rubacja1@uhk.cz', '', 105),
('havigji1@uhk.cz', '', 106),
('kozelto1@uhk.cz', '', 107),
('krejcon1@uhk.cz', '', 108),
('chaloda1@uhk.cz', '', 109),
('strnave1@uhk.cz', '', 110),
('mohelha1@uhk.cz', '', 111),
('dolejjo1@uhk.cz', '', 112),
('prazate1@uhk.cz', '', 113),
('buresvl1@uhk.cz', '', 114),
('pikhama1@uhk.cz', '', 115),
('conkomi1@uhk.cz', '', 116),
('psvlasp1@uhk.cz', '', 117),
('bazanli1@uhk.cz', '', 118),
('fsnemcz1@uhk.cz', '', 119),
('dittrja1@uhk.cz', '', 120),
('mlska1@uhk.cz', '', 121),
('sevcian1@uhk.cz', '', 122),
('simkoja1@uhk.cz', '', 123),
('nekviji1@uhk.cz', '', 124),
('malyfi1@uhk.cz', '', 125),
('hodovel1@uhk.cz', '', 126),
('fssobev1@uhk.cz', '', 127),
('whiteja1@uhk.cz', '', 128),
('misicka1@uhk.cz', '', 129),
('chalopa1@uhk.cz', '', 130),
('poulope1@uhk.cz', '', 131),
('hrusape1@uhk.cz', '', 132),
('leflefr1@uhk.cz', '', 133),
('sramkha1@uhk.cz', '', 134),
('tucnipe1@uhk.cz', '', 135),
('provaka1@uhk.cz', '', 136),
('jablojo1@uhk.cz', '', 137),
('sabatma1@uhk.cz', '', 138),
('sieglev1@uhk.cz', '', 139),
('skalsha1@uhk.cz', '', 140),
('jedlipa1@uhk.cz', '', 141),
('janecva1@uhk.cz', '', 142),
('olsevka1@uhk.cz', '', 143),
('ponceda1@uhk.cz', '', 144),
('fstesab1@uhk.cz', '', 145),
('cernami1@uhk.cz', '', 146),
('klimobl1@uhk.cz', '', 147),
('pshoraj6@uhk.cz', '', 148),
('bachmpa1@uhk.cz', '', 149),
('jezekbr1@uhk.cz', '', 150),
('franema1@uhk.cz', '', 151),
('simkomo1@uhk.cz', '', 152),
('halekvi1@uhk.cz', '', 153),
('izakoiv1@uhk.cz', '', 154),
('semrail1@uhk.cz', '', 155),
('petrale1@uhk.cz', '', 156),
('lounejo1@uhk.cz', '', 157),
('rohroha1@uhk.cz', '', 158),
('valovmo1@uhk.cz', '', 159),
('prazapa1@uhk.cz', '', 160),
('soukaiv1@uhk.cz', '', 161),
('tomasha2@uhk.cz', '', 162),
('novakmi1@uhk.cz', '', 163),
('kacetja1@uhk.cz', '', 164),
('hajekla1@uhk.cz', '', 165),
('stokva1@uhk.cz', '$2b$10$nO0itddQEY6u227.MFKLDuaYHVbLGbk9a0xC73Ge2CrtToTKuHtXa', 166);

-- --------------------------------------------------------

--
-- Struktura tabulky `tscheduleaction`
--

CREATE TABLE `tscheduleaction` (
  `date` datetime NOT NULL,
  `tScheduleActionID` int(11) NOT NULL,
  `tTeacherID` int(11) NOT NULL,
  `tSubjectID` int(11) NOT NULL,
  `tScheduleActionTypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tscheduleaction`
--

INSERT INTO `tscheduleaction` (`date`, `tScheduleActionID`, `tTeacherID`, `tSubjectID`, `tScheduleActionTypeID`) VALUES
('2024-03-30 01:41:12', 1, 1, 1, 2),
('2024-02-22 18:42:51', 2, 1, 2, 2),
('2024-03-25 23:02:16', 3, 1, 2, 1),
('2024-03-24 11:03:17', 4, 1, 3, 1),
('2024-02-22 15:49:18', 5, 1, 3, 1),
('2024-02-01 03:18:44', 6, 1, 2, 1),
('2024-03-03 08:51:21', 7, 1, 2, 2),
('2024-02-11 20:14:57', 8, 1, 2, 2),
('2024-02-07 02:26:19', 9, 1, 2, 2),
('2024-02-28 16:02:49', 10, 1, 1, 1),
('2024-04-05 23:00:56', 21, 1, 3, 4),
('2024-04-01 04:00:35', 24, 1, 2, 2),
('2024-04-08 04:00:35', 25, 1, 2, 2),
('2024-04-15 04:00:35', 26, 1, 2, 2),
('2024-04-22 04:00:35', 27, 1, 2, 2),
('2024-04-29 04:00:35', 28, 1, 2, 2),
('2024-04-06 18:00:22', 29, 1, 1, 1),
('2024-04-13 18:00:22', 30, 1, 1, 1),
('2024-04-20 18:00:22', 31, 1, 1, 1),
('2024-04-27 18:00:22', 32, 1, 1, 1),
('2024-05-04 18:00:22', 33, 1, 1, 1),
('2024-04-15 12:01:34', 35, 7, 14, 2),
('2024-04-22 12:01:34', 36, 7, 14, 2),
('2024-04-29 12:01:34', 37, 7, 14, 2),
('2024-04-19 21:47:55', 59, 7, 13, 2),
('2024-04-26 21:47:55', 60, 7, 13, 2);

-- --------------------------------------------------------

--
-- Struktura tabulky `tscheduleactiontype`
--

CREATE TABLE `tscheduleactiontype` (
  `tScheduleActionType` int(11) NOT NULL,
  `type` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tscheduleactiontype`
--

INSERT INTO `tscheduleactiontype` (`tScheduleActionType`, `type`) VALUES
(1, 'Přednáška'),
(2, 'Cvičení'),
(3, 'Zkouška'),
(4, 'Zápočet');

-- --------------------------------------------------------

--
-- Struktura tabulky `tstudent`
--

CREATE TABLE `tstudent` (
  `firstname` varchar(20) NOT NULL,
  `personalNum` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `tStudentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tstudent`
--

INSERT INTO `tstudent` (`firstname`, `personalNum`, `surname`, `tStudentID`) VALUES
('Alyda', 'I2200001', 'Mattingley', 1),
('Truda', 'I2200002', 'Close', 2),
('Rosaleen', 'I2200003', 'Hessentaler', 3),
('Moyna', 'I2200004', 'Birtley', 4),
('Toinette', 'I2200005', 'Curnnok', 5),
('Lisa', 'I2200006', 'Lowndes', 6),
('Denny', 'I2200007', 'Penddreth', 7),
('Dolly', 'I2200008', 'Antonovic', 8),
('Massimiliano', 'I2200009', 'Shreeve', 9),
('Reggy', 'I2200010', 'Gotobed', 10),
('Chandal', 'I2200011', 'Coulthart', 11),
('Frankie', 'I2200012', 'McGettigan', 12),
('Tally', 'I2200013', 'Raynor', 13),
('Bartholomeus', 'I2200014', 'Yurikov', 14),
('Dede', 'I2200015', 'Rea', 15),
('Thayne', 'I2200016', 'Von Der Empten', 16),
('Brock', 'I2200017', 'Dipple', 17),
('Mozelle', 'I2200018', 'Barracks', 18),
('Reinhard', 'I2200019', 'Markussen', 19),
('Vittoria', 'I2200020', 'Burgen', 20),
('Rafe', 'I2200021', 'McCurdy', 21),
('Mareah', 'I2200022', 'Wank', 22),
('Doll', 'I2200023', 'Stockow', 23),
('Margarethe', 'I2200024', 'Anthony', 24),
('Paulina', 'I2200025', 'Sybry', 25),
('Kirk', 'I2200026', 'Clues', 26),
('Stevy', 'I2200027', 'McEwen', 27),
('Helsa', 'I2200028', 'Dottridge', 28),
('Teodoor', 'I2200029', 'Yarker', 29),
('Arley', 'I2200030', 'Mallock', 30),
('Adina', 'I2200031', 'Southerns', 31),
('Shay', 'I2200032', 'Robley', 32),
('Giffie', 'I2200033', 'Lambal', 33),
('Alvin', 'I2200034', 'Nelle', 34),
('Margeaux', 'I2200035', 'Aymes', 35),
('Tailor', 'I2200036', 'Willimont', 36),
('Ber', 'I2200037', 'Gillions', 37),
('Juana', 'I2200038', 'Wanell', 38),
('Courtney', 'I2200039', 'Fullegar', 39),
('Lyssa', 'I2200040', 'Furmston', 40),
('Lance', 'I2200041', 'Hawick', 41),
('Ree', 'I2200042', 'Dewhurst', 42),
('Valentin', 'I2200043', 'Daine', 43),
('Reynold', 'I2200044', 'Tutill', 44),
('Davita', 'I2200045', 'Van der Brug', 45),
('Osgood', 'I2200046', 'Sherry', 46),
('Aile', 'I2200047', 'Willingam', 47),
('Daphene', 'I2200048', 'Darke', 48),
('Boonie', 'I2200049', 'Todman', 49),
('Bink', 'I2200050', 'Charker', 50),
('Letizia', 'I2200051', 'Blaza', 51),
('Joya', 'I2200052', 'Himsworth', 52),
('Antonius', 'I2200053', 'Lyttle', 53),
('Hodge', 'I2200054', 'Andrzejczak', 54),
('Ozzie', 'I2200055', 'Werny', 55),
('Orsa', 'I2200056', 'Bigham', 56),
('Lebbie', 'I2200057', 'Sibborn', 57),
('Gerald', 'I2200058', 'Chattoe', 58),
('Enoch', 'I2200059', 'O\' Reagan', 59),
('Norah', 'I2200060', 'Avarne', 60),
('Howie', 'I2200061', 'Wishart', 61),
('Nestor', 'I2200062', 'Falls', 62),
('Merrielle', 'I2200063', 'Teaze', 63),
('Teodoor', 'I2200064', 'Rushsorth', 64),
('Llywellyn', 'I2200065', 'Sherar', 65),
('Germaine', 'I2200066', 'Pearle', 66),
('Katusha', 'I2200067', 'Dotson', 67),
('Rosalinda', 'I2200068', 'Welsh', 68),
('Marieann', 'I2200069', 'Laurisch', 69),
('Jeno', 'I2200070', 'Oblein', 70),
('Sybilla', 'I2200071', 'Palia', 71),
('Alfy', 'I2200072', 'Van Halen', 72),
('Ive', 'I2200073', 'Addeycott', 73),
('Eveline', 'I2200074', 'Ardron', 74),
('Natalee', 'I2200075', 'Leaney', 75),
('Sonja', 'I2200076', 'Piotrkowski', 76),
('Etti', 'I2200077', 'Pape', 77),
('Jerri', 'I2200078', 'Brolechan', 78),
('Angel', 'I2200079', 'Pogue', 79),
('Tremaine', 'I2200080', 'Hierro', 80),
('Shell', 'I2200081', 'Thickins', 81),
('Hamnet', 'I2200082', 'Dougill', 82),
('Solly', 'I2200083', 'Leveret', 83),
('Claiborne', 'I2200084', 'Fowley', 84),
('Ronny', 'I2200085', 'Philips', 85),
('Wyn', 'I2200086', 'Feitosa', 86),
('Randee', 'I2200087', 'Luckcock', 87),
('Yanaton', 'I2200088', 'Oxterby', 88),
('Brina', 'I2200089', 'Fewtrell', 89),
('George', 'I2200090', 'Eve', 90),
('Worth', 'I2200091', 'Muttock', 91),
('Ninnetta', 'I2200092', 'Pullman', 92),
('Kevan', 'I2200093', 'Amaya', 93),
('Darill', 'I2200094', 'Reany', 94),
('Melicent', 'I2200095', 'Fossord', 95),
('Denna', 'I2200096', 'Lambis', 96),
('Cortney', 'I2200097', 'Sturdy', 97),
('Alessandra', 'I2200098', 'Kilfedder', 98),
('Aluino', 'I2200099', 'Benedito', 99),
('Genovera', 'I2200100', 'MacAulay', 100),
('Jakub', 'I2200618', 'Antonín', 119),
('Barbora', 'I2200259', 'Čtvrtečková', 120),
('Štěpán', 'I2100577', 'Fojtík', 121),
('Lukáš', 'I2200646', 'Goldšmíd', 122),
('Viktor', 'I2200667', 'Janda', 123),
('Filip', 'I2100221', 'Klasna', 124),
('David', 'I2200678', 'Koníř', 125),
('Martin', 'I2200691', 'Ladra', 126),
('Max Matěj', 'I2200705', 'Nemanský', 127),
('Nela', 'I2100530', 'Netková', 128),
('Jan', 'I2200714', 'Pchálek', 129),
('Jan', 'I2200734', 'Rýdl', 130),
('Vilém', 'I2200736', 'Říčan', 131),
('Jiří', 'I2200746', 'Strnad', 132),
('David', 'I2200756', 'Špringer', 133),
('Daniel', 'I2200757', 'Šulc', 134),
('Jiří', 'I2200767', 'Vlk', 135);

-- --------------------------------------------------------

--
-- Struktura tabulky `tstudentsscheduleactions`
--

CREATE TABLE `tstudentsscheduleactions` (
  `tStudentsScheduleActionsID` int(11) NOT NULL,
  `tStudentID` int(11) NOT NULL,
  `tScheduleActionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tstudentsscheduleactions`
--

INSERT INTO `tstudentsscheduleactions` (`tStudentsScheduleActionsID`, `tStudentID`, `tScheduleActionID`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 11, 1),
(12, 12, 2),
(13, 13, 3),
(14, 14, 4),
(15, 15, 5),
(16, 16, 6),
(17, 17, 7),
(18, 18, 8),
(19, 19, 9),
(20, 20, 10),
(21, 21, 1),
(22, 22, 2),
(23, 23, 3),
(24, 24, 4),
(25, 25, 5),
(26, 26, 6),
(27, 27, 7),
(28, 28, 8),
(29, 29, 9),
(30, 30, 10),
(31, 31, 1),
(32, 32, 2),
(33, 33, 3),
(34, 34, 4),
(35, 35, 5),
(36, 36, 6),
(37, 37, 7),
(38, 38, 8),
(39, 39, 9),
(40, 40, 10),
(41, 41, 1),
(42, 42, 2),
(43, 43, 3),
(44, 44, 4),
(45, 45, 5),
(46, 46, 6),
(47, 47, 7),
(48, 48, 8),
(49, 49, 9),
(50, 50, 10),
(51, 51, 1),
(52, 52, 2),
(53, 53, 3),
(54, 54, 4),
(55, 55, 5),
(56, 56, 6),
(57, 57, 7),
(58, 58, 8),
(59, 59, 9),
(60, 60, 10),
(61, 61, 1),
(62, 62, 2),
(63, 63, 3),
(64, 64, 4),
(65, 65, 5),
(66, 66, 6),
(67, 67, 7),
(68, 68, 8),
(69, 69, 9),
(70, 70, 10),
(71, 71, 1),
(72, 72, 2),
(73, 73, 3),
(74, 74, 4),
(75, 75, 5),
(76, 76, 6),
(77, 77, 7),
(78, 78, 8),
(79, 79, 9),
(80, 80, 10),
(81, 81, 1),
(82, 82, 2),
(83, 83, 3),
(84, 84, 4),
(85, 85, 5),
(86, 86, 6),
(87, 87, 7),
(88, 88, 8),
(89, 89, 9),
(90, 90, 10),
(91, 91, 1),
(92, 92, 2),
(93, 93, 3),
(94, 94, 4),
(95, 95, 5),
(96, 96, 6),
(97, 97, 7),
(98, 98, 8),
(99, 99, 9),
(100, 100, 10),
(118, 119, 21),
(119, 120, 21),
(120, 121, 21),
(121, 122, 21),
(122, 123, 21),
(123, 124, 21),
(124, 125, 21),
(125, 126, 21),
(126, 127, 21),
(127, 128, 21),
(128, 129, 21),
(129, 130, 21),
(130, 131, 21),
(131, 132, 21),
(132, 133, 21),
(133, 134, 21),
(134, 135, 21),
(135, 119, 24),
(136, 120, 24),
(137, 121, 24),
(138, 122, 24),
(139, 123, 24),
(140, 124, 24),
(141, 125, 24),
(142, 126, 24),
(143, 127, 24),
(144, 128, 24),
(145, 129, 24),
(146, 130, 24),
(147, 131, 24),
(148, 132, 24),
(149, 133, 24),
(150, 134, 24),
(151, 135, 24),
(152, 119, 25),
(153, 120, 25),
(154, 121, 25),
(155, 122, 25),
(156, 123, 25),
(157, 124, 25),
(158, 125, 25),
(159, 126, 25),
(160, 127, 25),
(161, 128, 25),
(162, 129, 25),
(163, 130, 25),
(164, 131, 25),
(165, 132, 25),
(166, 133, 25),
(167, 134, 25),
(168, 135, 25),
(169, 119, 26),
(170, 120, 26),
(171, 121, 26),
(172, 122, 26),
(173, 123, 26),
(174, 124, 26),
(175, 125, 26),
(176, 126, 26),
(177, 127, 26),
(178, 128, 26),
(179, 129, 26),
(180, 130, 26),
(181, 131, 26),
(182, 132, 26),
(183, 133, 26),
(184, 134, 26),
(185, 135, 26),
(186, 119, 27),
(187, 120, 27),
(188, 121, 27),
(189, 122, 27),
(190, 123, 27),
(191, 124, 27),
(192, 125, 27),
(193, 126, 27),
(194, 127, 27),
(195, 128, 27),
(196, 129, 27),
(197, 130, 27),
(198, 131, 27),
(199, 132, 27),
(200, 133, 27),
(201, 134, 27),
(202, 135, 27),
(203, 119, 28),
(204, 120, 28),
(205, 121, 28),
(206, 122, 28),
(207, 123, 28),
(208, 124, 28),
(209, 125, 28),
(210, 126, 28),
(211, 127, 28),
(212, 128, 28),
(213, 129, 28),
(214, 130, 28),
(215, 131, 28),
(216, 132, 28),
(217, 133, 28),
(218, 134, 28),
(219, 135, 28),
(220, 119, 29),
(221, 120, 29),
(222, 121, 29),
(223, 122, 29),
(224, 123, 29),
(225, 124, 29),
(226, 125, 29),
(227, 126, 29),
(228, 127, 29),
(229, 128, 29),
(230, 129, 29),
(231, 130, 29),
(232, 131, 29),
(233, 132, 29),
(234, 133, 29),
(235, 134, 29),
(236, 135, 29),
(237, 119, 30),
(238, 120, 30),
(239, 121, 30),
(240, 122, 30),
(241, 123, 30),
(242, 124, 30),
(243, 125, 30),
(244, 126, 30),
(245, 127, 30),
(246, 128, 30),
(247, 129, 30),
(248, 130, 30),
(249, 131, 30),
(250, 132, 30),
(251, 133, 30),
(252, 134, 30),
(253, 135, 30),
(254, 119, 31),
(255, 120, 31),
(256, 121, 31),
(257, 122, 31),
(258, 123, 31),
(259, 124, 31),
(260, 125, 31),
(261, 126, 31),
(262, 127, 31),
(263, 128, 31),
(264, 129, 31),
(265, 130, 31),
(266, 131, 31),
(267, 132, 31),
(268, 133, 31),
(269, 134, 31),
(270, 135, 31),
(271, 119, 32),
(272, 120, 32),
(273, 121, 32),
(274, 122, 32),
(275, 123, 32),
(276, 124, 32),
(277, 125, 32),
(278, 126, 32),
(279, 127, 32),
(280, 128, 32),
(281, 129, 32),
(282, 130, 32),
(283, 131, 32),
(284, 132, 32),
(285, 133, 32),
(286, 134, 32),
(287, 135, 32),
(288, 119, 33),
(289, 120, 33),
(290, 121, 33),
(291, 122, 33),
(292, 123, 33),
(293, 124, 33),
(294, 125, 33),
(295, 126, 33),
(296, 127, 33),
(297, 128, 33),
(298, 129, 33),
(299, 130, 33),
(300, 131, 33),
(301, 132, 33),
(302, 133, 33),
(303, 134, 33),
(304, 135, 33),
(322, 119, 35),
(323, 120, 35),
(324, 121, 35),
(325, 122, 35),
(326, 123, 35),
(327, 124, 35),
(328, 125, 35),
(329, 126, 35),
(330, 127, 35),
(331, 128, 35),
(332, 129, 35),
(333, 130, 35),
(334, 131, 35),
(335, 132, 35),
(336, 133, 35),
(337, 134, 35),
(338, 135, 35),
(339, 119, 36),
(340, 120, 36),
(341, 121, 36),
(342, 122, 36),
(343, 123, 36),
(344, 124, 36),
(345, 125, 36),
(346, 126, 36),
(347, 127, 36),
(348, 128, 36),
(349, 129, 36),
(350, 130, 36),
(351, 131, 36),
(352, 132, 36),
(353, 133, 36),
(354, 134, 36),
(355, 135, 36),
(356, 119, 37),
(357, 120, 37),
(358, 121, 37),
(359, 122, 37),
(360, 123, 37),
(361, 124, 37),
(362, 125, 37),
(363, 126, 37),
(364, 127, 37),
(365, 128, 37),
(366, 129, 37),
(367, 130, 37),
(368, 131, 37),
(369, 132, 37),
(370, 133, 37),
(371, 134, 37),
(372, 135, 37),
(730, 119, 59),
(731, 120, 59),
(732, 121, 59),
(733, 122, 59),
(734, 123, 59),
(735, 124, 59),
(736, 125, 59),
(737, 126, 59),
(738, 127, 59),
(739, 128, 59),
(740, 129, 59),
(741, 130, 59),
(742, 131, 59),
(743, 132, 59),
(744, 133, 59),
(745, 134, 59),
(746, 135, 59),
(747, 119, 60),
(748, 120, 60),
(749, 121, 60),
(750, 122, 60),
(751, 123, 60),
(752, 124, 60),
(753, 125, 60),
(754, 126, 60),
(755, 127, 60),
(756, 128, 60),
(757, 129, 60),
(758, 130, 60),
(759, 131, 60),
(760, 132, 60),
(761, 133, 60),
(762, 134, 60),
(763, 135, 60);

-- --------------------------------------------------------

--
-- Struktura tabulky `tsubject`
--

CREATE TABLE `tsubject` (
  `name` varchar(100) NOT NULL,
  `tSubjectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tsubject`
--

INSERT INTO `tsubject` (`name`, `tSubjectID`) VALUES
('Pravděpodobnost a statistika', 1),
('Objektové modelování', 2),
('Psychologie', 3),
('Databázové systémy', 12),
('Matematika', 13),
('Databázové systémy', 14),
('Fyz', 15);

-- --------------------------------------------------------

--
-- Struktura tabulky `tteacher`
--

CREATE TABLE `tteacher` (
  `firstname` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `tTeacherID` int(11) NOT NULL,
  `tLoginID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tteacher`
--

INSERT INTO `tteacher` (`firstname`, `surname`, `tTeacherID`, `tLoginID`) VALUES
('Rica', 'Giff', 1, 1),
('Václav', 'Štok', 7, 166);

-- --------------------------------------------------------

--
-- Struktura tabulky `tteacherssubjects`
--

CREATE TABLE `tteacherssubjects` (
  `tTeachersSubjectsID` int(11) NOT NULL,
  `tSubjectID` int(11) NOT NULL,
  `tTeacherID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tteacherssubjects`
--

INSERT INTO `tteacherssubjects` (`tTeachersSubjectsID`, `tSubjectID`, `tTeacherID`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 12, 1),
(5, 13, 7),
(6, 14, 7),
(7, 15, 7);

-- --------------------------------------------------------

--
-- Struktura tabulky `ttoken`
--

CREATE TABLE `ttoken` (
  `token` varchar(40) NOT NULL,
  `expiresAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `tTokenID` int(11) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura pro pohled `absenceinfo`
--
DROP TABLE IF EXISTS `absenceinfo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `absenceinfo`  AS SELECT `a`.`tAttendanceID` AS `tAttendanceID`, `a`.`tScheduleActionID` AS `scheduleActionID`, `s`.`firstname` AS `firstname`, `s`.`surname` AS `surname`, `a`.`isPresent` AS `isPresent`, `a`.`isExcused` AS `isExcused`, `te`.`name` AS `absencetype`, `a`.`tAbsenceTypeID` AS `tAbsenceTypeID` FROM ((`tattendance` `a` left join `tstudent` `s` on(`a`.`tStudentID` = `s`.`tStudentID`)) left join `tabsencetype` `te` on(`a`.`tAbsenceTypeID` = `te`.`tAbsenceTypeID`))  ;

-- --------------------------------------------------------

--
-- Struktura pro pohled `scheduleactioninfo`
--
DROP TABLE IF EXISTS `scheduleactioninfo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `scheduleactioninfo`  AS SELECT `sa`.`tScheduleActionID` AS `tScheduleActionID`, `sa`.`tTeacherID` AS `tTeacherID`, `sa`.`date` AS `date`, `ts`.`name` AS `subjectName`, `sat`.`type` AS `type`, count(`tssa`.`tStudentsScheduleActionsID`) AS `studentCount` FROM (((`tscheduleaction` `sa` join `tsubject` `ts` on(`sa`.`tSubjectID` = `ts`.`tSubjectID`)) join `tscheduleactiontype` `sat` on(`sa`.`tScheduleActionTypeID` = `sat`.`tScheduleActionType`)) left join `tstudentsscheduleactions` `tssa` on(`sa`.`tScheduleActionID` = `tssa`.`tScheduleActionID`)) GROUP BY `sa`.`tScheduleActionID``tScheduleActionID`  ;

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `tabsencetype`
--
ALTER TABLE `tabsencetype`
  ADD PRIMARY KEY (`tAbsenceTypeID`);

--
-- Indexy pro tabulku `tattendance`
--
ALTER TABLE `tattendance`
  ADD PRIMARY KEY (`tAttendanceID`),
  ADD KEY `FK_tAttendance_TtAbsenceType` (`tAbsenceTypeID`),
  ADD KEY `FK_tAttendance_tStudent` (`tStudentID`),
  ADD KEY `FK_tAttendance_tScheduleAction` (`tScheduleActionID`);

--
-- Indexy pro tabulku `tenrolledstudents`
--
ALTER TABLE `tenrolledstudents`
  ADD PRIMARY KEY (`tEnrolledStudentsID`),
  ADD KEY `FK_tEnrolledStudents_tStudent` (`tStudentID`),
  ADD KEY `FK_tEnrolledStudents_tSubject` (`tSubjectID`);

--
-- Indexy pro tabulku `tlogin`
--
ALTER TABLE `tlogin`
  ADD PRIMARY KEY (`tLoginID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexy pro tabulku `tscheduleaction`
--
ALTER TABLE `tscheduleaction`
  ADD PRIMARY KEY (`tScheduleActionID`),
  ADD KEY `FK_tScheduleAction_tTeacher` (`tTeacherID`),
  ADD KEY `FK_tScheduleAction_tSubject` (`tSubjectID`),
  ADD KEY `FK_tScheduleAction_tScheduleActionType` (`tScheduleActionTypeID`);

--
-- Indexy pro tabulku `tscheduleactiontype`
--
ALTER TABLE `tscheduleactiontype`
  ADD PRIMARY KEY (`tScheduleActionType`);

--
-- Indexy pro tabulku `tstudent`
--
ALTER TABLE `tstudent`
  ADD PRIMARY KEY (`tStudentID`),
  ADD UNIQUE KEY `userName` (`personalNum`);

--
-- Indexy pro tabulku `tstudentsscheduleactions`
--
ALTER TABLE `tstudentsscheduleactions`
  ADD PRIMARY KEY (`tStudentsScheduleActionsID`),
  ADD KEY `FK_tStudentsScheduleActions_tStudent` (`tStudentID`),
  ADD KEY `FK_tStudentsScheduleActions_tScheduleAction` (`tScheduleActionID`);

--
-- Indexy pro tabulku `tsubject`
--
ALTER TABLE `tsubject`
  ADD PRIMARY KEY (`tSubjectID`);

--
-- Indexy pro tabulku `tteacher`
--
ALTER TABLE `tteacher`
  ADD PRIMARY KEY (`tTeacherID`),
  ADD UNIQUE KEY `tLoginID` (`tLoginID`);

--
-- Indexy pro tabulku `tteacherssubjects`
--
ALTER TABLE `tteacherssubjects`
  ADD PRIMARY KEY (`tTeachersSubjectsID`),
  ADD KEY `FK_Tteacherssubjects_Tsubject` (`tSubjectID`),
  ADD KEY `FK_Tteacherssubjects_Tteacher` (`tTeacherID`);

--
-- Indexy pro tabulku `ttoken`
--
ALTER TABLE `ttoken`
  ADD PRIMARY KEY (`tTokenID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `tabsencetype`
--
ALTER TABLE `tabsencetype`
  MODIFY `tAbsenceTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `tattendance`
--
ALTER TABLE `tattendance`
  MODIFY `tAttendanceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1461;

--
-- AUTO_INCREMENT pro tabulku `tenrolledstudents`
--
ALTER TABLE `tenrolledstudents`
  MODIFY `tEnrolledStudentsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=357;

--
-- AUTO_INCREMENT pro tabulku `tlogin`
--
ALTER TABLE `tlogin`
  MODIFY `tLoginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT pro tabulku `tscheduleaction`
--
ALTER TABLE `tscheduleaction`
  MODIFY `tScheduleActionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT pro tabulku `tscheduleactiontype`
--
ALTER TABLE `tscheduleactiontype`
  MODIFY `tScheduleActionType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pro tabulku `tstudent`
--
ALTER TABLE `tstudent`
  MODIFY `tStudentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT pro tabulku `tstudentsscheduleactions`
--
ALTER TABLE `tstudentsscheduleactions`
  MODIFY `tStudentsScheduleActionsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1461;

--
-- AUTO_INCREMENT pro tabulku `tsubject`
--
ALTER TABLE `tsubject`
  MODIFY `tSubjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pro tabulku `tteacher`
--
ALTER TABLE `tteacher`
  MODIFY `tTeacherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pro tabulku `tteacherssubjects`
--
ALTER TABLE `tteacherssubjects`
  MODIFY `tTeachersSubjectsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pro tabulku `ttoken`
--
ALTER TABLE `ttoken`
  MODIFY `tTokenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `tattendance`
--
ALTER TABLE `tattendance`
  ADD CONSTRAINT `FK_tAttendance_TtAbsenceType` FOREIGN KEY (`tAbsenceTypeID`) REFERENCES `tabsencetype` (`tAbsenceTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tAttendance_tScheduleAction` FOREIGN KEY (`tScheduleActionID`) REFERENCES `tscheduleaction` (`tScheduleActionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tAttendance_tStudent` FOREIGN KEY (`tStudentID`) REFERENCES `tstudent` (`tStudentID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tenrolledstudents`
--
ALTER TABLE `tenrolledstudents`
  ADD CONSTRAINT `FK_tEnrolledStudents_tStudent` FOREIGN KEY (`tStudentID`) REFERENCES `tstudent` (`tStudentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tEnrolledStudents_tSubject` FOREIGN KEY (`tSubjectID`) REFERENCES `tsubject` (`tSubjectID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tscheduleaction`
--
ALTER TABLE `tscheduleaction`
  ADD CONSTRAINT `FK_tScheduleAction_tScheduleActionType` FOREIGN KEY (`tScheduleActionTypeID`) REFERENCES `tscheduleactiontype` (`tScheduleActionType`),
  ADD CONSTRAINT `FK_tScheduleAction_tSubject` FOREIGN KEY (`tSubjectID`) REFERENCES `tsubject` (`tSubjectID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tScheduleAction_tTeacher` FOREIGN KEY (`tTeacherID`) REFERENCES `tteacher` (`tTeacherID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tstudentsscheduleactions`
--
ALTER TABLE `tstudentsscheduleactions`
  ADD CONSTRAINT `FK_tStudentsScheduleActions_tScheduleAction` FOREIGN KEY (`tScheduleActionID`) REFERENCES `tscheduleaction` (`tScheduleActionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tStudentsScheduleActions_tStudent` FOREIGN KEY (`tStudentID`) REFERENCES `tstudent` (`tStudentID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tteacher`
--
ALTER TABLE `tteacher`
  ADD CONSTRAINT `FK_tTeacher_tLogin` FOREIGN KEY (`tLoginID`) REFERENCES `tlogin` (`tLoginID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tteacherssubjects`
--
ALTER TABLE `tteacherssubjects`
  ADD CONSTRAINT `FK_Tteacherssubjects_Tsubject` FOREIGN KEY (`tSubjectID`) REFERENCES `tsubject` (`tSubjectID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_Tteacherssubjects_Tteacher` FOREIGN KEY (`tTeacherID`) REFERENCES `tteacher` (`tTeacherID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `ttoken`
--
ALTER TABLE `ttoken`
  ADD CONSTRAINT `fk_ttoken_tlogin` FOREIGN KEY (`email`) REFERENCES `tlogin` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
