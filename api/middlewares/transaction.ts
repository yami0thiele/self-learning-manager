import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { Context, Next } from "koa";

export default function transaction() {
	return async function transactionMiddleware(ctx: Context, next: Next) {
		const db = ctx.db as BunSQLiteDatabase;
		await db.transaction(async (tx) => {
			await next().catch((e) => {
				tx.rollback();
				throw e;
			});
		});
	};
}
