<?php
if (!defined('_GNUBOARD_')) exit;

include_once(G5_PATH.'/section/_helpers.php');

/**
 * 메인 최신글 — 정책자금 소식(news) / 기업인증 정보(cert)
 * 관리자에서 게시판 ID를 동일하게 생성하세요. (스킨: basic-notice 또는 basic-modern 권장)
 */
$g5_latest_boards = array(
    array(
        'bo_table'    => 'news',
        'label'       => '최신 정책자금 소식',
        'rows'        => 3,
        'subject_len' => 48,
        'skin'        => 'card',
        'tone'        => 'blue',
        'more_label'  => '정책자금 게시판 바로가기 →',
    ),
    array(
        'bo_table'    => 'cert',
        'label'       => '기업인증 정보',
        'rows'        => 3,
        'subject_len' => 48,
        'skin'        => 'card',
        'tone'        => 'gold',
        'more_label'  => '기업인증 정보 전체보기 →',
    ),
);
?>
<section class="section section-latest section-latest--bizontop section--alt" id="section-latest">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">LATEST INSIGHTS &amp; ANNOUNCEMENTS</p>
      <h2 class="section-title">최신 정책자금 및 기업인증 정보</h2>
      <p class="section-desc">급변하는 정부 정책 트렌드와 기업인증 제도 변경 사항을 신속하게 안내해 드립니다.</p>
    </div>
    <div class="section-content">
      <div class="latest-grid latest-grid--2">
        <?php foreach ($g5_latest_boards as $board_cfg) {
            $board_url = get_pretty_url($board_cfg['bo_table']);
            if (!$board_url) {
                $board_url = G5_BBS_URL.'/board.php?bo_table='.urlencode($board_cfg['bo_table']);
            }
            $tone = isset($board_cfg['tone']) ? $board_cfg['tone'] : 'blue';
        ?>
        <div class="latest-panel latest-panel--<?php echo htmlspecialchars($tone, ENT_QUOTES, 'UTF-8'); ?> reveal">
          <div class="latest-panel__head">
            <h3 class="latest-panel__title"><?php echo get_text($board_cfg['label']); ?></h3>
            <a href="<?php echo htmlspecialchars($board_url, ENT_QUOTES, 'UTF-8'); ?>" class="latest-panel__more">더보기 →</a>
          </div>
          <div class="latest-panel__body">
            <?php
            echo g5_sample_latest_render(
                $board_cfg['bo_table'],
                $board_cfg['label'],
                isset($board_cfg['rows']) ? (int) $board_cfg['rows'] : 3,
                isset($board_cfg['subject_len']) ? (int) $board_cfg['subject_len'] : 40,
                isset($board_cfg['skin']) ? $board_cfg['skin'] : 'card'
            );
            ?>
          </div>
          <div class="latest-panel__foot">
            <a href="<?php echo htmlspecialchars($board_url, ENT_QUOTES, 'UTF-8'); ?>">
              <?php echo get_text(isset($board_cfg['more_label']) ? $board_cfg['more_label'] : '게시판 바로가기 →'); ?>
            </a>
          </div>
        </div>
        <?php } ?>
      </div>
      <div class="latest-board-links">
        <a href="<?php echo G5_BBS_URL; ?>/board.php?bo_table=notice" class="btn btn-outline">공지사항</a>
        <a href="<?php echo G5_BBS_URL; ?>/board.php?bo_table=news" class="btn btn-outline">정책자금 소식</a>
        <a href="<?php echo G5_BBS_URL; ?>/board.php?bo_table=cert" class="btn btn-outline">기업인증 정보</a>
        <a href="<?php echo G5_BBS_URL; ?>/board.php?bo_table=faq" class="btn btn-outline">FAQ</a>
        <a href="<?php echo G5_BBS_URL; ?>/login.php" class="btn btn-primary">회원 로그인</a>
      </div>
    </div>
  </div>
</section>
