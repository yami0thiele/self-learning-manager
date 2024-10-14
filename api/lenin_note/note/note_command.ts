import { NotFoundError } from "../../exception/client_error";
import type { TxContext } from "../../middlewares/transaction";
import book_repository from "../book/book_repository";
import type { EditNoteRecordData, NoteData, NoteRecordData } from "./note_data";

export default {
	newNote: (data: NoteData, ctx: TxContext) => {
		const book = book_repository.find(data.book_id, ctx);
		if (book == null) {
			throw new NotFoundError("書籍が見つかりません。");
		}

		// TODO: ノートテンプレートもここに

		return {
			book_id: data.book_id,
			note_template_id: data.note_template_id,
		};
	},

	newNoteRecord: (data: NoteRecordData | EditNoteRecordData) => {
		return {
			id: data.id,
			note_id: data.note_id,
			note_columns: data.note_columns,
		};
	},
};
