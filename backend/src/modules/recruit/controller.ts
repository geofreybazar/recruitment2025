import { Request, Response, NextFunction } from "express";
import service from "./service";

const addRecruit = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    const newRecruit = await service.addRecruitService(body);
    res.status(201).json(newRecruit);
  } catch (error) {
    next(error);
  }
};

const getRecuitsPerPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const recruits = await service.getRecuitsPerPageService(page, limit);
    res.status(201).json(recruits);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  addRecruit,
  getRecuitsPerPage,
};
