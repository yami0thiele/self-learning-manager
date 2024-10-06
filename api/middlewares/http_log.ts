import { Context, Next } from "koa";

export default function httpLog() {
  return async function httpLogMiddleware(ctx: Context, next: Next) {
    if (process.env.NODE_ENV === "production") {
      await next();
      return;
    }

    const req = ctx.request;
    const hash = Math.random().toString(16).slice(2);
    console.log({
      type: 'request',
      trace_id: hash,
      request_at: new Date(),
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body,
    })

    await next();

    const res = ctx.response;
    
    console.log({
      type: 'response',
      trace_id: hash,
      response_at: new Date(),
      status: res.status,
      headers: res.headers,
      body: res.body,
    })
  }
}
