import { pythonScrape } from "../../repositories/scraperRepository.js";

const pythonScrapeService= async(keyword: string) => {
  const data= await pythonScrape(keyword);
  return data;
}

export default pythonScrapeService;