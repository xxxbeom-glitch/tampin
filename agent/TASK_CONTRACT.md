# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue: #6
- Task ID: DEV-002
- Title: Expo/EAS link + Android runtime smoke
- Branch: `cursor/dev-002-eas-android-runtime-dfba`
- Status: review
- Next Owner after completion: ChatGPT

## Goal
실 Figma 화면 구현 전에 기존 Tampin Expo 앱을 Product Owner Expo/EAS 계정에 연결하고, 현재 bootstrap이 Android에서 기동되는지 확인한다.

## Required
- EAS CLI login 상태 확인. interactive login이 필요하면 Product Owner가 로컬에서 완료하도록 기록
- 현재 Expo-supported tooling으로 Tampin EAS project create/link
- linked project identity read-back
- Android-only `eas.json` development profile 추가
- `developmentClient: true` 유지
- Expo Doctor/current equivalent 실행
- Android emulator 또는 USB-debug device가 있으면 기존 development build를 로컬 설치/기동
- bootstrap shell 렌더, package `com.lumian.tampin`, development-only UI Catalog 진입 확인
- runtime target가 없으면 정확한 blocker를 NOT VERIFIED로 기록
- 민감한 로그인·기기·런타임 단계가 막혀도 전체 작업을 멈추지 않고 나머지 in-scope를 완료

## Allowed Scope
- `eas.json` Android-only development profile
- EAS login/project identity 확인 및 가능한 범위의 link
- Expo Doctor / type / lint / 기존+최소 identity tests
- DEV-001 bootstrap identity / catalog 검증 유지
- `agent/TASK_CONTRACT.md`, 필요 시 `agent/SESSION_HANDOFF.md`
- Issue Result / Test / Commit / Risk / Blocker 기록

## Forbidden / Do Not Change
- canonical Figma screens / Design System transcription
- SQLite / Supabase / Auth / Sync
- exercise DB/media
- analytics or notification runtime
- Play Store submission
- production / preview / iOS EAS profiles
- cloud EAS build (PO 별도 승인 없음)
- product-screen, persistence, backend 구현
- DEV-001 baseline / package `com.lumian.tampin` 변경
- 기존 사용자 변경사항 덮어쓰기

## Figma refs
N/A — 이 Issue는 Figma 화면 구현이 아니다.

## Risk
- Cloud agent에는 Expo/EAS interactive login과 Android SDK/emulator가 없을 수 있음
- login/project link 실패 시 `extra.eas.projectId`를 추측해서 넣으면 안 됨
- 없는 runtime target를 Runtime/Device PASS로 확대 해석하면 안 됨

## Affected invariants / regression packs
- Android package identity `com.lumian.tampin`
- DEV-001 bootstrap shell + development-only UI Catalog
- Android-only / Expo Development Build contract
- no iOS work

## Verification
- typecheck / lint / unit tests
- Expo Doctor or recorded blocker
- EAS whoami / project identity or honest NOT VERIFIED
- Android local install/launch or honest Runtime/Device NOT VERIFIED
- no out-of-scope files

## Done When
- DEV-001 baseline preserved
- Android-only `eas.json` development profile committed with `developmentClient: true`
- Expo Doctor PASS 또는 blocker 기록
- package remains `com.lumian.tampin`
- EAS login / project link / Android runtime은 PASS 또는 정확한 NOT VERIFIED
- commit/push complete
- Issue Result/Test/Commit/Not Verified + Next Owner=ChatGPT
