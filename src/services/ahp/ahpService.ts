import AHP from "ahp";
import { toPairwiseMatrix } from "../../utils/ahpHelper.js";
import { getParsedUniversitas } from "../../utils/universityParser.js";

const ahp = new AHP();
// Fungsi untuk meranking universitas
export async function rankUniversitas() {
  const data = await getParsedUniversitas();

  const convertAkreditasi = (ak: string) => {
    if (ak === 'A') return 9;
    if (ak === 'B') return 6;
    if (ak === 'C') return 3;
    return 1;
  };


  // Filter data universitas agar tidak ada yang null
  const filtered = data.filter(d =>
    d.tuition_fee !== null &&
    d.pass_percentage !== null &&
    d.accreditation !== null
  );

  const parsed = filtered.map(d => ({
    name: d.name,
    tuition_fee: d.tuition_fee!, 
    accreditation: d.accreditation,
    pass_percentage: d.pass_percentage!
  }));
  
  const universitas = parsed.map(p => p.name);
  const maxBiaya = Math.max(...parsed.map(p => p.tuition_fee));
  const maxRate = Math.max(...parsed.map(p => p.pass_percentage));

  // Normalisasi data
  const normalized = parsed.map(p => ({
    ...p,
    accreditation: p.accreditation,
    biaya: maxBiaya / p.tuition_fee, // semakin murah semakin tinggi skor
    passRate: (p.pass_percentage / maxRate) * 9 // normalisasi untuk skala AHP
  }));

  // const normalized = [
  //   { name: 'Univ A', accreditation: 'C', biaya: 2, passRate: 9 },
  //   { name: 'Univ B', accreditation: 'A', biaya: 4, passRate: 5 },
  //   { name: 'Univ C', accreditation: 'B', biaya: 6, passRate: 3 },
  // ];
  // Inisialisasi AHP dan penambahan kriteria dan item

  ahp.addItems(universitas);

// Step 2: Tambahkan kriteria
ahp.addCriteria(['akreditasi', 'biaya', 'passRate']);

// Step 3: Ranking untuk tiap kriteria menggunakan triplet [A, B, nilai]
function akreditasiToScore(akreditasi: string): number {
  switch (akreditasi.toUpperCase()) {
    case 'A': return 9;
    case 'B': return 6;
    case 'C': return 3;
    default: return 1;
  }
}

function createTriplets(criterion: keyof typeof normalized[0]) {
  const triplets: [string, string, number][] = [];

  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const a = normalized[i];
      const b = normalized[j];

      let valA: number;
      let valB: number;

      if (criterion === 'accreditation') {
        valA = akreditasiToScore(a[criterion] as unknown as string);
        valB = akreditasiToScore(b[criterion] as unknown as string);
      } else {
        valA = a[criterion] as number;
        valB = b[criterion] as number;
      }

      const ratio = valA / valB;
      triplets.push([a.name, b.name, ratio]);
    }
  }

  return triplets;
}


// Step 4: Ranking item per kriteria
ahp.rankCriteriaItem('akreditasi', createTriplets('accreditation'));
ahp.rankCriteriaItem('biaya', createTriplets('biaya'));
ahp.rankCriteriaItem('passRate', createTriplets('passRate'));

// Step 5: Ranking antar kriteria (ini kamu bebas mau set seberapa penting kriteria A dari B)
ahp.rankCriteria([
  ['akreditasi', 'biaya', 3],     // akreditasi 3x lebih penting dari biaya
  ['akreditasi', 'passRate', 2],  // akreditasi 2x lebih penting dari pass rate
  ['biaya', 'passRate', 1 / 2]    // biaya setengah lebih penting dari pass rate
]);

// Step 6: Jalankan
const result = ahp.run();
// const parsedBiaya= parsed.map(p => p.tuition_fee);
console.log(JSON.stringify(result, null, 2));
// console.log("biaya: ", parsedBiaya);
// console.log("akreditasi: ", parsed.map(p => p.accreditation));
// console.log("passRate: ", parsed.map(p => p.pass_percentage));
}

rankUniversitas();
// import AHP from 'ahp';
// const ahpContext = new AHP();

// ahpContext.addItems(['VendorA', 'VendorB', 'VendorC']);

// ahpContext.addCriteria(['price', 'functionality', 'UX']);

// //rank criteria with rank scale
// ahpContext.rankCriteriaItem('price', [
//     ['VendorB', 'VendorC', 1 / 2],
//     ['VendorA', 'VendorC', 1 / 2],
//     ['VendorA', 'VendorB', 1]
// ]);

// //rank criteria with rank scale
// ahpContext.rankCriteriaItem('functionality', [
//     ['VendorB', 'VendorC', 1],
//     ['VendorA', 'VendorC', 5],
//     ['VendorA', 'VendorB', 5]
// ]);

// //rank criteria with absolute rank scole
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