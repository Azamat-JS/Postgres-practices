import { NextFunction, Request, Response } from "express";
import { Student } from "../models/student_model";
import { DropOutList } from "../models/drop_out_pupils";
import { IAddStudentDto } from "../dto/add_dto";
import { IUpdateStudentDto } from "../dto/update_dto";
import { Op } from "sequelize";

const addStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const {
            student_name,
            student_phone,
            subject,
            parents_name,
            parents_phone,
        } = req.body as IAddStudentDto;

        const student = await Student.create({
            student_name,
            student_phone,
            subject,
            parents_name,
            parents_phone,
        });

        return res.status(201).json(student);
    } catch (error: any) {
        next(error);
    }
};

const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const students = await Student.findAll();
        if (!students) {
            return next(res.status(404).json({ msg: "Students not found" }));
        }
        const page: number = parseInt(req.query.page as any) || 1;
        const limit: number = parseInt(req.query.limit as any) || 10;

        let startIndex: number = (page - 1) * limit;
        let endIndex: number = page * limit;
        type Result = {
            next?: object;
            prev?: object;
            totalPages?: number;
            items?: object[];
        };

        let results: Result = {};

        if (endIndex < students.length) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit,
            };
        }

        results.totalPages = Math.ceil(students.length / limit);
        results.items = students.slice(startIndex, endIndex);

        return res.status(200).json(results);
    } catch (error: any) {
        next(error);
    }
};

const getOneStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const student = await Student.findByPk(+req.params.id as number);
        if (!student) {
            return next(res.status(404).json({ msg: "Student not found" }));
        }
        return res.status(200).json(student);
    } catch (error: any) {
        next(error);
    }
};
const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const {
            student_name,
            student_phone,
            subject,
            parents_name,
            parents_phone,
        } = req.body as IUpdateStudentDto;

        const student = await Student.findByPk(+req.params.id as number);
        if (!student) {
            return next(res.status(404).json({ msg: "Student not found" }));
        }
        student.update({
            student_name,
            student_phone,
            subject,
            parents_name,
            parents_phone,
        });
        return res.status(200).json(student);
    } catch (error: any) {
        next(error);
    }
};

const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const student = await Student.findByPk(+req.params.id);
        if (!student) {
            return next(res.status(404).json({ msg: "Student not found" }));
        }
        
        await DropOutList.create({
         student_name: student.student_name, 
         student_phone: student.student_phone
     })
     console.log("Saving to DropOutList:", student.student_name, student.student_phone);


     const deletedRows = await Student.destroy({ where: { id: +req.params.id } });
     if (deletedRows === 0) {
         return res.status(500).json({ msg: "Failed to delete student" });
     }
     console.log("Deleted Rows:", deletedRows);

        return res.status(200).json({ msg: "Student deleted successfully" });

    } catch (error: any) {
        next(error);
    }
};

const search = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const  student_name  = req.query?.student_name as string | undefined;
        if (!student_name) {
            return res
                .status(400)
                .json({ msg: "Invalid or missing student_name parameter." });
        }
        const searchedStudent = await Student.findOne({
            where: {
                student_name: {
                    [Op.iLike]: `%${student_name}%`,
                },
            },
        });

        if (!searchedStudent) {
            return res.status(404).json({ msg: "Student not found." });
        }
        

        return res.status(200).json(searchedStudent)
    } catch (error) {
        next(error);
    }
};

export {
    getAllStudents,
    addStudent,
    getOneStudent,
    updateStudent,
    deleteStudent,
    search,
};
