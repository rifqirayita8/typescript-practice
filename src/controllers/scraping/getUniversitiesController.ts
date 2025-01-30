import { Request, Response, NextFunction } from "express"
import getUniversitiesService from "../../services/scraping/universityScrapeService.js"

const getUniversitiesController= async(req: Request, res: Response, next: NextFunction) => {
  try {
    const universities= await getUniversitiesService();
    res.json(universities);
  } catch(e:any) {
    next(e);
    console.log(e.message);
  }
}

export default getUniversitiesController;