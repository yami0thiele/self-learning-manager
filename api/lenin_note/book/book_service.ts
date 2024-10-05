import type { Next } from "koa";
import type { TxContext } from "../../middlewares/transaction";
import book_command from "./book_command";
import type { BookData } from "./book_data";
import book_repository from "./book_repository";

export default {
	find: async (ctx: TxContext, next: Next) => {
		const id = Number.parseInt(ctx.params.id);
		if (Number.isNaN(id)) {
			// TODO: エラーハンドラ (middleware) を実装する
			ctx.status = 400;
			return;
		}
		return await book_repository.find(id, ctx);
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

	create: async (ctx: TxContext, next: Next) => {
		const book = book_command.newBook(ctx.request.body as BookData);
		return await book_repository.create(book, ctx);
	},

	edit: async (ctx: TxContext, next: Next) => {
		const id = Number.parseInt(ctx.params.id);
		if (Number.isNaN(id)) {
			// TODO: エラーハンドラ (middleware) を実装する
			ctx.status = 400;
			return;
		}

		if ((await book_repository.find(id, ctx)) == null) {
			ctx.status = 404;
			return;
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
};
