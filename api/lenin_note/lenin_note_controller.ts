import { sql } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { Context, Next } from "koa";
import book_service from "./book/book_service";
import { TxContext } from "../middlewares/transaction";
import note_service from "./note/note_service";

export default {
	index: (ctx: Context, next: Next) => {
		const query = sql`select "hello world" as text`;
		const result = (ctx.db as BunSQLiteDatabase).get<{ text: string }>(query);
		ctx.body = result;
	},

	searchBooks: async (ctx: Context, next: Next) => {
		ctx.body = await book_service.findAll(ctx as TxContext, next);
	},

	searchBooksFts: async (ctx: Context, next: Next) => {
		ctx.body = await book_service.fts(ctx as TxContext, next);
	},

	findBook: async (ctx: Context, next: Next) => {
		ctx.body = await book_service.find(ctx as TxContext, next);
	},

	createBook: async (ctx: Context, next: Next) => {
		ctx.body = await book_service.create(ctx as TxContext, next);
		ctx.status = 201;
	},

	editBook: async (ctx: Context, next: Next) => {
		ctx.body = await book_service.edit(ctx as TxContext, next);
	},

	deleteBook: async (ctx: Context, next: Next) => {
		await book_service.delete(ctx as TxContext, next);
		ctx.status = 204;
	},

	createNote: async (ctx: Context, next: Next) => {
		ctx.body = await note_service.create(ctx as TxContext);
		ctx.status = 201;
	},

	getNote: async (ctx: Context, next: Next) => {
		ctx.body = await note_service.findNoteData(ctx as TxContext);
	},

	writeNote: async (ctx: Context, next: Next) => {
		ctx.body = await note_service.writeRecordData(ctx as TxContext);
	},
};
