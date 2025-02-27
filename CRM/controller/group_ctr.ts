import { NextFunction, Request, Response } from "express";
import { Group } from "../models/group_model";
import { IAddGroupDto } from "../dto/add_dto";
import { IUpdateGroupDto } from "../dto/update_dto";
import { Op } from "sequelize";

export class GroupsManager {
  static async createGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
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
      return res.status(201).json(newGroup);
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

      if (endIndex < groups.length) {
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

      results.totalPages = Math.ceil(groups.length / limit);
      results.items = groups.slice(startIndex, endIndex);

      return res.status(200).json(results);
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
      return res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  }

  static async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { subject, days, time, teacher_name, teacher_phone } =
        req.body as IUpdateGroupDto;
      const group = await Group.findByPk(+req.params.id as number);
      if (!group) {
        return next(res.status(404).json({ msg: "Group not found" }));
      }
      group.update({ subject, days, time, teacher_name, teacher_phone });
      return res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await Group.findByPk(+req.params.id as number);
      if (!group) {
        return next(res.status(404).json({ msg: "Group not found" }));
      }
      await Group.destroy({ where: { id: +req.params.id as number } });
      return res.status(200).json({ msg: "The group deleted successfully" });
    } catch (error) {}
  }

  static async search(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
    try {
      const subject = req.query.subject as string | undefined;
      if (!subject) {
        return res
          .status(400)
          .json({ msg: "Invalid or missing subject parameter." });
      }

      const searchedSubject = await Group.findAll({
        where: {
          subject: {
            [Op.iLike]: `%${subject}%`,
          },
        },
      });

      if(!searchedSubject){
        return res.status(404).json({msg: "Subject not found"})
      }

      return res.status(200).json(searchedSubject)
    } catch (error) {
      next(error);
    }
  }
}
