# FUT.GG Korean Translation v3.0

[한국어](README.md) | **English**

A Tampermonkey userscript that displays Korean translations for [FUT.GG](https://www.fut.gg/) menus, player attributes, roles, PlayStyles, and common Evolution, Objective, and SBC features. The current work focuses on FUT.GG's FC 27 interface.

**[Install v3.0](https://raw.githubusercontent.com/JHwang831/FUT.GG-Custom-Translation-Korean-/main/FUTGG_KOR_3.0.user.js)** · [View script](FUTGG_KOR_3.0.user.js) · [Report an issue](https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-/issues)

## Installation and updates

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Open **Install v3.0** above and install the script through Tampermonkey.
3. Refresh [FUT.GG](https://www.fut.gg/).

If the installation screen does not open, copy the entire contents of `FUTGG_KOR_3.0.user.js` into a new Tampermonkey script and save it. When upgrading, replace the existing translation script or disable the previous one so only one copy runs. Users do not need Node.js or npm.

This build uses the repository's script and metadata URLs for update checks. The Greasy Fork distribution is maintained separately and is not changed by this upload. If you used a development build numbered 3.1.x, install this consolidated 3.0 release manually or replace the existing script contents. Its internal version is `3.0.0`.

## Translation scope

| Area | Included content |
| --- | --- |
| Common interface | Navigation, search hints, filters, sorting, buttons, sign-in prompts |
| Players | List/detail attributes, roles, PlayStyles, GG Ratings, market information, tier voting |
| Evolutions and Evo Lab | Requirements, upgrades, player pickers, generation settings, draft and upgrade prompts |
| Objectives and Live Events | Match/win/goal/assist requirements, quantity-based objective titles, entry requirements, rewards |
| SBCs | Common card fields, squad requirements, rewards, solver-related UI |
| Time | Day/hour/minute/second countdowns, relative times, start/end messages, chart dates |

Player names and identity values such as clubs, leagues, nations, and seasons remain in their original language. Individual Evolution, Objective, and SBC names and introductions also remain unchanged. Reusable role Evolution titles such as `RM Roles++` are translated, as are quantity-based objective titles such as `Win 1` and `Play 2`.

News and general long introductions are excluded. Registered functional messages and completion requirements may be translated regardless of length. Text embedded inside images or canvases is outside the script's scope.

## What's new in v3.0

- Separates the dictionary, condition rules, content policy, and runtime while producing one installable script.
- Batches work on changed subtrees after the initial scan and caches source text and translation results.
- Handles voting questions, counts, sign-in prompts, and time expressions split across React text nodes while preserving existing elements and click handlers.
- Fixes live countdown ticks, event start/end wording, and incorrect translation exclusions on player SBC cards.
- Expands coverage for Evo Lab pickers, settings, sign-in prompts, and Evolution requirements and upgrades.
- Adds birth/added-date filters, price update/comparison labels, and chart dates.

The translation runtime uses no external translation API or external runtime library. Its dictionary and implementation are bundled in the installable script.

## Limitations and issue reports

New content or changes to FUT.GG's wording and page structure may leave some text untranslated. Original text may briefly appear depending on browser and extension timing. Complete site coverage and identical behavior across all browsers are not guaranteed.

If translations do not appear, check that the script is enabled and allowed to run on the site, disable duplicate translation scripts, and refresh the page.

When opening an [issue](https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-/issues), include the page URL, original text, suggested translation, script version, and a screenshot if possible. Leave out login details and other personal information.

## Development

The installable files are generated artifacts. Edit `src/` and rebuild instead of editing the bundled script directly. Development and checks used Node.js 24.

```sh
npm ci
npm run build
npm test
npm run check
```

| Path | Purpose |
| --- | --- |
| `FUTGG_KOR_3.0.user.js` | Single installable userscript |
| `FUTGG_KOR_3.0.meta.js` | Metadata for update checks |
| `src/ko-KR.json` | Static UI dictionary |
| `src/*rules.js` | Role, time, reward, Evolution, Objective, and SBC rules |
| `src/content-policy.js` | Identity, content-name, and news exclusions |
| `src/runtime.js` | DOM handling, source/result caches, mutation observation |
| `src/userscript-header.txt` | Userscript metadata |
| `scripts/build.cjs` | Artifact generation and consistency checks |
| `tests/` | DOM updates, translation behavior, exclusions, and fixtures |

`jsdom` is a development-only dependency. Bundled fixtures cover requirements, split phrases, inserted content, changing counts, click handlers, original text preservation, and countdowns. Additional public-page checks run if locally collected `research/*.html` files are available; otherwise those optional checks report SKIP.

Browser checks used the public FUT.GG React application through a local proxy to verify homepage countdowns, player SBC cards, and Evo Lab sign-in prompts. They do not cover every browser or authenticated save/delete/EA club-sync flows.

## Author

[@JHwang831](https://github.com/JHwang831) · JHwang831(리스제임스의목발)

A community translation project maintained independently of FUT.GG and EA SPORTS.
