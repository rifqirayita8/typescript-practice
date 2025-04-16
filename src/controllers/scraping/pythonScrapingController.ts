import { Request, Response, NextFunction } from "express"
import pythonScrapeService from "../../services/scraping/pythonScrapeService.js";

const pythonScrapingController= async (req:Request, res:Response, next:NextFunction) => {
  try {
    res.header({
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9,mt;q=0.8",
      "Connection": "keep-alive",
      "DNT": "1",
      "Host": "api-pddikti.kemdiktisaintek.go.id",
      "Origin": "https://pddikti.kemdiktisaintek.go.id",
      "Referer": "https://pddikti.kemdiktisaintek.go.id/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
      "X-User-IP": "103.47.132.29",
      "sec-ch-ua": '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    })

    const {keyword}= req.query;

    const data= await pythonScrapeService(keyword as string);
    console.log("data", data);
    res.status(200).json({
      message: "Success",
      data: data
    })

  } catch(e) {
    next(e);
  }
}

export default pythonScrapingController;