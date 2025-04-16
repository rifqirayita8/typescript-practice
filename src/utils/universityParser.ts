import { findAllUniversitas } from "../repositories/ahpRepository.js";

interface ParsedUniversitas {
  name: string;
  accreditation: 'A' | 'B' | 'C' | string;
  tuition_fee: number | null;
  pass_percentage: number | null;
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
  
  // Hitung rata-rata biaya
  const avg = min && max ? (min + max) / 2 : null;
  
  return [min, max, avg];
}

function parsePersentase(persen: string): number | null {
  if (!persen || persen.trim() === "..." || !/\d/.test(persen)) {
    return 40; // default netral
  }

  const match = persen.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 40;
}


function parseAkreditasi(akreditasi: string): string {
  return akreditasiMap[akreditasi] ?? akreditasi;
}

export async function getParsedUniversitas(): Promise<ParsedUniversitas[]> {
  const rawUniversitas = await findAllUniversitas();

  return rawUniversitas.map((univ) => {
    const [tuition_fee_min, tuition_fee_max, tuition_fee] = parseBiaya(univ.tuition_fee ?? "Rp. 0,-");
    const pass_percentage = parsePersentase(univ.pass_percentage ?? "0%");
    const accreditation = parseAkreditasi(univ.accreditation);

    return {
      name: univ.name,
      accreditation,
      tuition_fee,
      pass_percentage,
    };
  });
}