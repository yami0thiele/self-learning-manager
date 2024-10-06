import type { Next } from "koa";
import type { TxContext } from "../../middlewares/transaction";
import book_command from "./book_command";
import type { BookData } from "./book_data";
import book_repository from "./book_repository";
import { BadRequestError, NotFoundError } from "../../exception/client_error";

export default {
	find: async (ctx: TxContext, next: Next) => {
		const id = Number.parseInt(ctx.params.id);
		if (Number.isNaN(id)) {
			throw new BadRequestError('idの形式が不正です');
		}
		const book = await book_repository.find(id, ctx);
		if (book == null) {
			throw new NotFoundError('書籍が見つかりません。');
		}
		return book;
	},

	findAll: async (ctx: TxContext, next: Next) => {
		const query = ctx.request.query;
		return await book_repository.findAll(
			{
				title: query.title as string,
				author: query.author as string,
				publisher: query.publisher as string,
				published_at: query.published_at as string,
				count: !Number.isNaN(Number.parseInt(query.count as string))
					? Number.parseInt(query.count as string)
					: 10,
				offset: !Number.isNaN(Number.parseInt(query.offset as string))
					? Number.parseInt(query.offset as string)
					: 0,
			},
			ctx,
		);
	},

	fts: async (ctx: TxContext, next: Next) => {
		const query = ctx.request.query;
		return await book_repository.fts(query.q as string, ctx);
	},

	create: async (ctx: TxContext, next: Next) => {
		const book = book_command.newBook(ctx.request.body as BookData);
		return await book_repository.create(book, ctx);
	},

	edit: async (ctx: TxContext, next: Next) => {
		const id = Number.parseInt(ctx.params.id);
		if (Number.isNaN(id)) {
			throw new BadRequestError('idの形式が不正です');
		}

		if ((await book_repository.find(id, ctx)) == null) {
			throw new NotFoundError('書籍が見つかりません。');
		}

		const body = ctx.request.body as BookData;
		const book = book_command.editBook({
			id: id,
			title: body.title,
			author: body.author,
			publisher: body.publisher,
			published_at: body.published_at,
		});
		return await book_repository.update(book, ctx);
	},

	delete: async (ctx: TxContext, next: Next) => {
		const id = Number.parseInt(ctx.params.id);
		if (Number.isNaN(id)) {
			throw new BadRequestError('idの形式が不正です');
		}

		if ((await book_repository.find(id, ctx)) == null) {
			throw new NotFoundError('書籍が見つかりません。');
		}

		await book_repository.delete(id, ctx);
	}
};
