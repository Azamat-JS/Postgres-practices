import { Router, RequestHandler } from "express";
import { GroupsManager } from "../controller/group_ctr";
const groupRouter:Router = Router()


groupRouter.post('/', GroupsManager.createGroup as RequestHandler)
groupRouter.get('/', GroupsManager.getAllGroups as RequestHandler)
groupRouter.get('/:id', GroupsManager.getOneGroup as RequestHandler)
groupRouter.put('/:id', GroupsManager.updateGroup as RequestHandler)
groupRouter.delete('/:id', GroupsManager.deleteGroup as RequestHandler)

export default groupRouter;