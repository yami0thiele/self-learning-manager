import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import type { Context, Next } from "koa";

export interface DbContext extends Context {
	db: ReturnType<typeof drizzle>;
}

export default function db() {
	return async function dbMiddleware(ctx: Context, next: Next) {
		const sqlite = new Database(
			`./_store/${process.env.DB_DATABASE || "database"}.db`,
		);
		ctx.db = drizzle(sqlite);

		await next();
	};
}
