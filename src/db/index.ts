import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";

// Create a PostgreSQL connection using the DATABASE_URL from Supabase
const client = postgres(process.env.DATABASE_URL!);

// Initialize Drizzle ORM with the schema
export const db = drizzle(client, { schema });

export type Database = typeof db;
