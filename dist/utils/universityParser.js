var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findAllUniversitas } from "../repositories/ahpRepository.js";
import fs from "fs";
const akreditasiMap = {
    "Unggul": "A",
    "Baik Sekali": "B",
    "Baik": "C",
};
function parseBiaya(biaya) {
    const matches = biaya === null || biaya === void 0 ? void 0 : biaya.match(/\d[\d.]*/g);
    if (!matches || matches.length === 0)
        return [null, null, null];
    const toNumber = (s) => parseInt(s.replace(/\./g, ''));
    const min = toNumber(matches[0]);
    const max = matches[1] ? toNumber(matches[1]) : min;
    const avg = min && max ? (min + max) / 2 : null;
    return [min, max, avg];
}
function parseJurusan(jurusan) {
    const match = jurusan.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
}
function parsePersentase(persen) {
    if (!persen || persen.trim() === "..." || !/\d/.test(persen)) {
        return 50;
    }
    const match = persen.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 40;
}
function parseAkreditasi(akreditasi) {
    var _a;
    return (_a = akreditasiMap[akreditasi]) !== null && _a !== void 0 ? _a : akreditasi;
}
function parseAcceptanceRate(rate) {
    if (rate === null)
        return 99;
    if (rate === 0)
        return 99;
    if (rate > 100)
        return 99;
    return rate;
}
export function getParsedUniversitas() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawUniversitas = yield findAllUniversitas();
        const tuition_fee = rawUniversitas.map((univ) => univ.tuition_fee);
        fs.writeFileSync("tuition_fee_parser.json", JSON.stringify(tuition_fee, null, 2));
        return rawUniversitas.map((univ) => {
            var _a, _b, _c;
            const [tuition_fee_min, tuition_fee_max, tuition_fee] = parseBiaya((_a = univ.tuition_fee) !== null && _a !== void 0 ? _a : "Rp. 0,-");
            const pass_percentage = parsePersentase((_b = univ.pass_percentage) !== null && _b !== void 0 ? _b : "0%");
            const accreditation = parseAkreditasi(univ.accreditation);
            const major_count = parseJurusan((_c = univ.major_count) !== null && _c !== void 0 ? _c : "0");
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
    });
}
