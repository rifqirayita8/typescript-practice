var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import majorScrapeService from "../../services/scraping/majorScrapeService.js";
const majorScrapeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let universitiesId = req.params.id;
        if (universitiesId.length > 1) {
            universitiesId = universitiesId.substring(1);
        }
        const url = `https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn=${universitiesId}`;
        // const urlPolytechnics= 'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn='
        const majors = yield majorScrapeService(url);
        res.status(200).json({
            status: "true",
            message: "Data majors berhasil diambil.",
            payload: majors
        });
    }
    catch (err) {
        next(err);
    }
});
export default majorScrapeController;
