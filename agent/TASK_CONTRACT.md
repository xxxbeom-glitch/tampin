# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #6 / DEV-002 — Expo/EAS link + Android runtime smoke
- Branch: `cursor/dev-002-eas-android-smoke-368a`

## Goal
DEV-001 bootstrap을 유지한 채 Expo/EAS 프로젝트 연결 준비와 Android runtime smoke evidence를 확보한다.

## Required
- DEV-001 baseline preserved
- EAS login state verified (또는 blocker 기록)
- Tampin EAS project link + identity read-back (또는 blocker 기록)
- Android-only `eas.json` development profile (`developmentClient: true`)
- Expo Doctor / equivalent 실행 및 결과 기록
- Android package `com.lumian.tampin` 유지
- Android local install/launch smoke (또는 Runtime/Device NOT VERIFIED)
- type/lint/test 실행
- commit/push + Issue evidence

## Allowed Scope
- `eas.json` 추가
- DEV-002 검증용 unit test
- `agent/TASK_CONTRACT.md` 갱신
- Issue #6 Result/Test/Commit/Not Verified 기록

## Forbidden / Do Not Change
- canonical Figma screen 구현
- Design System transcription
- SQLite / Supabase / Auth / Sync
- exercise DB / media
- analytics / notification runtime
- Play Store submission / production build / cloud EAS build
- iOS work
- DEV-001 bootstrap identity / UI catalog shell 의미 변경

## Figma refs
- N/A (runtime/EAS only)

## Risk
- Cloud Agent 환경에 EAS login token / Android SDK / emulator 없음
- Expo Doctor가 DEV-001 baseline(`newArchEnabled`, patch version drift)에서 fail 가능

## Affected invariants / regression packs
- DEV-001 bootstrap identity (`com.lumian.tampin`, slug `tampin`)
- Debug UI Catalog dev-only entry (`__DEV__`)

## Verification
1. `npm run typecheck`
2. `npm run lint`
3. `npm test`
4. `npx expo-doctor`
5. `npx eas-cli whoami` / project link read-back
6. Android prebuild + assembleDebug or device launch when target exists

## Done When
- AC 충족 또는 unavailable step은 NOT VERIFIED로 명시
- commit/push complete
- Issue #6에 Result/Test/Commit/Risk/Not Verified 기록
- Next Owner = ChatGPT
