import { getStatistics } from "../controller/main";
import { RequestHandler, Router } from "express";
const mainRouter = Router()

mainRouter.get('/', getStatistics as RequestHandler)

export default mainRouter