// Scrapes the public itch.io profile and writes src/data/itchGames.json.
// itch's official API needs a private key, and the profile page sends no CORS headers,
// so this runs at build time. If the fetch fails, the committed JSON is kept.
import { writeFileSync } from 'node:fs'

const PROFILE = 'https://slimer37.itch.io'
const OUT = new URL('../src/data/itchGames.json', import.meta.url)

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')

try {
  const res = await fetch(PROFILE, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()

  const cells = html.split(/<div[^>]*class="game_cell /).slice(1)
  const games = cells.map(cell => {
    const id = cell.match(/data-game_id="(\d+)"/)?.[1]
    const url = cell.match(/<a href="([^"]+)"[^>]*class="title game_link"/)?.[1]
    const title = cell.match(/class="title game_link">([^<]*)</)?.[1]
    const thumb = cell.match(/data-lazy_src="([^"]+)"/)?.[1]
    const genre = cell.match(/class="game_genre">([^<]*)</)?.[1]
    const text = cell.match(/class="game_text"[^>]*>([^<]*)</)?.[1]
    return {
      id, url, title: title && decode(title), thumb: thumb && decode(thumb),
      genre: genre && decode(genre), blurb: text && decode(text),
      browser: cell.includes('Play in browser'),
    }
  }).filter(g => g.id && g.url && g.title)

  if (games.length === 0) throw new Error('no games parsed')
  writeFileSync(OUT, JSON.stringify(games, null, 2) + '\n')
  console.log(`itch.io: wrote ${games.length} games`)
} catch (e) {
  console.warn(`itch.io fetch failed (${e.message}); keeping existing itchGames.json`)
}
