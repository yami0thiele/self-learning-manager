import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	author: text("author"),
	publisher: text("publisher"),
	published_at: text("published_at"),
});

export const noteTemplates = sqliteTable("note_templates", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const noteColumns = sqliteTable("note_columns", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	note_template_id: integer("note_template_id")
		.references(() => noteTemplates.id)
		.notNull(),
	type: text("type").notNull(),
});

export const notes = sqliteTable("notes", {
	id: integer("id").primaryKey(),
	book_id: integer("book_id")
		.references(() => books.id)
		.notNull(),
	note_template_id: integer("note_template_id")
		.references(() => noteTemplates.id)
		.notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIME`),
	updated_at: text("updated_at").default(sql`CURRENT_TIME`),
});

export const noteRecords = sqliteTable("note_records", {
	id: integer("id").primaryKey(),
	note_id: integer("note_id")
		.references(() => notes.id)
		.notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIME`),
	updated_at: text("updated_at").default(sql`CURRENT_TIME`),
});

export const noteColumnsRecords = sqliteTable("note_columns_records", {
	id: integer("id").primaryKey(),
	note_column_id: integer("note_column_id")
		.references(() => noteColumns.id)
		.notNull(),
	note_record_id: integer("note_record_id")
		.references(() => noteRecords.id)
		.notNull(),
	content: text("content"),
	created_at: text("created_at").default(sql`CURRENT_TIME`),
	updated_at: text("updated_at").default(sql`CURRENT_TIME`),
});
