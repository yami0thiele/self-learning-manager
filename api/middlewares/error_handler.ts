import type { Context, Next } from "koa";
import { ClientError } from "../exception/client_error";

export default function errorHandler() {
	return async function errorHandlerMiddleware(ctx: Context, next: Next) {
		try {
			await next();
		} catch (error) {
			if (error instanceof ClientError) {
				ctx.status = error.status;
				ctx.body = {
					message: ctx.message,
				};
				return;
			}

			console.log(error);
			ctx.status = 500;
			ctx.body = {
				message: "Internal Server Error",
			};
		}
	};
}
