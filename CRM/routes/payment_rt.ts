import { RequestHandler, Router } from "express";
const paymentRouter:Router = Router()
import { PaymentManager } from "../controller/payment_ctr";
const paymentManage = new PaymentManager()

paymentRouter.post('/', paymentManage.addPayment as RequestHandler)
paymentRouter.get('/', paymentManage.getAllPayments as RequestHandler)
paymentRouter.get('/:id', paymentManage.getOnePayment as RequestHandler)
paymentRouter.put('/:id', paymentManage.updatePayment as RequestHandler)
paymentRouter.delete('/:id', paymentManage.deletePayment as RequestHandler)

export default paymentRouter