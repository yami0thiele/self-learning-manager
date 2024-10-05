import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database(
	`./_store/${process.env.DB_DATABASE || "database"}.db`,
);

const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./db/drizzle" });
