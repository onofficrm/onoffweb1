# 비즈온탑 게시판·로그인 설정 가이드

Google Studio Builder `비즈온탑` 홈페이지를 그누보드(`onoffweb1`)에 적용한 뒤, **실제 게시판·회원 로그인**은 그누보드 기능을 사용합니다.

## 1. 생성할 게시판 (관리자 → 게시판관리)

| bo_table | 게시판명 | 권장 스킨 | 용도 |
|----------|----------|-----------|------|
| `notice` | 공지사항 | `basic-notice` | 공식 공지 |
| `news` | 정책자금 소식 | `basic-modern` 또는 `basic-notice` | 메인 최신글 좌측 |
| `cert` | 기업인증 정보 | `basic-modern` 또는 `basic-notice` | 메인 최신글 우측 |
| `cases` | 컨설팅 사례 | `basic-card` | 사례 게시판 |
| `faq` | 자주 묻는 질문 | `faq-accordion` | FAQ |
| `inquiry` | 상담 문의 | `landing-inquiry` | 메인 상담폼 저장 |

> `section/latest.php`는 `news`, `cert`를 참조합니다. ID를 다르게 만들면 해당 파일의 `$g5_latest_boards`도 맞춰 주세요.

## 2. 로그인·회원가입

- URL: `/bbs/login.php`, `/bbs/register.php`
- 스킨: `skin/member/basic/login.skin.php` (비즈온탑 브랜딩 적용됨)
- React 로컬스토리지 로그인은 **사용하지 않습니다**. 그누보드 회원 DB를 사용합니다.

## 3. 메뉴 권장 구성 (관리자 → 메뉴설정)

1. 회사소개 → `/page/about.php`
2. 정책자금 → `/page/service.php?cat=funding`
3. 기업인증 → `/page/service.php?cat=cert`
4. 경영컨설팅 → `/page/service.php?cat=consulting`
5. 고객센터
   - 공지사항 → 게시판 `notice`
   - 정책자금 소식 → `news`
   - 기업인증 정보 → `cert`
   - 상담 신청 → `/#section-contact`
6. 로그인 → `/bbs/login.php`

## 4. 사이트 설정

`_site.config.php`에 비즈온탑 상호·전화·이메일·주소·대표자명을 실제 값으로 수정하세요.
`home_builder_bridge_id`는 비워 두어 **section 메인**을 사용합니다.
