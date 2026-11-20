import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const globalForDb = globalThis

const pool = globalForDb.neonPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 4,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
})

if (process.env.NODE_ENV !== 'production') globalForDb.neonPool = pool

export const db = drizzle(pool, { schema })
