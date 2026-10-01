<?php
include_once(dirname(__DIR__).'/common.php');
include_once(__DIR__.'/_init.php');
include_once(G5_PATH.'/lib/bizontop-board.php');

$ready = bizontop_ensure_column_board();
$sca = isset($_GET['sca']) ? clean_xss_tags($_GET['sca']) : '';
$categories = bizontop_column_categories();
if ($sca !== '' && !in_array($sca, $categories, true)) {
    $sca = '';
}

$board_url = G5_BBS_URL.'/board.php?bo_table=column';
$write_url = G5_BBS_URL.'/write.php?bo_table=column';

g5_page_start('정보/칼럼 | 비즈온탑');
?>
<div class="page-template page-column">
  <header class="page-hero">
    <div class="page-inner">
      <p class="page-eyebrow">INSIGHT</p>
      <h1 class="page-title">정보/칼럼</h1>
      <p class="page-desc">정책자금, 기업인증, 법인, 절세처럼 시기마다 바뀌는 내용을 카테고리로 나눠 올립니다.</p>
    </div>
  </header>

  <section class="page-section">
    <div class="page-inner">
      <div class="page-column__cats">
        <a href="<?php echo G5_URL; ?>/page/column.php" class="<?php echo $sca === '' ? 'is-on' : ''; ?>">전체</a>
        <?php foreach ($categories as $cat) { ?>
        <a href="<?php echo G5_URL; ?>/page/column.php?sca=<?php echo rawurlencode($cat); ?>" class="<?php echo $sca === $cat ? 'is-on' : ''; ?>"><?php echo get_text($cat); ?></a>
        <?php } ?>
      </div>

      <?php if ($ready) { ?>
      <div class="page-column__actions">
        <a class="btn btn-primary" href="<?php echo htmlspecialchars($board_url.($sca !== '' ? '&amp;sca='.rawurlencode($sca) : ''), ENT_QUOTES, 'UTF-8'); ?>">게시판에서 보기</a>
        <?php if (!empty($is_admin)) { ?>
        <a class="btn btn-outline" href="<?php echo htmlspecialchars($write_url, ENT_QUOTES, 'UTF-8'); ?>">글쓰기</a>
        <?php } ?>
      </div>
      <div class="page-column__list">
        <?php
        $sql = " select wr_id, wr_subject, wr_datetime, ca_name from {$g5['write_prefix']}column where wr_is_comment = 0 ";
        if ($sca !== '') {
            $sql .= " and ca_name = '".sql_real_escape_string($sca)."' ";
        }
        $sql .= " order by wr_num, wr_reply limit 12 ";
        $result = sql_query($sql, false);
        $count = 0;
        if ($result) {
            while ($row = sql_fetch_array($result)) {
                $count++;
                $href = G5_BBS_URL.'/board.php?bo_table=column&amp;wr_id='.(int) $row['wr_id'];
        ?>
        <a class="page-column__item" href="<?php echo $href; ?>">
          <?php if ($row['ca_name'] !== '') { ?><em><?php echo get_text($row['ca_name']); ?></em><?php } ?>
          <strong><?php echo get_text($row['wr_subject']); ?></strong>
          <span><?php echo substr($row['wr_datetime'], 0, 10); ?></span>
        </a>
        <?php
            }
        }
        if ($count === 0) {
        ?>
        <p class="page-column__empty">아직 등록된 칼럼이 없습니다. 관리자로 로그인한 뒤 글쓰기로 카테고리를 선택해 등록하면 이 목록에 나타납니다.</p>
        <?php } ?>
      </div>
      <?php } else { ?>
      <p class="page-column__empty">칼럼 게시판을 만들 기준 게시판이 아직 없습니다. 관리자에서 게시판을 하나 만든 뒤 이 페이지를 다시 열면 정보/칼럼 게시판이 준비됩니다.</p>
      <?php } ?>
    </div>
  </section>
</div>
<?php
g5_page_end();
