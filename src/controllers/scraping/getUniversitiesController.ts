import { Request, Response, NextFunction } from "express"
import getUniversitiesService from "../../services/scraping/universityScrapeService.js"

const getUniversitiesController= async(req: Request, res: Response, next: NextFunction) => {
  try {
    const universities= await getUniversitiesService();
    res.status(200).json({
      status: "true",
      message: "Data universitas berhasil diambil.",
      payload: universities
    })
  } catch(e:any) {
    next(e);
    console.log(e.message);
  }
}

export default getUniversitiesController;