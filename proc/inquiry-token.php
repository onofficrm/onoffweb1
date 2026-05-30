<?php
/**
 * 상담 폼 CSRF 토큰 발급 (빌더 React 등 standalone 페이지용)
 * GET → JSON { success, token, submit_url }
 */
define('ONOFF_INQUIRY_TOKEN', true);

include_once dirname(__FILE__) . '/_bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if (defined('ONOFF_PROC_JSON') && ob_get_level() > 0) {
    ob_clean();
}

if (!defined('_GNUBOARD_')) {
    echo json_encode(array('success' => false, 'message' => '접근이 올바르지 않습니다.'), JSON_UNESCAPED_UNICODE);
    exit;
}

if (!get_session('onoff_inquiry_token')) {
    set_session('onoff_inquiry_token', md5(uniqid((string) mt_rand(), true)));
}

$token = get_session('onoff_inquiry_token');
$submit_url = G5_URL . '/proc/inquiry-submit.php';

echo json_encode(array(
    'success'    => true,
    'token'      => $token,
    'submit_url' => $submit_url,
), JSON_UNESCAPED_UNICODE);
