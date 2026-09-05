// Creates and migrates the booking_clicks table. Safe to re-run: every
// statement in schema.sql is IF NOT EXISTS, so this doubles as the migration
// step after a schema change.
//   node --env-file=.env.local scripts/init-db.mjs
import { readFile } from 'node:fs/promises'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env.local --yes` first.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const schema = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')

// neon()'s tagged-template form is single-statement; use the query form for the
// whole file. Comments are stripped before splitting on ';' — a semicolon
// inside a `--` comment would otherwise cut a statement in half.
const statements = schema
  .replace(/--[^\n]*/g, '')
  .split(';')
  .map(s => s.trim())
  .filter(Boolean)

for (const statement of statements) {
  await sql.query(statement)
}

console.log('booking_clicks table is ready (created or migrated in place).')
