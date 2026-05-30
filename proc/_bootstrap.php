<?php
/**
 * /proc/*.php — 그누보드 루트 기준 bootstrap
 * _common.php 의 ./common.php 상대경로는 CWD에 의존하므로 chdir 필요
 */
if (!defined('_GNUBOARD_')) {
    $g5_proc_root = dirname(__DIR__);
    chdir($g5_proc_root);
    if (!defined('ONOFF_PROC_JSON')) {
        define('ONOFF_PROC_JSON', true);
        ob_start();
    }
    include_once $g5_proc_root . '/_common.php';
}
