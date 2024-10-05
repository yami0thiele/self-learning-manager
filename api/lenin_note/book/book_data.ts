export interface BookData {
	title: string;
	author?: string | null;
	publisher?: string | null;
	published_at?: string | null;
}

export interface editBookData extends BookData {
	id: number;
}
