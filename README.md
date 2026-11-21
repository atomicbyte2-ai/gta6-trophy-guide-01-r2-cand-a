# LEONIDA TROPHY ATLAS — GTA 6 Trophy Guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/atomicbyte2-ai/gta6-trophy-guide-01-r2-cand-a/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/atomicbyte2-ai/gta6-trophy-guide-01-r2-cand-a/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

A complete, offline GTA 6 trophy guide in a dense 3-pane tracker: **all 55 official trophies** — exact names,
official descriptions, grades and Gamerscore — with a plain-words guide for each, every step cited to its
sources, a platinum roadmap, a spoiler-safe checklist and a missable-trophy warning.

- **55 trophies:** 1 Platinum · 2 Gold · 6 Silver · 46 Bronze · 1,000 Gamerscore · 28 PSN-hidden
- **Audit strip:** counts computed live from the app's own data — 109/109 guide steps cited, 55/55 guides cite sources, 54 backed by 2+ sources
- **3-pane tracker:** trophy list · detail with per-step citations, dispute boxes and a YOUR COUNT widget · next-up roadmap + sources rail
- **Checklist** saved in localStorage, with progress (x/55, by grade), export/import and reset
- **Filters** by kind, grade, earned/unearned, PSN-hidden, Disputed, Missable, Unconfirmed, plus text search
- **Spoiler shield** hides story trophies until earned (persisted)
- **Platinum roadmap:** 3 phases, ~200 hours, difficulty 4/10
- **Missable callout:** Positive Mental Attitude — the Chapter 1 balcony meditation, with both sides of the dispute shown and our call
- **Honest guides:** where a hidden trophy's method is still unconfirmed by the community, the guide says so instead of inventing one

## Run it

```sh
node serve.ts        # then open http://localhost:8080
# or build the make.fun dossier:
node main.ts         # writes /output/dossier.json (MAKEFUN_OUTPUT_DIR overrides)
```

The app is plain static files under `app/` — it works offline in desktop Chrome, with no
external requests. Trophy data lives in `app/data/trophies.json` (also embedded as a
fallback in `app/main.js` so `index.html` opens from `file://` too).

## Sources

- [1] Output Lag — “GTA 6 Trophy List” — outputlag.com/guides/gta-6-trophy-list
- [2] GTAVibes — “GTA 6 Trophy List” — gtavibes.com/guides/gta-6-trophy-list-achievements
- [3] PowerPyx — “GTA 6 All Meditation Spot Locations” — powerpyx.com

Guides are written in our own words. No Rockstar logo or official artwork is used;
all decoration is CSS/SVG drawn for this guide.

## License

MIT — see [LICENSE](LICENSE).
