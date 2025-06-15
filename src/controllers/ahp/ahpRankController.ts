import { Request, Response, NextFunction } from "express";
import { rankUniversitas } from "../../services/ahp/ahpService.js";

const userRankInput= async(req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const {criteriaWeights, userLat, userLong} = req.body;

    if(!Array.isArray(criteriaWeights) || criteriaWeights.length === 0) {
      res.status(400).json({ message: "Kriteria harus berupa array!" });
    }

    if(!userLat || !userLong) {
      res.status(400).json({ message: "Latitude dan Longitude tidak boleh kosong!" });
    }
    const result= await rankUniversitas(criteriaWeights, userLat, userLong);

    res.status(200).json({
      status: "true",
      message: "Berhasil input kriteria.",
      data:  "sontol", result
    })
  }catch(err) {
    next(err);
  }
}

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