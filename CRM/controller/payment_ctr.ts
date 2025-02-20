import { NextFunction, Request, Response } from "express";
import { Payments } from "../config/database";
import { IAddPaymentDto } from "../dto/add_dto";
import { IUpdatePaymentDto } from "../dto/update_dto";

export class PaymentManager {
  async addPayment(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
    try {
      const { student_name, student_phone, subject, teacher_name, date } =
        req.body as IAddPaymentDto;
      const newPayment = await Payments.create({
        student_name,
        student_phone,
        subject,
        teacher_name,
        date,
      });
      return res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  }

  async getAllPayments(req:Request, res:Response, next:NextFunction):Promise<Response | void>{
    try {
        const payments = await Payments.findAll()
        if(!payments){
            return next(res.status(404).json({msg: 'Payments not found'}))
        }
        return res.status(200).json(payments)
        
    } catch (error) {
        next(error)
    }
  }
}
