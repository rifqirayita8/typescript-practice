var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBookmark } from "../../repositories/bookmarkRepository.js";
import { isBookmarked } from "../../repositories/bookmarkRepository.js";
import { ValidationError } from "../../utils/customError.js";
const addBookmark = (userId, universityId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookmarkedResult = yield isBookmarked(userId, universityId);
    if (isBookmarkedResult) {
        throw new ValidationError("Bookmark sudah ada.");
    }
    const bookmark = yield createBookmark(userId, universityId);
    return bookmark;
});
export default addBookmark;
