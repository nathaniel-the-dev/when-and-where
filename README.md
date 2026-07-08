# When & Where — Timezone Converter

A real-time, dual-timezone converter with an interactive world map. Select any two timezones and see the current time, offset, and geographic location — all in one place.

![Preview](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)
![Mapbox](https://img.shields.io/badge/Mapbox-GL-000000?logo=mapbox)

---

## Features

- **Live dual clocks** — Real-time clocks (with seconds) for two selected timezones, updating every second
- **Smart search** — Search 400+ timezones by country, city, or abbreviation via an accessible, themed dropdown
- **Interactive map** — Click anywhere on the world map to drop a pin; the timezone is identified automatically via reverse geocoding
- **Drag-and-drop markers** — Reposition markers on the map to update timezone selections
- **Timezone offset** — Instantly see how many hours ahead or behind one timezone is from the other
- **Swap timezones** — One-click swap between primary and secondary selections
- **Auto-detect** — Detect your current timezone from your browser with a single click
- **Fully responsive** — Side-by-side layout on desktop, stacked on mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript (strict) |
| State | Redux Toolkit |
| Styling | Tailwind CSS 3 |
| Time | moment-timezone + @vvo/tzdb |
| Map | Mapbox GL JS v2 |
| UI | react-select |
| Build | Vite + SWC |

## Getting Started

```bash
npm install
cp .env.example .env
```

Add your [Mapbox public access token](https://account.mapbox.com/access-tokens/) to `.env`:

```
VITE_MAPBOX_API_KEY=pk.your_token_here
```

```bash
npm run dev
```

## License

MIT — see [LICENSE](LICENSE).
