# Group 05 implementation evidence

**Task:** User-approved follow-up after Issue #30 FIX 10. No new Issue number.  
**Base:** `b949c89`  
**Branch:** `cursor/group05-figma-parity`

## Result

Logic implementation of 18 canonical Group 05 frames as mock UI. Visual/device PASS **not** claimed. PR/merge/Group 06 waiting review.

## Node-by-node

| Frame | Impl | Test | Not verified |
|-------|------|------|----------------|
| 05A | Header canvas, centered elapsed, more-horizontal, cards, 세트 추가/삭제, 운동 추가 | Screen + session + route | Pixel, device, live elapsed clock |
| 05A scrolled | Same screen `contentOffset` | Catalog registered | Actual scroll physics / pin |
| 05I | Anchored 92×118, no icons, 종료/추가/타이머 | Screen + route | Pixel menu shadow |
| 05F | Bottom sheet, ring, ±15, overlay skip, 16px CTA | Session + screen | Ring stroke math, sound, notification |
| 05Q Idle/Running/Paused | 타이머 시작 → 일시정지 → 초기화/계속 진행 | Session + screen | Ring animation, 00:00 hold on device |
| 05J | Reorder list + 완료; handle = move down | Session | Native drag |
| 05G/H/G2 | Replace batches, radio, 다른 운동 보기, 선택 완료 | Session + screen | Thumbnails (placeholders) |
| 05P | Dialog after completed sets | Session | — |
| 05K/L/M/O | Dialog copy from current Figma | Screen | — |
| 05N I/C | 02D start while session active | Route | Home/other-routine from 02A mid-session device |

## Verification

- `npx tsc --noEmit` — PASS
- eslint on Group 05 + related files — PASS (`--max-warnings 0`)
- Jest (runInBand, isolated files):
  - `__tests__/workout-session.test.ts` — PASS
  - `__tests__/active-workout-screen.test.tsx` — PASS
  - `__tests__/active-workout-route.test.tsx` — PASS
  - `__tests__/ui-catalog-shell.test.ts` — PASS
  - `__tests__/routine-detail-route.test.tsx` — PASS
  - `__tests__/exercise-selection-route.test.tsx` — PASS
  - `__tests__/routine-editor-route.test.tsx` — PASS
  - `__tests__/bundled-assets-fonts.test.ts` — PASS
- Visual screenshot compare: **not run** (no device / no RN screenshot harness)
- Runtime/Device: **NOT VERIFIED**

## Missing exports

- 05A machine thumbnails (chest / shoulder / pushdown): reused 02D bundled thumbs or placeholder
- `icon/more-horizontal`, `icon/more-vertical`, `icon/drag-handle`: rasterized from current Figma SVG geometry (no PNG export in file)
- Timer ring: drawn in RN, not a Figma asset
- 05Q `icon/close-circle`: not in current sheet; not added

## Conflicts left unresolved

- Canvas `#F6F7F7` vs Figma `#F7F8FA`
- User “진행시간 좌측” vs Figma header **center title** — Figma geometry used
- Matrix 05F RestLiveBar / no ±15 vs current Figma sheet / ±15 / `휴식 건너뛰기`
- Older 05Q `계속하기` + X vs current Figma `계속 진행` + overlay dismiss

## Known risk

- In-memory session only; process kill loses mock workout
- `endThenStartOther` with `blank` starts empty session
- 05M has no current Figma entry in 05I
- Card menu is inferred from 2026-09-10 lock + card `⋮`

## Next Owner

ChatGPT — review. No PR / no merge / no Group 06 until then.
