import { NextFunction, Request, Response } from "express";
import { Student } from "../config/database";
import { IAddStudentDto } from "../dto/add_dto";
import { IUpdateStudentDto } from "../dto/update_dto";


const addStudent = async (req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
    try {
        const {student_name, student_phone, subject, parents_name, parents_phone} = req.body as IAddStudentDto;
        
        const student = await Student.create({student_name, student_phone, subject, parents_name, parents_phone})
        
       return res.status(201).json(student)
        
    } catch (error:any) {
        next(error)
    }
}

const getAllStudents = async (req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
try {
    const students = await Student.findAll()
    if(!students){
        return next(res.status(404).json({msg: 'Students not found'}))
    }
   return res.status(200).json(students)
} catch (error:any) {
    next(error)
}
}


const getOneStudent = async (req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
try {
    const student = await Student.findByPk(+req.params.id as number)
    if(!student){
        return next(res.status(404).json({msg: 'Student not found'}))
    }
   return res.status(200).json(student)
} catch (error:any) {
    next(error)
}
}
const updateStudent = async (req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
try {
    const {student_name, student_phone, subject, parents_name, parents_phone} = req.body as IUpdateStudentDto;

    const student = await Student.findByPk(+req.params.id as number)
    if(!student){
        return next(res.status(404).json({msg: 'Student not found'}))
    }
    student.update({student_name, student_phone, subject, parents_name, parents_phone})
   return res.status(200).json(student)
} catch (error:any) {
    next(error)
}
}
const deleteStudent = async (req:Request, res:Response, next:NextFunction):Promise<Response | void> => {
try {
    const student = await Student.findByPk(+req.params.id as number)
    if(!student){
        return next(res.status(404).json({msg: 'Student not found'}))
    }
      await Student.destroy({where: {id: +req.params.id as number}})
   return res.status(200).json({msg:"Student deleted successfully"})
} catch (error:any) {
    next(error)
}
}





export {
getAllStudents,
addStudent,
getOneStudent,
updateStudent,
deleteStudent
}