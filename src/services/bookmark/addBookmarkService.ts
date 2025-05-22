import { createBookmark } from "../../repositories/bookmarkRepository.js";
import { isBookmarked } from "../../repositories/bookmarkRepository.js";
import { ValidationError } from "../../utils/customError.js";

const addBookmark= async (userId: number, universityId: number) => {
  const isBookmarkedResult = await isBookmarked(userId, universityId);
  if (isBookmarkedResult) {
    throw new ValidationError("Bookmark sudah ada.");
  }

  const bookmark = await createBookmark(userId, universityId);
  return bookmark;
}

export default addBookmark;