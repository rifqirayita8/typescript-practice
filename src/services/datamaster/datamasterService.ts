import { findAllUniversitas } from "../../repositories/ahpRepository.js";

const getUniversitasService= async() => {
  const universitas= await findAllUniversitas()

  return universitas;
}

export default getUniversitasService;