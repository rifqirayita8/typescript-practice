var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { rankUniversitas } from "../../services/ahp/ahpService.js";
const userRankInput = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { criteriaWeights, userLat, userLong } = req.body;
        if (!Array.isArray(criteriaWeights) || criteriaWeights.length === 0) {
            res.status(400).json({ message: "Kriteria harus berupa array!" });
        }
        if (!userLat || !userLong) {
            res.status(400).json({ message: "Latitude dan Longitude tidak boleh kosong!" });
        }
        const result = yield rankUniversitas(criteriaWeights, userLat, userLong);
        res.status(200).json({
            status: "true",
            message: "Berhasil input kriteria.",
            data: "sontol", result
        });
    }
    catch (err) {
        next(err);
    }
});
export default userRankInput;
// 'Universitas Papua',
//   'Politeknik Perikanan Negeri Tual',
// 'Universitas Brawijaya',
//   'Sekolah Tinggi Seni Indonesia Bandung',
//   'Politeknik Negeri Balikpapan',
//   'Universitas Halu Oleo',
//   'Politeknik Negeri Bengkalis',
//   'Institut Seni Budaya Indonesia Tanah Papua',
//   'Universitas Cenderawasih',
//   600000,    2000000,    5000000,    4000000,     4000000,    3500000,
//      1750000,     750000,    4750000,    6500000,     3250000,   31375000,
