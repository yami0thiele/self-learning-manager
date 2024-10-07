import { axiosInstance } from "@/lib/axios";
import { BookData } from "../data/book-data";

export const createBook = async (bookData: BookData): Promise<BookData> => {
  const result = await axiosInstance.post<BookData>("/lenin-note/books", bookData);
  return result.data;
}
