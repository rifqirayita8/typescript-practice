import { cobaDua } from "../../repositories/scraperRepository.js";

const universityPddiktiService= async () => {
  const university= await cobaDua();

  return university;
}
export default universityPddiktiService;