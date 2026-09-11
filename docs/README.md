# BRF Night Ops KPI — phone app

An installable web app (PWA) for the Night Ops KPI tracker. It reads
`kpi.json` in this repo to find tonight's Cloudflare address, then opens it.

## Serving it

GitHub → this repo → **Settings → Pages**

- **Source:** Deploy from a branch
- **Branch:** `main`, folder **`/docs`**

Give it a minute, then it is live at:

    https://<user>.github.io/tunnel-config/

The repo has to be **public**. Private-repo Pages needs a paid plan, and the
app reads `kpi.json` over plain https with no token.

## Installing on a phone

- **Android:** open the address in Chrome, tap *Add to home screen* (the app
  offers a button).
- **iPhone:** open it in Safari, tap *Share* → *Add to Home Screen*.

## What is in here

| File | |
|---|---|
| `index.html` | the launcher — looks up the address and opens the tracker |
| `manifest.json` | name, icon and colours for the installed app |
| `sw.js` | service worker; caches only this launcher, never the tracker |
| `icon-192.png`, `icon-512.png` | home screen icons |

`kpi.json` sits in the repo root and is rewritten by the tracker on every
tunnel start. Nothing here needs changing when the address changes.
