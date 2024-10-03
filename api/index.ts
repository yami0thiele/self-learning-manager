import Koa from "koa";
import koaBodyparser from "koa-bodyparser";
import db from "./middlewares/db";
import transaction from "./middlewares/transaction";
import { router } from "./router";

const app = new Koa();

// Trust Proxy
app.proxy = true;

// Body Parser
app.use(koaBodyparser());

// Db, Transaction
app.use(db()).use(transaction());

// Routes
app.use(router.routes());

app.listen(process.env.PORT || 3000);
