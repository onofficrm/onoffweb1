<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

/**
 * 짧은주소(/column)는 서버에서 404가 난다.
 * 정보/칼럼 목록은 /page/column.php, 글은 board.php로 연다.
 */
add_replace('get_pretty_url', 'bizontop_column_pretty_url', 1, 5);

function bizontop_column_pretty_url($url, $folder, $no = '', $query_string = '', $action = '')
{
    if ($folder !== 'column') {
        return $url;
    }

    if ($action === 'write') {
        return G5_BBS_URL.'/write.php?bo_table=column';
    }

    $sca = '';
    if ($query_string) {
        $q = html_entity_decode(str_replace('&amp;', '&', $query_string), ENT_QUOTES, 'UTF-8');
        $q = ltrim($q, '&?');
        $vars = array();
        parse_str($q, $vars);
        if (!empty($vars['sca'])) {
            $sca = $vars['sca'];
        }
    }

    if ($no) {
        $href = G5_BBS_URL.'/board.php?bo_table=column&amp;wr_id='.urlencode($no);
        if ($sca !== '') {
            $href .= '&amp;sca='.rawurlencode($sca);
        }
        return $href;
    }

    $href = G5_URL.'/page/column.php';
    if ($sca !== '') {
        $href .= '?sca='.rawurlencode($sca);
    }
    return $href;
}
