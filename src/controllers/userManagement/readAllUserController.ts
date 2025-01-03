import { Request, Response, NextFunction } from "express";
import readAllUserService from "../../services/userManagement/readAllUserService.js";
import { PaginationParams } from "../../models/pagination.js";
import { ValidationError } from "../../utils/customError.js";

const readAllUserController= async (
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response,
  next: NextFunction
):Promise<any> => {
  try {
    const page:number= parseInt(req.query.page || "1", 10); 
    const limit:number= 10;

    if (isNaN(page) || isNaN(limit) || page <=0 || limit <= 0) {
      throw new ValidationError("Query page dan limit harus berupa angka dan lebih besar dari 0.");
    }

    const users= await readAllUserService(page, limit);
    res.status(200).json({
      status: "true",
      message: "Data user berhasil didapatkan.",
      payload: users,
    })
  } catch(err) {
    next(err);
  }
}

export default readAllUserController;