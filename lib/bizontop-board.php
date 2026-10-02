<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

/**
 * 정보/칼럼 게시판(column)이 없으면 기존 게시판 구조를 복제해 한 번 만듭니다.
 * 카테고리: 정책자금, 기업인증, 법인, 절세, 벤처투자, 경영
 */
function bizontop_ensure_column_board()
{
    global $g5;

    $bo_table = 'column';
    $exists = sql_fetch(" select bo_table from {$g5['board_table']} where bo_table = '{$bo_table}' ");
    if (!empty($exists['bo_table'])) {
        return true;
    }

    $src = sql_fetch(" select * from {$g5['board_table']} order by bo_table asc limit 1 ");
    if (empty($src['bo_table'])) {
        return false;
    }

    $sql = get_table_define($g5['write_prefix'].$src['bo_table']);
    if (!$sql) {
        return false;
    }
    $sql = str_replace($g5['write_prefix'].$src['bo_table'], $g5['write_prefix'].$bo_table, $sql);
    sql_query($sql, false);

    $categories = '정책자금|기업인증|법인|절세|벤처투자|경영';
    $subject = '정보/칼럼';
    $insert = " insert into {$g5['board_table']}
        set bo_table = '{$bo_table}',
            gr_id = '".sql_real_escape_string($src['gr_id'])."',
            bo_subject = '{$subject}',
            bo_mobile_subject = '{$subject}',
            bo_device = 'both',
            bo_admin = '".sql_real_escape_string($src['bo_admin'])."',
            bo_list_level = '1',
            bo_read_level = '1',
            bo_write_level = '10',
            bo_reply_level = '10',
            bo_comment_level = '1',
            bo_upload_level = '10',
            bo_download_level = '1',
            bo_html_level = '10',
            bo_link_level = '10',
            bo_count_modify = '0',
            bo_count_delete = '0',
            bo_read_point = '0',
            bo_write_point = '0',
            bo_comment_point = '0',
            bo_download_point = '0',
            bo_use_category = '1',
            bo_category_list = '{$categories}',
            bo_use_sideview = '0',
            bo_use_secret = '0',
            bo_use_dhtml_editor = '1',
            bo_select_editor = '".sql_real_escape_string($src['bo_select_editor'])."',
            bo_use_list_view = '1',
            bo_use_list_content = '0',
            bo_subject_len = '60',
            bo_mobile_subject_len = '30',
            bo_page_rows = '15',
            bo_mobile_page_rows = '10',
            bo_new = '24',
            bo_hot = '100',
            bo_image_width = '800',
            bo_skin = 'basic',
            bo_mobile_skin = 'basic',
            bo_upload_size = '1048576',
            bo_reply_order = '1',
            bo_use_search = '1',
            bo_order = '0',
            bo_upload_count = '2',
            bo_use_email = '0',
            bo_write_min = '0',
            bo_write_max = '0',
            bo_comment_min = '0',
            bo_comment_max = '0' ";
    sql_query($insert, false);

    $dir = G5_DATA_PATH.'/file/'.$bo_table;
    if (!is_dir($dir)) {
        @mkdir($dir, G5_DIR_PERMISSION);
        @chmod($dir, G5_DIR_PERMISSION);
    }
    $index = $dir.'/index.php';
    if (!is_file($index)) {
        $fp = @fopen($index, 'w');
        if ($fp) {
            fwrite($fp, '');
            fclose($fp);
        }
    }

    return true;
}

function bizontop_column_categories()
{
    return array('정책자금', '기업인증', '법인', '절세', '벤처투자', '경영');
}

/**
 * 칼럼 게시판이 비어 있을 때만 카테고리별 안내 글을 한 번씩 넣습니다.
 */
function bizontop_seed_column_posts()
{
    global $g5;

    if (!bizontop_ensure_column_board()) {
        return false;
    }

    $bo_table = 'column';
    $write_table = $g5['write_prefix'].$bo_table;
    $count = sql_fetch(" select count(*) as cnt from {$write_table} where wr_is_comment = 0 ", false);
    if (!empty($count['cnt'])) {
        return false;
    }

    if (!function_exists('bizontop_column_seed_posts')) {
        include_once dirname(__FILE__).'/bizontop-column-seed.php';
    }
    $posts = bizontop_column_seed_posts();
    if (!$posts) {
        return false;
    }

    $name = sql_real_escape_string('비즈온탑');
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sql_real_escape_string($_SERVER['REMOTE_ADDR']) : '127.0.0.1';
    $inserted = 0;

    foreach ($posts as $post) {
        $subject = sql_real_escape_string($post['subject']);
        $content = sql_real_escape_string($post['content']);
        $category = sql_real_escape_string($post['category']);
        $when = sql_real_escape_string($post['datetime']);
        $seo = sql_real_escape_string($post['seo']);
        $num = sql_fetch(" select IFNULL(MIN(wr_num) - 1, -1) as n from {$write_table} ", false);
        $wr_num = isset($num['n']) ? (int) $num['n'] : -1;

        $sql = " insert into {$write_table}
            set wr_num = '{$wr_num}',
                wr_reply = '',
                wr_parent = 0,
                wr_is_comment = 0,
                wr_comment = 0,
                ca_name = '{$category}',
                wr_option = 'html1',
                wr_subject = '{$subject}',
                wr_content = '{$content}',
                wr_seo_title = '{$seo}',
                wr_link1 = '',
                wr_link2 = '',
                wr_link1_hit = 0,
                wr_link2_hit = 0,
                wr_hit = 0,
                wr_good = 0,
                wr_nogood = 0,
                mb_id = '',
                wr_password = '',
                wr_name = '{$name}',
                wr_email = '',
                wr_homepage = '',
                wr_datetime = '{$when}',
                wr_last = '{$when}',
                wr_ip = '{$ip}',
                wr_1 = '', wr_2 = '', wr_3 = '', wr_4 = '', wr_5 = '',
                wr_6 = '', wr_7 = '', wr_8 = '', wr_9 = '', wr_10 = 'seed' ";
        $ok = sql_query($sql, false);
        if (!$ok) {
            continue;
        }
        $wr_id = sql_insert_id();
        if (!$wr_id) {
            continue;
        }
        sql_query(" update {$write_table} set wr_parent = '{$wr_id}' where wr_id = '{$wr_id}' ", false);
        sql_query(" insert into {$g5['board_new_table']} ( bo_table, wr_id, wr_parent, bn_datetime, mb_id ) values ( '{$bo_table}', '{$wr_id}', '{$wr_id}', '{$when}', '' ) ", false);
        $inserted++;
    }

    if ($inserted > 0) {
        sql_query(" update {$g5['board_table']} set bo_count_write = bo_count_write + {$inserted} where bo_table = '{$bo_table}' ", false);
    }

    return $inserted > 0;
}
