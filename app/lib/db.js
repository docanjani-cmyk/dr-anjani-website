import { neon } from '@neondatabase/serverless'

// Lazily created: Next.js evaluates top-level module code at build time, and
// neon() throws when DATABASE_URL is absent, which would break `next build`
// on any deploy where the database isn't wired up yet.
let _sql = null

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

export function getSql() {
  if (!_sql) _sql = neon(process.env.DATABASE_URL)
  return _sql
}
