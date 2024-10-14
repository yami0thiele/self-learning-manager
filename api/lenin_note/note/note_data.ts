export interface NoteTemplate {
  id: number;
  name: string;
}

export interface NoteColumn {
  id: number;
  note_template_id: number;
  name: string;
  type: NoteColumnType;
}

export type NoteColumnType = "text"

export interface Note {
  id: number;
  book_id: number;
  note_template_id: number;
}

export type NoteData = {
  book_id: number;
  note_template_id: number;
};

export interface NoteRecord {
  id: number;
  note_id: number;
}

export interface NoteColumnRecord {
  id: number;
  note_column_id: number;
  note_record_id: number;
  content: string;
}

export interface NoteRecordData {
  id?: number | null;
  note_id: number;
  note_columns: Array<
    { id?: number | null;note_column_id: number; content: string }
  >;
}

export interface EditNoteRecordData extends NoteRecordData {
  id: number;
  note_columns: Array<
  { id: number; note_column_id: number; content: string }
>;
}
