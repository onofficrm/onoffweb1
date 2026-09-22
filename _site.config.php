<?php
/**
 * 사이트 공통 설정 — 비즈온탑 (BIZ ON TOP)
 * 경로: /_site.config.php
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

$site_config = array(
    /* 홈(/) — 비우면 section 메인 사용 (빌더 bridge 비활성) */
    'home_builder_bridge_id' => '',
    'site_name'           => '비즈온탑 (BIZ ON TOP)',
    'site_desc'           => '정책자금, 기업인증, 경영컨설팅 전문 — 기업 성장의 든든한 파트너',
    'company_name'        => '비즈온탑 경영컨설팅',
    'ceo_name'            => '대표자명',
    'business_no'         => '000-00-00000',
    'phone'               => '02-0000-0000',
    'kakao_url'           => 'https://open.kakao.com/o/sBizOnTop',
    'email'               => 'consult@bizontop.kr
    'address'             => '주소는 관리자 설정값으로 입력해 주세요',
    'primary_color'       => '#2563EB',
    'secondary_color'     => '#102B50',
    'logo_path'           => '/img/logo/logo.svg',
    'og_image'            => '/img/common/og-image.jpg',
    /* SEO */
    'seo_title'           => '비즈온탑 | 정책자금·기업인증·경영컨설팅',
    'seo_description'     => '정책자금부터 기업인증, 경영컨설팅까지. 기업별 정밀 진단으로 최적의 조달 전략과 성장 로드맵을 제시합니다.',
    'main_keyword'        => '정책자금, 기업인증, 벤처기업확인, 기업부설연구소, 경영컨설팅, 법인설립',
    'sub_keywords'        => '운전자금, 시설자금, 이노비즈, 메인비즈',
    'robots'              => 'index,follow',
    'consultation_text'   => '무료 상담 신청',
    'footer_desc'         => '비즈온탑은 중소기업과 소상공인의 든든한 성장 파트너로서, 정책자금 융자 연계, 필수 기업인증 취득, 종합 경영컨설팅까지 원스톱 맞춤 솔루션을 제공합니다.',
    /* 문의 폼 → inquiry 게시판 */
    'inquiry_bo_table'        => 'inquiry',
    'inquiry_notify_enabled'  => true,
    'inquiry_notify_email'    => 'consult@bizontop',
    'inquiry_notify_name'     => '비즈온탑 상담팀',
    'inquiry_notify_telegram_enabled'  => false,
    'inquiry_notify_telegram_bot_token' => '',
    'inquiry_notify_telegram_chat_id'   => '',
    'inquiry_notify_webhook_enabled' => false,
    'inquiry_notify_webhook_url'     => '',
    'inquiry_thanks_url'      => '/page/inquiry-thanks.php',
    'gtm_id'              => '',
    'ga4_id'              => '',
    'meta_pixel_id'       => '',
    'naver_analytics_id'  => '',
    'kakao_pixel_id'      => '',
    'fax'                 => '',
    'sales_no'            => '',
    'privacy_manager'     => '개인정보보호책임자',
    'kakao_map_key'       => '',
    'kakao_map_lat'       => '37.5665',
    'kakao_map_lng'       => '126.9780',
    'google_maps_api_key'       => '',
    'map_default_lat'           => '37.5665',
    'map_default_lng'           => '126.9780',
    'map_default_zoom'          => 13,
    'map_use_current_location'  => true,
    'map_default_radius_km'     => 5,
    'map_unit'                  => 'km',
    'map_placeholder_title'     => 'Google Maps API 키가 설정되지 않았습니다.',
    'map_placeholder_desc'      => '_site.config.php에서 google_maps_api_key 값을 입력하면 지도가 표시됩니다.',
    'icrm_builtin'              => true,
    'icrm_site_base_url'        => '',
    'icrm_secret_token'         => '',
    'icrm_allowed_ips'          => '',
    'icrm_css_only_when_markup' => false,
    'auto_comment_builtin'      => true,
);

/**
 * 설정값 조회 (없거나 비어 있으면 $default)
 *
 * @param string $key
 * @param string $default
 * @return string
 */
if (!function_exists('g5site_cfg')) {
    function g5site_cfg($key, $default = '')
    {
        global $site_config;

        if (!isset($site_config) || !is_array($site_config)) {
            return (string) $default;
        }

        if (!array_key_exists($key, $site_config)) {
            return (string) $default;
        }

        $val = $site_config[$key];

        if ($val === null || $val === false) {
            return (string) $default;
        }

        if (is_string($val)) {
            $val = trim($val);
            return $val !== '' ? $val : (string) $default;
        }

        if (is_bool($val)) {
            return $val ? '1' : '';
        }

        return (string) $val;
    }
}

/**
 * bool 설정값 (true/false/1/0/off)
 *
 * @param string $key
 * @param bool   $default
 * @return bool
 */
if (!function_exists('g5site_cfg_bool')) {
    function g5site_cfg_bool($key, $default = false)
    {
        global $site_config;

        if (!isset($site_config) || !is_array($site_config) || !array_key_exists($key, $site_config)) {
            return (bool) $default;
        }

        $val = $site_config[$key];

        if ($val === true || $val === 1 || $val === '1' || $val === 'on' || $val === 'true') {
            return true;
        }
        if ($val === false || $val === 0 || $val === '0' || $val === 'off' || $val === 'false') {
            return false;
        }

        return (bool) $default;
    }
}

/**
 * URL 또는 사이트 루트 기준 경로
 *
 * @param string $key site_config 키 (logo_path, og_image 등)
 * @param string $default
 * @return string
 */
if (!function_exists('g5site_cfg_url')) {
    function g5site_cfg_url($key, $default = '')
    {
        $path = g5site_cfg($key, $default);

        if ($path === '') {
            return '';
        }

        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }

        if (!defined('G5_URL')) {
            return $path;
        }

        if ($path[0] === '/') {
            return G5_URL . $path;
        }

        return G5_URL . '/' . $path;
    }
}

/**
 * 전화번호 → tel: 링크
 *
 * @param string $phone
 * @return string
 */
if (!function_exists('g5site_tel_link')) {
    function g5site_tel_link($phone = '')
    {
        if ($phone === '') {
            $phone = g5site_cfg('phone', '');
        }

        $digits = preg_replace('/[^0-9+]/', '', $phone);

        return $digits !== '' ? 'tel:' . $digits : '#';
    }
}
