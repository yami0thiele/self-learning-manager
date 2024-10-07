import Koa from "koa";
import koaBodyparser from "koa-bodyparser";
import leninNoteRouter from "./lenin_note/router";
import db from "./middlewares/db";
import transaction from "./middlewares/transaction";
import router from "./router";
import errorHandler from "./middlewares/error_handler";
import httpLog from "./middlewares/http_log";
import cors from "@koa/cors";

const app = new Koa();

// Cors
app.use(cors());

// Trust Proxy
app.proxy = true;

// Body Parser
app.use(koaBodyparser());

// HTTP Logging
app.use(httpLog());

// Error Handler
app.use(errorHandler());

// Db, Transaction
app.use(db()).use(transaction());

// Routes
app.use(router.routes());
app.use(leninNoteRouter.routes());

app.listen(process.env.PORT || 3000);
