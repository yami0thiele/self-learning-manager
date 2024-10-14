import Router from "koa-router";
import lenin_note_controller from "./lenin_note_controller";

const router = new Router();

router.get("/lenin-note", lenin_note_controller.index);
router.get("/lenin-note/books", lenin_note_controller.searchBooks);
router.get("/lenin-note/fts/books", lenin_note_controller.searchBooksFts);
router.post("/lenin-note/books", lenin_note_controller.createBook);
router.put("/lenin-note/books/:id", lenin_note_controller.editBook);
router.delete("/lenin-note/books/:id", lenin_note_controller.deleteBook);

router.post("/lenin-note/notes", lenin_note_controller.createNote);
router.get("/lenin-note/notes/:id", lenin_note_controller.getNote);
router.put("/lenin-note/notes/:id", lenin_note_controller.writeNote);

export default router;
