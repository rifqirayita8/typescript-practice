import { Request, Response, NextFunction } from "express";
import universityPddiktiService from "../../services/scraping/universityPddiktiService.js";

const universityPddiktiController= async(req: Request, res: Response, next: NextFunction) => {
  try {
    const univ= await universityPddiktiService();
    res.status(200).json({
      status: true,
      message: "Berhasil get universitas",
      jumlah_universitas: univ?.length,
      payload: univ
    })
  } catch(e) {
    next(e)
  }
}

export default universityPddiktiController;