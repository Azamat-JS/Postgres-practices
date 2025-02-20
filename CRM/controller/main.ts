import { Response, Request, NextFunction } from "express";
import { Student, Group } from "../config/database";
import { group } from "console";


export const getStatistics = async(req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
  try {
    const students = await Student.count()
    const groups = await Group.count()

    res.status(200).json({students:students, groups: groups})
  } catch (error) {
    next(error)
  }

}