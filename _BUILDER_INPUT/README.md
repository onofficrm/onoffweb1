# 빌더 결과물 임시 보관 폴더

## 목적

빌더, 젠스파크(Genspark), 구글 스튜디오 빌더, React/Tailwind 결과물을 **그누보드에 적용하기 전** 임시로 모아 두는 **작업용** 폴더입니다.

운영에 필요한 파일은 최종적으로 `/section`, `/components`, `/css`, `/js`, `/img` 로 옮깁니다.

---

## 폴더 역할

| 폴더 | 보관 내용 |
|------|-----------|
| **`app/`** | `App.tsx`, `Home.tsx`, `components/*.tsx` 등 빌더·React 코드 |
| **`assets/`** | 빌더 export 이미지, 아이콘, SVG, 배경 |
| **`screenshots/`** | PC/모바일 시안 캡처, 참고 화면 |

---

## 사용 방법

1. 빌더 결과물을 이 폴더에 넣습니다.
2. Cursor에게 `/_BUILDER_INPUT/app` 와 `/_BUILDER_INPUT/assets` 를 분석하게 합니다.
3. [BUILDER-WORKFLOW.md](../BUILDER-WORKFLOW.md) · [SECTION-GUIDE.md](../SECTION-GUIDE.md) 기준으로 `section/*.php` 변환 계획을 세웁니다.
4. 변환 후 **실제 사용 이미지**는 `/img/main` 또는 `/img/common` 으로 옮깁니다.
5. 납품·오픈 시 이 폴더는 **운영 서버에 올리지 않는 것**을 권장합니다.

---

## 주의사항

- 이 폴더는 **작업용**입니다. 사이트 동작에 필수가 아닙니다.
- 고객 개인정보, API 키, 비밀번호, **FTP·DB 정보**는 넣지 마세요.
- 배포·FTP 업로드 시 **`_BUILDER_INPUT` 제외**를 권장합니다.
- 변환이 끝나도 참고용으로 로컬에만 보관할 수 있습니다.

---

## Cursor 요청 예시

```
/_BUILDER_INPUT/app/Home.tsx와 /_BUILDER_INPUT/assets 이미지를 분석해서
현재 그누보드 /section 구조에 맞게 변환 계획을 세워주세요.
아직 수정하지 말고 수정 예정 파일 목록부터 보여주세요.

조건: /bbs, /lib, /adm, skin/board/basic 수정 금지.
git commit, push, FTP 배포 금지.
```

더 많은 프롬프트: [START-PROJECT-PROMPTS.md](../START-PROJECT-PROMPTS.md)
