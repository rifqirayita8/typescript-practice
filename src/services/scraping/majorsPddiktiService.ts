import { cobaTiga } from "../../repositories/scraperRepository.js";

const majorsPddiktiService= async () => {
  const data= await cobaTiga();
  return data;
}
export default majorsPddiktiService;