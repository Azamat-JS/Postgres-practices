import { NextFunction, Request, Response } from "express";
import { Group } from "../config/database";
import { IAddGroupDto } from "../dto/add_dto";
import { IUpdateGroupDto } from "../dto/update_dto";


export class GroupsManager {
 static async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { subject, days, time, teacher_name, teacher_phone } =
        req.body as IAddGroupDto;
      const newGroup = await Group.create({
        subject,
        days,
        time,
        teacher_name,
        teacher_phone,
      });
      res.status(201).json(newGroup);
    } catch (error) {
      next(error);
    }
  }

  static async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await Group.findAll();
      if (!groups) {
        return next(res.status(404).json({ msg: "Groups not found" }));
      }
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }

  static async getOneGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await Group.findByPk(+req.params.id as number);
      if (!group) {
        return next(res.status(404).json({ msg: "Group not found" }));
      }
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  }

  static async updateGroup(req: Request, res: Response, next: NextFunction){
    try {
        const { subject, days, time, teacher_name, teacher_phone } =
        req.body as IUpdateGroupDto;
        const group = await Group.findByPk(+req.params.id as number);
        if (!group) {
          return next(res.status(404).json({ msg: "Group not found" }));
        }
        group.update({ subject, days, time, teacher_name, teacher_phone })
        res.status(200).json(group)
    } catch (error) {
        next(error)
    }
  }

  static async deleteGroup(req: Request, res: Response, next: NextFunction){
    try {
        const group = await Group.findByPk(+req.params.id as number)
        if (!group) {
            return next(res.status(404).json({ msg: "Group not found" }));
          }
          await Group.destroy({where: {id: +req.params.id as number}})
    } catch (error) {
        
    }
  }
}
