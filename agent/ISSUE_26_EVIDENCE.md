# Issue #26 / DEV-012 Evidence

## Task
Bundle official SUIT font and replace temporary system-font/text-glyph/gray thumbnails with Figma-derived local assets on implemented 00–02 screens.

## Branch / Commit
- Branch: `cursor/dev-012-suit-assets-368a`
- Commit: `5e7db3c`

## Exported assets (14)
| id | Figma node | Figma name | path |
|---|---|---|---|
| tampin-logo-white | 1961:8910 | TampinLogo_White | assets/figma/logos/tampin-logo-white.png |
| tampin-logo-primary | 43:3053 | AppLogo | assets/figma/logos/tampin-logo-primary.png |
| icon-plus | 2483:8336 | icon/plus | assets/figma/icons/icon-plus.png |
| icon-chevron-right | 2483:8368 | icon/chevron-right | assets/figma/icons/icon-chevron-right.png |
| icon-folder-chevron-expanded | 2333:7701 | icon/folder-chevron-expanded | assets/figma/icons/icon-folder-chevron-expanded.png |
| bottom-tab-routine | 2078:2189 | bottom-tab/routine | assets/figma/icons/bottom-tab-routine.png |
| bottom-tab-analysis | 2078:2197 | bottom-tab/analysis | assets/figma/icons/bottom-tab-analysis.png |
| bottom-tab-settings | 2078:2204 | bottom-tab/settings | assets/figma/icons/bottom-tab-settings.png |
| icon-arrow-left | 2333:7825 | icon/arrow-left | assets/figma/icons/icon-arrow-left.png |
| icon-edit | 2333:7829 | icon/edit | assets/figma/icons/icon-edit.png |
| exercise-smith-bench-press | 2333:7848 | exercise-thumbnail | assets/figma/thumbnails/exercise-smith-bench-press.png |
| exercise-romanian-deadlift | 2333:7894 | exercise-thumbnail | assets/figma/thumbnails/exercise-romanian-deadlift.png |
| exercise-standing-calf-raise | 2333:7941 | exercise-thumbnail | assets/figma/thumbnails/exercise-standing-calf-raise.png |
| exercise-lateral-raise | 2333:7989 | exercise-thumbnail | assets/figma/thumbnails/exercise-lateral-raise.png |

Manifest: `assets/figma/manifest.json`

## NOT EXPORTED blockers
| Figma node | Figma name | reason |
|---|---|---|
| 2483:8355 | RoutineIcon_Placeholder | Gray rounded rectangle only; no distinct exportable routine icon in current frames — gray placeholder retained on Routine Main cards |
| 2333:7702 | icon/folder-chevron-collapsed | Separate collapsed node not exported; runtime rotates `icon-folder-chevron-expanded` |

## Font / licensing
- Source: [sun-typeface/SUIT](https://github.com/sun-typeface/SUIT) — SIL OFL 1.1
- Files: `assets/fonts/SUIT-{Regular,Medium,SemiBold,Bold}.ttf`
- Attribution: `assets/licenses/SUIT-OFL.txt`
- Load: `expo-font` via `useSuitFonts()` in `AppRoot` before navigator renders
- No runtime network font fetch

## Production readiness (bundled assets/licensing)
- Scope: bundled fonts + Figma PNGs only; no auth/sync/persistence changes
- Security/Privacy: no secrets; local static assets only
- Dependencies: `expo-font` added (Expo 57 compatible)
- Result: **Logic PASS** for licensing/ bundling scope; **Runtime/Device NOT VERIFIED**

## Verification
| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS — 32 suites, 103 tests |
| `npx expo config --type public` | PASS |
| `npx expo prebuild --platform android --no-install` | PASS |
| `git diff --check` | PASS |

## Changed files (summary)
- Font/assets: `assets/fonts/*`, `assets/figma/**`, `assets/licenses/SUIT-OFL.txt`
- Design system: typography tokens, font loader, figma asset module, `FigmaImage`
- Screens: Splash, Login, BasicInfo, RoutineMain, RoutineDetail
- Tests: `__tests__/bundled-assets-fonts.test.ts`, splash test update, jest expo-font mock

## Not Verified
- Runtime/device visual QA on Android hardware
- Tint behavior of bottom-tab PNG icons on physical device

## Next Owner
ChatGPT (review) — no PR opened per user request
