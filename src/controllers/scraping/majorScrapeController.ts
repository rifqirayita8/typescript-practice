import majorScrapeService from "../../services/scraping/majorScrapeService.js";
import { Request, Response, NextFunction } from "express";

const majorScrapeController= async (req:Request, res:Response, next:NextFunction) => {
  
  try {
    let universitiesId= req.params.id;
    if (universitiesId.length > 1) {
      universitiesId= universitiesId.substring(1);
    }
    const url= `https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn=${universitiesId}`;
    // const urlPolytechnics= 'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn='
    
    const majors= await majorScrapeService(url);
    res.status(200).json({
      status: "true",
      message: "Data majors berhasil diambil.",
      payload: majors
    });
  } catch(err) {
    next(err);
  }
}

export default majorScrapeController;