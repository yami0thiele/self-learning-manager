import Router from "koa-router";
import lenin_note_controller from "./lenin_note/lenin_note_controller";

export const router = new Router();

router.get("/", (ctx) => {
	ctx.body = "Hello World";
});

router.get("/lenin-note/", lenin_note_controller.index);
