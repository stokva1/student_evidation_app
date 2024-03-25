SELECT
  `sa`.`tScheduleActionID` AS `tScheduleActionID`,
  `sa`.`tTeacherID` AS `tTeacherID`,
  `sa`.`date` AS `date`,
  `ts`.`name` AS `subjectName`,
  `sat`.`type` AS `type`,
  count(`tssa`.`tStudentsScheduleActionsID`) AS `studentCount`
FROM
  (
    (
      (
        `student_evidation`.`tscheduleaction` `sa`
        JOIN `student_evidation`.`tsubject` `ts` ON(`sa`.`tSubjectID` = `ts`.`tSubjectID`)
      )
      JOIN `student_evidation`.`tscheduleactiontype` `sat` ON(
        `sa`.`tScheduleActionTypeID` = `sat`.`tScheduleActionType`
      )
    )
    LEFT JOIN `student_evidation`.`tstudentsscheduleactions` `tssa` ON(
      `sa`.`tScheduleActionID` = `tssa`.`tScheduleActionID`
    )
  )
GROUP BY
  `sa`.`tScheduleActionID`