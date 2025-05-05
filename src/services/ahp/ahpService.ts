import AHP from "ahp";
import { getDistance } from "geolib";
import { getParsedUniversitas } from "../../utils/universityParser.js";

const ahp = new AHP();

export async function rankUniversitas(criteriaWeights: [string, string, number][], userLat: number, userLong:number) {
  const data = await getParsedUniversitas();

  const filtered = data.filter(d =>
    d.tuition_fee !== null &&
    d.pass_percentage !== null &&
    d.accreditation !== null &&
    d.latitude && 
    d.longitude &&
    d.major_count !== null
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
      distance,
      major_count: d.major_count!,
    }
  });
  
  const universitas = parsed.map(p => p.name);
  const maxBiaya = Math.max(...parsed.map(p => p.tuition_fee));
  const maxRate = Math.max(...parsed.map(p => p.pass_percentage));
  const maxDistance = Math.max(...parsed.map(p => p.distance));
  const maxMajorCount = Math.max(...parsed.map(p => p.major_count)); 

  const normalized = parsed.map(p => ({
    ...p,
    accreditation: p.accreditation,
    biaya: maxBiaya / p.tuition_fee, 
    passRate: (p.pass_percentage / maxRate) * 9,
    distanceScore: maxDistance / p.distance,
    major_count: p.major_count / maxMajorCount
  }));

  ahp.addItems(universitas);

  ahp.addCriteria(['akreditasi', 'biaya', 'passRate', 'jarak', 'jumlahJurusan']);
  
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
  
    for (let i = 0; i < normalized.length; i++) {
      for (let j = i + 1; j < normalized.length; j++) {
        const a = normalized[i];
        const b = normalized[j];
  
        let valA: number;
        let valB: number;
  
        // MAPPING nama kriteria
        switch (criterion) {
          case 'akreditasi':
            valA = akreditasiToScore(a.accreditation);
            valB = akreditasiToScore(b.accreditation);
            break;
          case 'biaya':
            valA = a.biaya;
            valB = b.biaya;
            break;
          case 'passRate':
            valA = a.passRate;
            valB = b.passRate;
            break;
          case 'jarak':
            valA = a.distanceScore;
            valB = b.distanceScore;
            break;
          case 'jumlahJurusan':
            valA = a.major_count;
            valB = b.major_count;
            break;
          default:
            throw new Error(`Unknown criterion: ${criterion}`);
        }
  
        const ratio = valA / valB;
        triplets.push([a.name, b.name, ratio]);
      }
    }
  
    return triplets;
  }
  



  ahp.rankCriteriaItem('akreditasi', createTriplets('akreditasi'));
  ahp.rankCriteriaItem('biaya', createTriplets('biaya'));
  ahp.rankCriteriaItem('passRate', createTriplets('passRate'));
  ahp.rankCriteriaItem('jarak', createTriplets('jarak'));
  ahp.rankCriteriaItem('jumlahJurusan', createTriplets('jumlahJurusan'));
  

  ahp.rankCriteria(criteriaWeights);

  const result = ahp.run();
  // const parsedBiaya= parsed.map(p => p.tuition_fee);
  // console.log(JSON.stringify(result, null, 2));
  console.log("hasil: ", result);
  return result;
 

  // console.log("input: ", criteriaWeights);
// console.log("biaya: ", parsed.map(p => p.tuition_fee));
// console.log("nama: ", parsed.map(p => p.name));
// console.log("akreditasi: ", parsed.map(p => p.accreditation));
// console.log("passRate: ", parsed.map(p => p.pass_percentage));
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