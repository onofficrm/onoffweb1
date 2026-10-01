<?php
/**
 * 서브페이지 공통 부트스트랩
 * - 직접 URL 접근: /page/about.php
 * - include 경로: dirname 기준 프로젝트 루트 _common.php 로드
 */
if (isset($_SERVER['SCRIPT_FILENAME']) && basename($_SERVER['SCRIPT_FILENAME']) === '_init.php') {
    exit;
}

if (!defined('_GNUBOARD_')) {
    include_once(dirname(__DIR__).'/common.php');
}

if (!defined('_GNUBOARD_')) {
    exit;
}

/**
 * 서브페이지 시작 (head.php)
 * include는 함수 지역 범위라 $config 등을 여기서 다시 끌어온다.
 * @param string $title 브라우저·container_title용
 */
function g5_page_start($title)
{
    $GLOBALS['g5']['title'] = $title;
    $scope = $GLOBALS;
    unset($scope['GLOBALS']);
    extract($scope, EXTR_REFS | EXTR_SKIP);
    include_once(G5_PATH.'/head.php');
}

/**
 * 서브페이지 종료 (tail.php)
 */
function g5_page_end()
{
    $scope = $GLOBALS;
    unset($scope['GLOBALS']);
    extract($scope, EXTR_REFS | EXTR_SKIP);
    include_once(G5_PATH.'/tail.php');
}
