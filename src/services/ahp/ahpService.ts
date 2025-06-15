import AHP from "ahp";
import fs from "fs";
import { getDistance } from "geolib";
import { getParsedUniversitas } from "../../utils/universityParser.js";
import { val } from "cheerio/dist/commonjs/api/attributes.js";


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

// fs.writeFileSync('distanceOnly.json', JSON.stringify(distancesOnly, null, 2));


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
  const maxDistance = Math.max(...parsed.map(p => p.distance));
  const minDistance = Math.min(...parsed.map(p => p.distance));
  const maxMajorCount = Math.max(...parsed.map(p => p.major_count)); 
  const minAcceptanceRate = Math.min(...parsed.map(p => p.acceptance_rate));
  const maxAcceptanceRate= Math.max(...parsed.map(p => p.acceptance_rate));

  const normalized = parsed.map(p => ({
    ...p,
    accreditation: p.accreditation,
    biaya: (maxBiaya-p.tuition_fee) / (maxBiaya-minBiaya),
    passRate: (p.pass_percentage / maxRate),
    // distanceScore: (maxDistance - p.distance) / (maxDistance - minDistance),
    distanceScore: getDistanceScore(p.distance), 
    major_count: p.major_count / maxMajorCount,
    acceptance_rate: (100 - p.acceptance_rate) / (100 - minAcceptanceRate)
  }));

  // fs.writeFileSync('acceptanceRate.json', JSON.stringify(parsed.map(p => p.acceptance_rate), null, 2));

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
    const biayaGabungan: string[] = [];
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


        // const gabungan = `biayaA (${a.name}): ${a.biaya}, biayaB (${b.name}): ${b.biaya}`;
        // biayaGabungan.push(gabungan);
  
        // let ratio: number;
        //   if (valA >= valB) {
        //     ratio = Math.min(valA / valB, 9);
        //   } else {
        //     ratio = 1 / Math.min(valB / valA, 9);
        //   }

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
// fs.writeFileSync('biayaGabungan.json', JSON.stringify(biayaGabungan, null, 2));
// fs.writeFileSync('debugData.json', JSON.stringify(debugData, null, 2));

  
    return triplets;
  }

    const tripletAkreditasi = createTriplets('akreditasi');
    const tripletBiaya = createTriplets('biaya');
    const tripletTingkatKeterimaan = createTriplets('tingkatKeterimaan');
    const tripletJarak = createTriplets('jarak');
    const tripletJumlahJurusan = createTriplets('jumlahJurusan');
    fs.writeFileSync('tripletAkreditasi.json', JSON.stringify(tripletAkreditasi, null, 2));
    fs.writeFileSync('tripletBiaya.json', JSON.stringify(tripletBiaya, null, 2));
    fs.writeFileSync('triplettingkatKeterimaan.json', JSON.stringify(tripletTingkatKeterimaan, null, 2));
    fs.writeFileSync('tripletJarak.json', JSON.stringify(tripletJarak, null, 2));
    fs.writeFileSync('tripletJumlahJurusan.json', JSON.stringify(tripletJumlahJurusan, null, 2));
    
  



  ahp.rankCriteriaItem('akreditasi', createTriplets('akreditasi'));
  ahp.rankCriteriaItem('biaya', createTriplets('biaya'));
  ahp.rankCriteriaItem('tingkatKeterimaan', createTriplets('tingkatKeterimaan'));
  ahp.rankCriteriaItem('jarak', createTriplets('jarak'));
  ahp.rankCriteriaItem('jumlahJurusan', createTriplets('jumlahJurusan'));
  

  const criteriaRankMatrix= ahp.rankCriteria(criteriaWeights);
  console.log('criteriaWeights:', criteriaRankMatrix);

  const result = ahp.run();
  const normalizedBiaya = normalized.map(p => p.biaya);
  // const tuition_fee = parsed.map(p => p.tuition_fee);
  // fs.writeFileSync('normalizedBiaya.json', JSON.stringify(normalizedBiaya, null, 2));
  // console.log("normalized: ", normalized.map(p => p.biaya));
  // console.log('minBiaya:', minBiaya);
  // console.log('maxBiaya:', maxBiaya);
  // console.log('maxJumlahJurusan:', maxMajorCount);
  // console.log('maxtingkatKeterimaan:', maxAcceptanceRate);
  // console.log('maxDistance:', maxDistance);
  // console.log('minDistance:', minDistance);
  console.log("criteriaWeights (backend):", criteriaWeights);
  // console.log('tuition_fee:', tuition_fee);
  // console.log('normalizedBiaya', normalized.map(p => p.biaya));
  // console.log('Triplets jurusan:', createTriplets('jumlahJurusan'));

  // console.log(JSON.stringify(result, null, 2));
  // console.log("hasil: ", result);
  return result;
 

  // console.log("input: ", criteriaWeights);
// console.log("biaya: ", parsed.map(p => p.tuition_fee));
// console.log("nama: ", parsed.map(p => p.name));
// console.log("akreditasi: ", parsed.map(p => p.accreditation));
// console.log("tingkatKeterimaan: ", parsed.map(p => p.pass_percentage));
// console.log("jumlahJurusan: ", parsed.map(p => p.major_count));
// console.log("jarak", parsed.map(p => p.distance));
// console.log("akreditasi: ", parsed.map(p => p.accreditation));
// console.log("passRate: ", parsed.map(p => p.pass_percentage));
}
// import AHP from 'ahp';
// const ahpContext = new AHP();

// ahpContext.addItems(['VendorA', 'VendorB', 'VendorC']);

// ahpContext.addCriteria(['price', 'functionality', 'UX']);

// ahpContext.rankCriteriaItem('price', [
//     ['VendorB', 'VendorC', 1 / 2],
//     ['VendorA', 'VendorC', 1 / 2],
//     ['VendorA', 'VendorB', 1]
// ]);


// ahpContext.rankCriteriaItem('functionality', [
//     ['VendorB', 'VendorC', 1],
//     ['VendorA', 'VendorC', 5],
//     ['VendorA', 'VendorB', 5]
// ]);


// ahpContext.setCriteriaItemRankByGivenScores('UX', [10, 10, 1]);

// ahpContext.rankCriteria(
//     [
//         ['price', 'functionality', 3],
//         ['price', 'UX', 3],
//         ['functionality', 'UX', 1]
//     ]
// );

// const output = ahpContext.run();
// console.log(output);

  // const normalized = [
  //   { name: 'Univ A', accreditation: 'C', biaya: 2, passRate: 9 },
  //   { name: 'Univ B', accreditation: 'A', biaya: 4, passRate: 5 },
  //   { name: 'Univ C', accreditation: 'B', biaya: 6, passRate: 3 },
  // ];


  // const convertAkreditasi = (ak: string) => {
  //   if (ak === 'A') return 9;
  //   if (ak === 'B') return 6;
  //   if (ak === 'C') return 3;
  //   return 1;
  // };