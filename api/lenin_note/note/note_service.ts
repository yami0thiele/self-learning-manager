import { BadRequestError } from "../../exception/client_error";
import type { TxContext } from "../../middlewares/transaction";
import note_command from "./note_command";
import type { EditNoteRecordData, NoteData, NoteRecordData } from "./note_data";
import note_repository from "./note_repository";

export default {
	create: async (ctx: TxContext) => {
		const note = note_command.newNote(ctx.request.body as NoteData, ctx);
		if ((await note_repository.findNoteByBookId(note.book_id, ctx)) != null) {
			throw new BadRequestError("そのブックには既にノートが存在しています。");
		}
		return await note_repository.create(note, ctx);
	},

	findNoteData: async (ctx: TxContext) => {
		const noteId = Number.parseInt(ctx.params.id);
		// ノート
		const note = await note_repository.findNote(noteId, ctx);

		// 値
		const noteRecords = await note_repository.findNoteRecords(noteId, ctx);
		const transferedNoteRecords: {
			[id: number]: Array<{ note_column_id: number; content: string | null }>;
		} = {};
		noteRecords.forEach((noteRecord) => {
			if (noteRecord.note_columns_records == null) return;
			if (transferedNoteRecords[noteRecord.note_records.id] == null)
				transferedNoteRecords[noteRecord.note_records.id] = [];
			transferedNoteRecords[noteRecord.note_records.id].push({
				note_column_id: noteRecord.note_columns_records.note_column_id,
				content: noteRecord.note_columns_records.content,
			});
		});

		// レイアウト
		const noteColumns = await note_repository.findNoteColumns(
			note.note_template_id,
			ctx,
		);

		return {
			note_id: note.id,
			book_id: note.book_id,
			note_template_id: note.note_template_id,
			note_columns: noteColumns.map((note_column) => {
				return {
					id: note_column.id,
					name: note_column.name,
					type: note_column.type,
				};
			}),
			note_records: transferedNoteRecords,
		};
	},

	writeRecordData: async (ctx: TxContext) => {
		const noteRecord = note_command.newNoteRecord(
			ctx.request.body as NoteRecordData | EditNoteRecordData,
		);
		const registeredNoteRecord = await note_repository.createNoteRecord(
			noteRecord,
			ctx,
		);
		const registeredNoteColumnRecords =
			await note_repository.upsertNoteColumnRecords(
				noteRecord,
				registeredNoteRecord,
				ctx,
			);
		return {
			note_record_id: registeredNoteRecord.id ?? noteRecord.id,
			note_columns: registeredNoteColumnRecords,
			created_at: registeredNoteRecord.created_at,
			updated_at: registeredNoteRecord.updated_at,
		};
	},
};
