import type { BookData, editBookData } from "./book_data";

export default {
	/**
	 * @param {Object} newBookData
	 * @prop {string} newBookData.title
	 * @prop {string} [newBookData.author]
	 * @prop {string} [newBookData.publisher]
	 * @prop {string} [newBookData.published_at]
	 * @returns {BookData}
	 */
	newBook: ({
		title,
		author,
		publisher,
		published_at,
	}: {
		title: string;
		author?: string | null;
		publisher?: string | null;
		published_at?: string | null;
	}): BookData => {
		return {
			title,
			author,
			publisher,
			published_at,
		};
	},

	editBook: ({ id, title, author, publisher, published_at }): editBookData => {
		return {
			id,
			title,
			author,
			publisher,
			published_at,
		};
	},
};
