import { NextFunction, Request, Response } from "express";
import { Payments } from "../models/payment_model";
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
        const page:number = parseInt(req.query.page as any) || 1
        const limit:number = parseInt(req.query.limit as any) || 10
    
        let startIndex:number = (page - 1) * limit;
        let endIndex:number = page * limit;
        type Result = {
            next?:object;
            prev?:object;
            totalPages?:number;
            items?: object[]
        }
    
        let results:Result = {}
    
        if(endIndex < payments.length){
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
    
        if(startIndex > 0){
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }
    
        results.totalPages = Math.ceil(payments.length / limit)
        results.items = payments.slice(startIndex, endIndex)
    
       return res.status(200).json(results)
        
    } catch (error) {
        next(error)
    }
  }

  async getOnePayment(req:Request, res:Response, next:NextFunction):Promise<Response |void>{
    try {
        const payment = await Payments.findByPk(+req.params.id as number)
        if(!payment){
            return next(res.status(404).json({msg: 'Payment not found'}))
        }
        return res.status(200).json(payment)
    } catch (error) {
        next(error)
    }
  }

  async updatePayment(req:Request, res:Response, next:NextFunction):Promise<Response |void>{
  try {
    const {student_name, student_phone, subject, teacher_name, date} = req.body as IUpdatePaymentDto;
    const payment = await Payments.findByPk(+req.params.id as number)
    if(!payment){
        return next(res.status(404).json({msg: 'Payment not found'}))
    }
    payment.update({student_name, student_phone, subject, teacher_name, date})

    return res.status(200).json(payment)
  } catch (error) {
    next(error)
  }
  }

  async deletePayment(req:Request, res:Response, next:NextFunction):Promise<Response |void>{
    try {
        const payment = await Payments.findByPk(+req.params.id as number)
        if(!payment){
            return next(res.status(404).json({msg: 'Payment not found'}))
        }
        await Payments.destroy({where: {id: +req.params.id as number}})
        return res.status(200).json({msg: 'Payment deleted successfully'})
    } catch (error) {
        next(error)
    }
  }
}
