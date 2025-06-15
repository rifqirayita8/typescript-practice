import { scrapePddikti } from "../../repositories/scraperRepository.js";

const universityPddiktiService= async () => {
  const university= await scrapePddikti();

  return university;
}
export default universityPddiktiService;