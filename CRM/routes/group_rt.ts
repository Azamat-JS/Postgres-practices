import { Router, RequestHandler } from "express";
import { GroupsManager } from "../controller/group_ctr";
const groupRouter:Router = Router()


groupRouter.post('/', GroupsManager.createGroup)
groupRouter.get('/', GroupsManager.getAllGroups)
groupRouter.get('/:id', GroupsManager.getOneGroup)
groupRouter.put('/:id', GroupsManager.updateGroup)
groupRouter.delete('/:id', GroupsManager.deleteGroup)

export default groupRouter;