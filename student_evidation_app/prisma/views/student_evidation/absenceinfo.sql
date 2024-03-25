SELECT
  `a`.`tScheduleActionID` AS `scheduleActionID`,
  `s`.`firstname` AS `firstname`,
  `s`.`surname` AS `surname`,
  `a`.`isPresent` AS `isPresent`,
  `a`.`isExcused` AS `isExcused`,
  `te`.`name` AS `absencetype`
FROM
  (
    (
      `student_evidation`.`tattendance` `a`
      LEFT JOIN `student_evidation`.`tstudent` `s` ON(`a`.`tStudentID` = `s`.`tStudentID`)
    )
    LEFT JOIN `student_evidation`.`tabsencetype` `te` ON(`a`.`tAbsenceTypeID` = `te`.`tAbsenceTypeID`)
  )