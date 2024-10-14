import { asc, eq, sql } from "drizzle-orm";
import * as schema from "../../db/schema/lenin-note-schema";
import type { TxContext } from "../../middlewares/transaction";
import type { NoteData, NoteRecord, NoteRecordData } from "./note_data";

export default {
	create: async (noteData: NoteData, ctx: TxContext) => {
		const [registered] = await ctx.tx
			.insert(schema.notes)
			.values([noteData])
			.returning();
		return registered;
	},

	findNote: async (noteId: number, ctx: TxContext) => {
		const [note] = await ctx.tx
			.select()
			.from(schema.notes)
			.where(eq(schema.notes.id, noteId));
		return note;
	},

	findNoteByBookId: async (bookId: number, ctx: TxContext) => {
		const [note] = await ctx.tx
			.select()
			.from(schema.notes)
			.where(eq(schema.notes.book_id, bookId));
		return note;
	},

	findNoteColumns: async (noteTemplateId: number, ctx: TxContext) => {
		const noteColumns = await ctx.tx
			.select()
			.from(schema.noteColumns)
			.where(eq(schema.noteColumns.note_template_id, noteTemplateId));
		return noteColumns;
	},

	findNoteRecords: async (noteId: number, ctx: TxContext) => {
		const noteRecords = await ctx.tx
			.select()
			.from(schema.noteRecords)
			.leftJoin(
				schema.noteColumnsRecords,
				eq(schema.noteRecords.id, schema.noteColumnsRecords.note_record_id),
			)
			.where(eq(schema.noteRecords.note_id, noteId))
			.orderBy(asc(schema.noteRecords.id));
		return noteRecords;
	},

	createNoteRecord: async (noteRecordData: NoteRecordData, ctx: TxContext) => {
		const [registered] = await ctx.tx
			.insert(schema.noteRecords)
			.values([
				{
					...(noteRecordData.id != null ? { id: noteRecordData.id } : {}),
					note_id: noteRecordData.note_id,
				},
			])
			.onConflictDoUpdate({
				target: [schema.noteRecords.id],
				set: {
					updated_at: new Date().toISOString(),
				},
			})
			.returning();
		return registered;
	},

	updateNoteRecord: async (noteRecordData: NoteRecordData, ctx: TxContext) => {
		const [updated] = await ctx.tx
			.update(schema.noteRecords)
			.set({
				updated_at: new Date().toISOString(),
			})
			.where(eq(schema.noteRecords.id, noteRecordData.note_id))
			.returning();
		return updated;
	},

	upsertNoteColumnRecords: async (
		noteRecordData: NoteRecordData,
		noteRecord: NoteRecord,
		ctx: TxContext,
	) => {
		// TODO: 無関係なidペアが渡されたときに上書きされる問題を解消する。
		const updatedOrRegistered = await ctx.tx
			.insert(schema.noteColumnsRecords)
			.values(
				noteRecordData.note_columns.map((noteColumn) => {
					const v: {
						id?: number;
						note_column_id: number;
						note_record_id: number;
						content: string;
					} = {
						note_column_id: noteColumn.note_column_id,
						note_record_id: noteRecord.id,
						content: noteColumn.content,
					};
					if (noteColumn.id != null) {
						v.id = noteColumn.id;
					}
					return v;
				}),
			)
			.onConflictDoUpdate({
				target: [schema.noteColumnsRecords.id],
				set: {
					content: sql.raw(
						`excluded.${schema.noteColumnsRecords.content.name}`,
					),
					updated_at: new Date().toISOString(),
				},
			})
			.returning();
		return updatedOrRegistered;
	},
};
