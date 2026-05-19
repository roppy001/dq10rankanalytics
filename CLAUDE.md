# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page web application for analyzing Dragon Quest X (DQ10) in-game ranking data across competitive events (大富豪, 釣り大会, スライムレース, etc.). No build system — served as static files.

## Running Locally

No npm or build step. Serve the directory with any local HTTP server (required for XHR to load `.json.gz` files):

```powershell
# Python (simplest)
python -m http.server 8080

# Node.js
npx serve .
```

Then open `http://localhost:8080/rankanalytics.html` in a browser.

There are no automated tests.

## Architecture

**Entry point:** `rankanalytics.html` — includes all scripts/styles inline and contains template HTML (elements with `.ra-template` class) that is cloned and populated at runtime.

**All application logic:** `js/rankanalytics.js` (~2000 lines, ES5, no modules)

**Data files:** `json/` directory — gzip-compressed JSON files named `{raceType}{roundId}.json.gz` (e.g. `daifugo19.json.gz`). The `json/` directory is gitignored; data files must be maintained separately.

### Key Configuration Objects

`RACE_TYPE_CONFIG_MAP` — defines the 7 race types (daifugo, daifugom, fishing, pencil, casinoraid, slimerace, etc.)

`RACE_CONFIG_MAP` — 70+ entries, one per round of each race type; drives all UI labels, date ranges, prediction types, and update intervals.

### Global State

`selection` object tracks the current navigation state (which race, which screen, which character). The three screens are:
- Screen 0: Dashboard — ranking borders, score predictions, ranked characters
- Screen 1: Character detail — score history, radar chart (activity by day/hour)
- Screen 2: Diff ranking — largest score movers between snapshots

### Data Flow

1. User selects a race → XHR fetches the corresponding `.json.gz`
2. Pako decompresses the response → JSON parsed into the `data` global
3. UI renders by cloning `.ra-template` elements and binding jQuery click handlers
4. Charts rendered with C3.js (line/bar) and Chart.js (radar)

### Data Structure

```javascript
data.subraceList[i] = {
  snapshotList: [{ date, rankList, idMapper, rankMapper, diffs }],
  displayNameList: [{ name }],
  maxDiff, characterIdToIndex, characterIds
}
```

## Tech Stack

| Concern | Library |
|---------|---------|
| DOM / AJAX | jQuery 1.x |
| Layout | Bootstrap 3 |
| Line/bar charts | C3.js + D3.js |
| Radar charts | Chart.js |
| Decompression | Pako.js |

All libraries are vendored in `js/` and `css/` — do not import from CDNs.

## Conventions

- ES5 only — no arrow functions, `const`/`let`, template literals, or modules.
- Configuration changes (new race round, title, dates) go in `RACE_CONFIG_MAP` and `RACE_TYPE_CONFIG_MAP` in `rankanalytics.js`.
- Japanese locale throughout: day-of-week and holiday logic targets JST; `HOLIDAY_MAP` in `rankanalytics.js` holds static holiday data by year.
- Template pattern: define structure once in HTML with class `ra-template`, clone with jQuery `.clone()`, fill in data, append to DOM.

## Available Skills

### `/add-daifugo`

大富豪段位戦の新ラウンドを `js/rankanalytics.js` に追加するスキル。

**引数:** `<次のバージョンアップ日 YYYY-MM-DD> <次の次のバージョンアップ概算日 YYYY-MM-DD>`

**例:** `/add-daifugo 2026-06-18 2026-09-17`

実行すると以下を自動処理する:
1. 現在の最新ラウンド番号を確認
2. 既存最新エントリの `endTime` を更新
3. 新ラウンドのエントリを `RACE_CONFIG_MAP` に追加
4. `RACE_TYPE_CONFIG_MAP.daifugo.rounds` 先頭に新ラウンドを追加
