import { RequestHandler, Router } from "express";
import { getAppeal, getLastTenDaysAppeals, getNextTenDaysAppeals } from "../controller/appeals_tg";
const appealRouter:Router = Router()

appealRouter.get('/get_messages', getAppeal as RequestHandler)
appealRouter.get('/get_L10_days_messages', getLastTenDaysAppeals as RequestHandler)
appealRouter.get('/get_N10_days_messages', getNextTenDaysAppeals as RequestHandler)

export default appealRouter