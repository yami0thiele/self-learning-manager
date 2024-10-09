import { axiosInstance } from "@/lib/axios";
import type { BookData } from "../data/book-data";

export const createBook = async (bookData: BookData): Promise<BookData> => {
	const result = await axiosInstance.post<BookData>(
		"/lenin-note/books",
		bookData,
	);
	return result.data;
};

export const findBooksByFts = async (q: string): Promise<BookData[]> => {
	if (q === "") return [];
	const result = await axiosInstance.get<BookData[]>(
		`/lenin-note/fts/books?q=${q}`,
	);
	return result.data;
};
