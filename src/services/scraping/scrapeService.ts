import { scrapeUniversities } from "../../repositories/scraperRepository.js";

const getUniversitiesService= async() => {
  const universities= await scrapeUniversities();
  return universities;
}

export default getUniversitiesService;