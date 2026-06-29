import { Pool } from "pg";

// Single shared pool across hot-reloads / serverless invocations.
// max:5 prevents pool exhaustion under burst traffic (the DB is shared with the BOB app).
declare global {
  // eslint-disable-next-line no-var
  var _l7Pool: Pool | undefined;
}

function makePool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  return new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });
}

export const pool: Pool = global._l7Pool ?? makePool();
if (process.env.NODE_ENV !== "production") global._l7Pool = pool;

/**
 * Run a query, never throw. Returns [] on any failure (DB unreachable at build
 * time, transient error at runtime). Callers render an empty/empty-state UI.
 */
export async function safeQuery<T>(text: string, params?: unknown[]): Promise<T[]> {
  try {
    const res = await pool.query(text, params);
    return res.rows as T[];
  } catch (err) {
    console.error("[db] query failed:", (err as Error).message);
    return [];
  }
}
