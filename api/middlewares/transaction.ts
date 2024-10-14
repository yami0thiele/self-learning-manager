import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import type { Next } from "koa";
import type { DbContext } from "./db";

export interface TxContext extends DbContext {
	tx: SQLiteTransaction<
		"sync",
		void,
		Record<string, unknown>,
		ExtractTablesWithRelations<Record<string, unknown>>
	>;
}

export default function transaction() {
	return async function transactionMiddleware(ctx: DbContext, next: Next) {
		let insideError: Error | null = null;
		await ctx.db
			.transaction(async (tx) => {
				ctx.tx = tx;
				await next().catch(async (e) => {
					insideError = e;
					ctx.tx.rollback();
				});
			})
			.catch((_) => {});
		if (insideError != null) {
			throw insideError;
		}
	};
}
