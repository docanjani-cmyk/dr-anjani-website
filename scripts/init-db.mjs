// Creates the booking_clicks table. Run once after provisioning the database:
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
// whole file.
for (const statement of schema.split(';').map(s => s.trim()).filter(Boolean)) {
  await sql.query(statement)
}

console.log('booking_clicks table is ready.')
