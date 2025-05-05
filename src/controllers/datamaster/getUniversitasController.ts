import { Request, Response, NextFunction } from "express";
import getUniversitasService from "../../services/datamaster/datamasterService.js";

const getUniversitasController= async(req:Request, res:Response, next: NextFunction): Promise<void> => {
  try {
    const universitas= await getUniversitasService()
    res.status(200).json({
      status: "true",
      message: "Berhasil mendapatkan data universitas.",
      data: universitas
    });
  } catch(err) {
    next(err);
  }
}

export default getUniversitasController;