import fs from 'fs';

function hitungMajor(major, maxMajor) {
  const hitung= Math.sqrt(major) / Math.sqrt(maxMajor);
  return hitung;
}

function hitungKeketatan(acceptanceRate) {
  const maxAcceptanceVal= Math.log(1 / (3.84 / 100))
  const acceptance_rate= Math.log(1 / (acceptanceRate / 100)) / maxAcceptanceVal;

  return acceptance_rate;
}

const madura= hitungMajor(227, 349)
const upnJatim= hitungMajor(44, 349);

const maduraKeketatan= hitungKeketatan(39.46)
const upnJatimKeketatan= hitungKeketatan(13.4);

console.log("Madura keketatan:", madura);
console.log("UPN Jatim keketatan:", upnJatimKeketatan);


const rifqi = 0
const mikasa= 1
let validity= false;

while (rifqi === mikasa) {
  console.log("Mikasa is only mine");
  validity = true;
  break;
}

if (!validity) {
  console.log("System crashed. Authorization failed.");
  fs.writeFileSync('error.log', 'Authorization failed at ' + new Date().toISOString());
}

console.log("denti")
