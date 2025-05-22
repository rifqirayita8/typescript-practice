import { scrapeMajors } from "../../repositories/scraperRepository.js";

const majorScrapeService= async(url:string) => {
  const majors= await scrapeMajors(url);
  return majors;
}

export default majorScrapeService;