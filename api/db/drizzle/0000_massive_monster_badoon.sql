CREATE TABLE `books` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text,
	`publisher` text,
	`published_at` text
);
--> statement-breakpoint
CREATE TABLE `note_columns` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`note_template_id` integer NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`note_template_id`) REFERENCES `note_templates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `note_columns_records` (
	`id` integer PRIMARY KEY NOT NULL,
	`note_column_id` integer NOT NULL,
	`note_record_id` integer NOT NULL,
	`content` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`note_column_id`) REFERENCES `note_columns`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`note_record_id`) REFERENCES `note_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `note_records` (
	`id` integer PRIMARY KEY NOT NULL,
	`note_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`note_id`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `note_templates` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`book_id` integer NOT NULL,
	`note_template_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`note_template_id`) REFERENCES `note_templates`(`id`) ON UPDATE no action ON DELETE no action
);
