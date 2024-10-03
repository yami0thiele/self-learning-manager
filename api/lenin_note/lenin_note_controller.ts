import { sql } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { Context, Next } from "koa";

export default {
	index: (ctx: Context, next: Next) => {
		const query = sql`select "hello world" as text`;
		const result = (ctx.db as BunSQLiteDatabase).get<{ text: string }>(query);
		ctx.body = result;
	},
};
