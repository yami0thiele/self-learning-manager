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

	fts: async (q: string, ctx: TxContext) => {
		const segments = Array.from(
			new Intl.Segmenter("ja", { granularity: "word" }).segment(q),
		)
			.filter((s) => s.isWordLike)
			.map((s) => s.segment);

		return await ctx.tx.all(sql`SELECT books.* FROM books JOIN books_fts ON books_fts.rowid = books.id
			WHERE books_fts MATCH ${segments.join(" ")}
			ORDER BY rank
			LIMIT 10
			`);
	},

	create: async (book: BookData, ctx: TxContext) => {
		const [registeredBook] = await ctx.tx
			.insert(schema.books)
			.values([book])
			.returning();

		const segments = Array.from(
			new Intl.Segmenter("ja", { granularity: "word" }).segment(
				`${registeredBook.title} ${registeredBook.author}`,
			),
		)
			.filter((s) => s.isWordLike)
			.map((s) => s.segment);

		await ctx.tx.run(
			sql`INSERT INTO books_fts (rowid, segments) VALUES (${registeredBook.id}, ${segments.join(" ")})`,
		);

		return registeredBook;
	},

	update: async (book: editBookData, ctx: TxContext) => {
		const [updatedBook] = await ctx.tx
			.update(schema.books)
			.set(book)
			.where(eq(schema.books.id, book.id))
			.returning();

		const newSegments = Array.from(
			new Intl.Segmenter("ja", { granularity: "word" }).segment(
				`${updatedBook.title} ${updatedBook.author}`,
			),
		)
			.filter((s) => s.isWordLike)
			.map((s) => s.segment);
		await ctx.tx.run(
			sql`UPDATE books_fts SET segments = ${newSegments.join(" ")} WHERE rowid = ${updatedBook.id}`,
		);

		return updatedBook;
	},

	delete: async (id: number, ctx: TxContext) => {
		await ctx.tx.delete(schema.books).where(eq(schema.books.id, id));
		await ctx.tx.run(sql`DELETE FROM books_fts WHERE rowid = ${id}`);
	},
};
