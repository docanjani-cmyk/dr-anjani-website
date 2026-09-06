// Tell IndexNow (Bing, Yandex, Seznam, Naver) that pages have changed, rather
// than waiting weeks for them to notice. Google ignores IndexNow.
//
//   node scripts/indexnow.mjs                 # every URL in the sitemap
//   node scripts/indexnow.mjs /hysterectomy   # just the pages you name
//   node scripts/indexnow.mjs --dry-run       # print the payload, send nothing
//
// Run it after a deploy, not before: the search engine fetches the key file
// from the live site to verify ownership, so submitting a URL that is not yet
// deployed wastes the ping.
import { readdirSync } from 'node:fs'

// The key is public by design — search engines verify ownership by fetching the
// key file and checking it contains this same string — so it lives in the repo
// rather than in an environment variable. It must match the filename of the
// key file in /public, which the check below enforces.
const INDEXNOW_KEY = '8bad25ba83d0b4aae9abb90cb98d5f00'
const HOST = 'anjanidixit.com'
const ORIGIN = `https://${HOST}`
const KEY_LOCATION = `${ORIGIN}/${INDEXNOW_KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow'

/** Paths are accepted as `/hysterectomy` or as full URLs. */
const indexNowPayload = paths => ({
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: paths.map(p => (p.startsWith('http') ? p : `${ORIGIN}${p.startsWith('/') ? p : `/${p}`}`)),
})

// Catch the mismatch here rather than as a 403 from the API.
if (!readdirSync(new URL('../public', import.meta.url)).includes(`${INDEXNOW_KEY}.txt`)) {
  console.error(`\n  public/${INDEXNOW_KEY}.txt is missing — the key file must match the key.\n`)
  process.exit(1)
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const paths = args.filter(a => !a.startsWith('--'))

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
}

// A submission is rejected outright if the key file is missing, so check it
// first and say so plainly rather than reporting an opaque 403.
async function keyFileIsLive() {
  try {
    const res = await fetch(KEY_LOCATION)
    return res.ok
  } catch (e) {
    return false
  }
}

const urls = paths.length ? paths : await sitemapUrls()
const payload = indexNowPayload(urls)

console.log(`\n  ${payload.urlList.length} URL${payload.urlList.length === 1 ? '' : 's'} → IndexNow`)
for (const u of payload.urlList) console.log(`    ${u}`)
console.log(`  key file: ${KEY_LOCATION}`)

if (dryRun) {
  console.log('\n  --dry-run: nothing sent.\n')
  process.exit(0)
}

if (!(await keyFileIsLive())) {
  console.error(`\n  The key file is not reachable at ${KEY_LOCATION}.`)
  console.error('  Deploy first — without it every submission is rejected.\n')
  process.exit(1)
}

const res = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
})

// 200 accepted, 202 accepted but the key is still being verified. Both are fine.
if (res.status === 200 || res.status === 202) {
  console.log(`\n  Accepted (${res.status}). Indexing is not instant — expect days, not minutes.\n`)
} else {
  console.error(`\n  Rejected: ${res.status} ${res.statusText}`)
  console.error(`  ${(await res.text()).slice(0, 300)}\n`)
  process.exit(1)
}
