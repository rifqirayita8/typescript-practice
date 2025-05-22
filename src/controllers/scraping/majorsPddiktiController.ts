import majorsPddiktiService from "../../services/scraping/majorsPddiktiService.js";
import { Request, Response, NextFunction } from "express";

const majorsPddiktiController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const univ= await majorsPddiktiService();
    res.status(200).json({
      status: true,
      message: "Berhasil get jurusan",
      jumlah_universitas: univ?.length,
      payload: univ
    })
  } catch(e) {
    next(e)
  }
}

export default majorsPddiktiController;