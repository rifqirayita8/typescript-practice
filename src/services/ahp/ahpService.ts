import AHP from "ahp";
import fs from "fs";
import { getDistance } from "geolib";
import { getParsedUniversitas } from "../../utils/universityParser.js";


export async function rankUniversitas(criteriaWeights: [string, string, number][], userLat: number, userLong:number) {
const ahp = new AHP();

  const data = await getParsedUniversitas();

  const filtered = data.filter(d =>
    d.tuition_fee !== null &&
    d.pass_percentage !== null &&
    d.accreditation !== null &&
    d.latitude && 
    d.longitude &&
    d.major_count !== null &&
    d.acceptance_rate !== null
  );

  const parsed = filtered.map(d => {
    const distance= getDistance(
      {latitude: userLat, longitude: userLong},
      {latitude: d.latitude, longitude: d.longitude}
    );
    return {
      name: d.name,
      tuition_fee: d.tuition_fee!, 
      accreditation: d.accreditation,
      pass_percentage: d.pass_percentage!,
      distance: +(distance / 1000).toFixed(2),
      major_count: d.major_count!,
      acceptance_rate: d.acceptance_rate!,
    }
  });

  const distancesOnly = parsed.map(d => ({
  name: d.name,
  distance: d.distance
}));

fs.writeFileSync('distanceOnly.json', JSON.stringify(distancesOnly, null, 2));


  parsed.forEach(p => {
    if (isNaN(p.tuition_fee)) {
      console.log(`Tuition fee error at ${p.name}:`, p.tuition_fee);
    }
  });
  
function getDistanceScore(distance: number): number {
  const smoothScore = 1 / (1 + distance / 1000);
  const maxDistanceAllowed = 1500;

  if (distance > maxDistanceAllowed) {
    return smoothScore * 0.5; 
  }

  return smoothScore;
}

  
  const universitas = parsed.map(p => p.name);
  const maxBiaya = Math.max(...parsed.map(p => p.tuition_fee));
  const minBiaya = Math.min(...parsed.map(p => p.tuition_fee));
  const maxRate = Math.max(...parsed.map(p => p.pass_percentage));
  const maxMajorCount = Math.max(...parsed.map(p => p.major_count)); 
  const minAcceptanceRate = Math.min(...parsed.map(p => p.acceptance_rate));
  const acceptanceMaxVal= Math.log(1 / (minAcceptanceRate / 100))

  const normalized = parsed.map(p => ({
    ...p,
    accreditation: p.accreditation,
    biaya: (maxBiaya-p.tuition_fee) / (maxBiaya-minBiaya),
    passRate: (p.pass_percentage / maxRate),
    distanceScore: getDistanceScore(p.distance), 
    major_count: Math.sqrt(p.major_count) / Math.sqrt(maxMajorCount),
    acceptance_rate: Math.log(1 / (p.acceptance_rate / 100)) / acceptanceMaxVal,
  }));

  ahp.addItems(universitas);

  ahp.addCriteria(['akreditasi', 'biaya', 'tingkatKeterimaan', 'jarak', 'jumlahJurusan']);
  
  function akreditasiToScore(akreditasi: string): number {
    switch (akreditasi.toUpperCase()) {
      case 'A': return 9;
      case 'B': return 6;
      case 'C': return 3; 
      default: return 1;
    }
  }

  function createTriplets(criterion: string) {
    const triplets: [string, string, number][] = [];
    const debugData: any[] = [];

  
    for (let i = 0; i < normalized.length; i++) {
      for (let j = i + 1; j < normalized.length; j++) {
        const a = normalized[i];
        const b = normalized[j];
  
        let valA: number;
        let valB: number;
  
        switch (criterion) {
          case 'akreditasi':
            valA = akreditasiToScore(a.accreditation) / 9;
            valB = akreditasiToScore(b.accreditation) / 9;
            break;
          case 'biaya':
            valA = a.biaya
            valB = b.biaya
            break;
          case 'tingkatKeterimaan':
            valA = a.acceptance_rate;
            valB = b.acceptance_rate; 
            break;
          case 'jarak':
            valA = a.distanceScore
            valB = b.distanceScore
            break;
          case 'jumlahJurusan':
            valA = a.major_count;
            valB = b.major_count;
            break;
          default:
            throw new Error(`Unknown criterion: ${criterion}`);
        }

        const diff= valA - valB;
        const scalingFactor= 5;
        const ratio= Math.exp(diff * scalingFactor);
        const clampedRatio= Math.min(Math.max(ratio, 1/9), 9)

        triplets.push([a.name, b.name, clampedRatio]);

      debugData.push({
        criterion,
        universitasA: a.name,
        valA,
        universitasB: b.name,
        valB,
        ratio,
      });
      }
    }
    return triplets;
  }

  ahp.rankCriteriaItem('akreditasi', createTriplets('akreditasi'));
  ahp.rankCriteriaItem('biaya', createTriplets('biaya'));
  ahp.rankCriteriaItem('tingkatKeterimaan', createTriplets('tingkatKeterimaan'));
  ahp.rankCriteriaItem('jarak', createTriplets('jarak'));
  ahp.rankCriteriaItem('jumlahJurusan', createTriplets('jumlahJurusan'));

  const result = ahp.run();
  return result;
}