import { Response, Request, NextFunction } from "express";
import { Student } from "../models/student_model";
import { Group } from "../models/group_model";


export const getStatistics = async(req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
  try {
    const students = await Student.count()
    const groups = await Group.count()

    res.status(200).json({students:students, groups: groups})
  } catch (error) {
    next(error)
  }

}