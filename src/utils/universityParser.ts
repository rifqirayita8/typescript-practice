import { findAllUniversitas } from "../repositories/ahpRepository.js";
import fs from "fs";

interface ParsedUniversitas {
  name: string;
  accreditation: 'A' | 'B' | 'C' | string;
  tuition_fee: number | null;
  pass_percentage: number | null;
  latitude: number;
  longitude: number;
  major_count: number | null;
  acceptance_rate: number | null;
}

const akreditasiMap: Record<string, 'A' | 'B' | 'C'> = {
  "Unggul": "A",
  "Baik Sekali": "B",
  "Baik": "C",
};

function parseBiaya(biaya: string): [number | null, number | null, number | null] {
  const matches = biaya?.match(/\d[\d.]*/g);
  if (!matches || matches.length === 0) return [null, null, null];

  const toNumber = (s: string) => parseInt(s.replace(/\./g, ''));
  const min = toNumber(matches[0]);
  const max = matches[1] ? toNumber(matches[1]) : min;
  
  const avg = min && max ? (min + max) / 2 : null;
  
  return [min, max, avg];
}

function parseJurusan(jurusan: string): number | null {
  const match= jurusan.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

function parsePersentase(persen: string): number | null {
  if (!persen || persen.trim() === "..." || !/\d/.test(persen)) {
    return 50; 
  }

  const match = persen.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 40;
}


function parseAkreditasi(akreditasi: string): string {
  return akreditasiMap[akreditasi] ?? akreditasi;
}

function parseAcceptanceRate(rate: number | null): number {
  if (rate === null) return 99;
  if (rate === 0) return 99;
  if (rate > 100) return 99;
  return rate;
}

export async function getParsedUniversitas(): Promise<ParsedUniversitas[]> {
  const rawUniversitas = await findAllUniversitas();
  const tuition_fee = rawUniversitas.map((univ) => univ.tuition_fee);
  fs.writeFileSync("tuition_fee_parser.json", JSON.stringify(tuition_fee, null, 2));

  return rawUniversitas.map((univ) => {
    const [tuition_fee_min, tuition_fee_max, tuition_fee] = parseBiaya(univ.tuition_fee ?? "Rp. 0,-");
    const pass_percentage = parsePersentase(univ.pass_percentage ?? "0%");
    const accreditation = parseAkreditasi(univ.accreditation);
    const major_count = parseJurusan(univ.major_count ?? "0");
    const acceptance_rate = parseAcceptanceRate(univ.acceptanceRate);

    return {
      name: univ.name,
      accreditation,
      tuition_fee,
      pass_percentage,
      latitude: univ.latitude,
      longitude: univ.longitude,
      acceptance_rate,
      major_count,
    };
  });
}