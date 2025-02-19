import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
const DATABASE_URL="postgresql://neondb_owner:npg_QjInTkl1r8cs@ep-billowing-tree-a65welqk.us-west-2.aws.neon.tech/neondb?sslmode=require"


neonConfig.webSocketConstructor = ws;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });
