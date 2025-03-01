import { RequestHandler, Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getMonthlyStatistics, getOneStudent, leftStudent, search, updateStudent } from "../controller/student_ctr";
const studentRouter:Router = Router()

studentRouter.post('/', addStudent as RequestHandler)
studentRouter.get('/', getAllStudents as RequestHandler)
studentRouter.get('/statistics', getMonthlyStatistics as RequestHandler)
studentRouter.get('/search_student', search as RequestHandler)
studentRouter.get('/:id', getOneStudent as RequestHandler)
studentRouter.put('/:id', updateStudent as RequestHandler)
studentRouter.put('/:id/leave', leftStudent as RequestHandler)
studentRouter.delete('/:id', deleteStudent as RequestHandler)


export default studentRouter
