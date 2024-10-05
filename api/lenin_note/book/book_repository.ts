import { and, eq, like, sql } from "drizzle-orm";
import * as schema from "../../db/schema/lenin-note-schema";
import type { TxContext } from "../../middlewares/transaction";
import type { BookData, editBookData } from "./book_data";

export default {
	find: async (
		id: number,
		ctx: TxContext,
	): Promise<editBookData | undefined> => {
		const [foundBook] = await ctx.tx
			.select()
			.from(schema.books)
			.where(eq(schema.books.id, id))
			.all();
		if (foundBook == null) return undefined;
		return foundBook;
	},

	findAll: async (
		query: {
			title?: string;
			author?: string;
			publisher?: string;
			published_at?: string;
			count?: number;
			offset?: number;
		},
		ctx: TxContext,
	) => {
		return await ctx.tx
			.select()
			.from(schema.books)
			.where(
				and(
					query.title
						? like(schema.books.title, `%${query.title}%`)
						: sql`1 = 1`,
					query.author
						? like(schema.books.author, `%${query.author}%`)
						: sql`1 = 1`,
					query.publisher
						? like(schema.books.publisher, `%${query.publisher}%`)
						: sql`1 = 1`,
					query.published_at
						? like(schema.books.published_at, `%${query.published_at}%`)
						: sql`1 = 1`,
				),
			)
			.limit(query.count || 10)
			.offset(query.offset || 0)
			.all();
	},

	create: async (book: BookData, ctx: TxContext) => {
		const [registeredBook] = await ctx.tx
			.insert(schema.books)
			.values([book])
			.returning();
		return registeredBook;
	},

	update: async (book: editBookData, ctx: TxContext) => {
		const [updatedBook] = await ctx.tx
			.update(schema.books)
			.set(book)
			.where(eq(schema.books.id, book.id))
			.returning();
		return updatedBook;
	},
};
