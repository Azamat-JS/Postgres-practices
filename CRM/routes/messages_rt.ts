import { RequestHandler, Router } from "express";
import { getMessage, getLastTenDaysMessages } from "../controller/telegram_ctr";
const messageRouter:Router = Router()

messageRouter.get('/get_messages', getMessage as RequestHandler)
messageRouter.get('/get_10days_messages', getLastTenDaysMessages as RequestHandler)

export default messageRouter