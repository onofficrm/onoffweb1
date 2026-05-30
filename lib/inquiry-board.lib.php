<?php
/**
 * inquiry 문의 게시판 자동 생성 (없을 때 1회)
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('onoff_ensure_inquiry_board')) {
    /**
     * @param string $bo_table
     * @return bool
     */
    function onoff_ensure_inquiry_board($bo_table = 'inquiry')
    {
        global $g5;

        $bo_table = preg_replace('/[^a-z0-9_]/i', '', (string) $bo_table);
        if ($bo_table === '') {
            $bo_table = 'inquiry';
        }

        $exists = sql_fetch(" select bo_table from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
        if (is_array($exists) && !empty($exists['bo_table'])) {
            return true;
        }

        $gr_row = sql_fetch(" select gr_id from {$g5['group_table']} order by gr_id limit 1 ");
        $gr_id = (is_array($gr_row) && !empty($gr_row['gr_id'])) ? $gr_row['gr_id'] : 'community';

        $gr_check = sql_fetch(" select gr_id from {$g5['group_table']} where gr_id = '" . sql_real_escape_string($gr_id) . "' ");
        if (!is_array($gr_check) || empty($gr_check['gr_id'])) {
            sql_query(" insert into {$g5['group_table']} set gr_id = '" . sql_real_escape_string($gr_id) . "', gr_subject = '커뮤니티' ");
        }

        $bo_table_sql = sql_real_escape_string($bo_table);
        $gr_id_sql = sql_real_escape_string($gr_id);

        $sql = " insert into {$g5['board_table']} set
            bo_table = '{$bo_table_sql}',
            gr_id = '{$gr_id_sql}',
            bo_subject = '상담문의',
            bo_device = 'both',
            bo_admin = '',
            bo_list_level = '10',
            bo_read_level = '10',
            bo_write_level = '1',
            bo_reply_level = '10',
            bo_comment_level = '10',
            bo_html_level = '1',
            bo_link_level = '1',
            bo_count_modify = '1',
            bo_count_delete = '1',
            bo_upload_level = '10',
            bo_download_level = '10',
            bo_read_point = '0',
            bo_write_point = '0',
            bo_comment_point = '0',
            bo_download_point = '0',
            bo_use_category = '0',
            bo_category_list = '',
            bo_use_sideview = '0',
            bo_use_file_content = '0',
            bo_use_secret = '1',
            bo_use_dhtml_editor = '0',
            bo_use_rss_view = '0',
            bo_use_good = '0',
            bo_use_nogood = '0',
            bo_use_name = '0',
            bo_use_signature = '0',
            bo_use_ip_view = '0',
            bo_use_list_view = '0',
            bo_use_list_content = '0',
            bo_use_email = '0',
            bo_table_width = '100',
            bo_subject_len = '60',
            bo_mobile_subject_len = '30',
            bo_page_rows = '15',
            bo_mobile_page_rows = '15',
            bo_new = '24',
            bo_hot = '100',
            bo_image_width = '835',
            bo_skin = 'landing-inquiry',
            bo_mobile_skin = 'landing-inquiry',
            bo_include_head = '_head.php',
            bo_include_tail = '_tail.php',
            bo_content_head = '',
            bo_content_tail = '',
            bo_mobile_content_head = '',
            bo_mobile_content_tail = '',
            bo_insert_content = '',
            bo_gallery_cols = '4',
            bo_gallery_width = '202',
            bo_gallery_height = '150',
            bo_mobile_gallery_width = '125',
            bo_mobile_gallery_height = '100',
            bo_upload_count = '2',
            bo_upload_size = '1048576',
            bo_reply_order = '1',
            bo_use_search = '0',
            bo_order = '0' ";

        if (!sql_query($sql, false)) {
            return false;
        }

        if (!function_exists('get_db_create_replace') && defined('G5_LIB_PATH')) {
            include_once G5_LIB_PATH . '/get_data.lib.php';
        }

        $sql_file = G5_ADMIN_PATH . '/sql_write.sql';
        if (!is_file($sql_file)) {
            return true;
        }

        $file = file($sql_file);
        if (!is_array($file)) {
            return true;
        }

        if (function_exists('get_db_create_replace')) {
            $file = get_db_create_replace($file);
        }

        $create_sql = implode("\n", $file);
        $write_table = $g5['write_prefix'] . $bo_table;
        $create_sql = preg_replace(array('/__TABLE_NAME__/', '/;/'), array($write_table, ''), $create_sql);

        sql_query($create_sql, false);

        return true;
    }
}
