<?php
include_once(dirname(__DIR__).'/common.php');
include_once(__DIR__.'/_init.php');
include_once(G5_PATH.'/lib/bizontop-catalog.php');

$id = isset($_GET['id']) ? preg_replace('/[^a-z0-9_-]/', '', $_GET['id']) : '';
if ($id === '' && isset($_GET['cat'])) {
    $legacy = array(
        'funding' => 'funding',
        'startup' => 'funding-small',
        'venture' => 'cert-venture',
        'rnd' => 'cert-lab',
        'corp' => 'corp',
        'facility' => 'funding-sme',
        'cert' => 'cert',
        'consulting' => 'corp-consult',
    );
    $cat = preg_replace('/[^a-z0-9_-]/', '', $_GET['cat']);
    $id = isset($legacy[$cat]) ? $legacy[$cat] : 'funding';
}
if ($id === '' || !bizontop_service($id)) {
    $id = 'funding';
}

$page = bizontop_service($id);
$page['slug'] = $id;
$groups = bizontop_groups();
$group = $groups[$page['group']];
$catalog = bizontop_catalog();

$phone = function_exists('g5site_cfg') ? g5site_cfg('phone', '02-0000-0000') : '02-0000-0000';
$tel = function_exists('g5site_tel_link') ? g5site_tel_link($phone) : 'tel:0200000000';

$column_posts = array();
$column_cat_map = array(
    'funding' => '정책자금',
    'cert' => '기업인증',
    'tax' => '벤처투자',
    'corp' => '법인',
);
$column_cat = isset($column_cat_map[$page['group']]) ? $column_cat_map[$page['group']] : '';
if ($id === 'corp-tax') {
    $column_cat = '절세';
}
if ($column_cat !== '' && function_exists('sql_query')) {
    if (!function_exists('bizontop_ensure_column_board')) {
        include_once G5_PATH.'/lib/bizontop-board.php';
    }
    if (bizontop_ensure_column_board()) {
        $column_sql = " select wr_id, wr_subject, wr_content, wr_datetime, ca_name from {$g5['write_prefix']}column where wr_is_comment = 0 and ca_name = '".sql_real_escape_string($column_cat)."' order by wr_num, wr_reply limit 2 ";
        $column_result = sql_query($column_sql, false);
        if ($column_result) {
            while ($column_row = sql_fetch_array($column_result)) {
                $excerpt = trim(preg_replace('/\s+/u', ' ', strip_tags($column_row['wr_content'])));
                $column_row['excerpt'] = function_exists('cut_str') ? cut_str($excerpt, 90, '…') : $excerpt;
                $column_posts[] = $column_row;
            }
        }
    }
}

g5_page_start($page['title'].' | 비즈온탑');
?>
<div class="page-template page-service page-service--detail">
  <header class="svc-hero">
    <div class="page-inner">
      <p class="svc-crumb">
        <a href="<?php echo G5_URL; ?>">홈</a>
        <span aria-hidden="true">/</span>
        <a href="<?php echo htmlspecialchars(bizontop_service_url($group['hub']), ENT_QUOTES, 'UTF-8'); ?>"><?php echo get_text($group['label']); ?></a>
      </p>
      <h1><?php echo get_text($page['title']); ?></h1>
      <p class="svc-lead"><?php echo get_text($page['message']); ?></p>
      <?php if (!empty($page['points'])) { ?>
      <ul class="svc-pills">
        <?php foreach ($page['points'] as $point) { ?>
        <li><?php echo get_text($point['title']); ?></li>
        <?php } ?>
      </ul>
      <?php } ?>
      <?php $consult_on_dark = true; include G5_PATH.'/components/consult-actions.php'; ?>
    </div>
  </header>

  <section class="svc-block">
    <div class="page-inner svc-split">
      <div class="svc-copy">
        <h2>대상 및 자격</h2>
        <p class="svc-prose"><?php echo get_text(!empty($page['who_intro']) ? $page['who_intro'] : $page['summary']); ?></p>
      </div>
      <aside class="svc-panel">
        <h3>이런 경우 확인해 보세요</h3>
        <ul class="svc-checks">
          <?php foreach ($page['who'] as $line) { ?>
          <li><?php echo get_text($line); ?></li>
          <?php } ?>
        </ul>
      </aside>
    </div>
  </section>

  <section class="svc-block svc-block--muted">
    <div class="page-inner">
      <h2 class="svc-heading">주요 혜택</h2>
      <?php if (!empty($page['benefit_intro'])) { ?>
      <p class="svc-prose svc-prose--lead"><?php echo get_text($page['benefit_intro']); ?></p>
      <?php } ?>
      <ul class="svc-benefit-grid">
        <?php foreach ($page['benefits'] as $line) {
            $benefit_title = is_array($line) ? $line['title'] : $line;
            $benefit_desc = is_array($line) && isset($line['desc']) ? $line['desc'] : '';
        ?>
        <li>
          <strong><?php echo get_text($benefit_title); ?></strong>
          <?php if ($benefit_desc !== '') { ?><span><?php echo get_text($benefit_desc); ?></span><?php } ?>
        </li>
        <?php } ?>
      </ul>
    </div>
  </section>

  <section class="svc-block">
    <div class="page-inner">
      <h2 class="svc-heading">주요 내용</h2>
      <div class="svc-story">
        <?php foreach ($page['points'] as $i => $point) {
            $features = isset($point['features']) && is_array($point['features']) ? $point['features'] : array();
        ?>
        <article class="svc-story__row">
          <div>
            <p class="svc-kicker"><?php echo sprintf('%02d', $i + 1); ?></p>
            <h3><?php echo get_text($point['title']); ?></h3>
            <p><?php echo get_text($point['desc']); ?></p>
          </div>
          <?php if ($features) { ?>
          <aside class="svc-panel">
            <h3>특징</h3>
            <ul class="svc-checks">
              <?php foreach ($features as $feature) { ?>
              <li><?php echo get_text($feature); ?></li>
              <?php } ?>
            </ul>
          </aside>
          <?php } ?>
        </article>
        <?php } ?>
      </div>
    </div>
  </section>

  <section class="svc-block svc-consult-mid">
    <div class="page-inner consult-bridge">
      <p>여기까지 우리 회사에 해당하는지 바로 판단하기 어렵다면, 상담으로 순서를 정해 드립니다.</p>
      <?php include G5_PATH.'/components/consult-actions.php'; ?>
    </div>
  </section>

  <section class="svc-block svc-block--muted">
    <div class="page-inner">
      <h2 class="svc-heading">진행 절차</h2>
      <ol class="svc-steps">
        <?php foreach ($page['steps'] as $i => $step) {
            $step_title = is_array($step) ? $step['title'] : $step;
            $step_desc = is_array($step) && isset($step['desc']) ? $step['desc'] : '';
        ?>
        <li>
          <span><?php echo sprintf('%02d', $i + 1); ?></span>
          <strong><?php echo get_text($step_title); ?></strong>
          <?php if ($step_desc !== '') { ?><p><?php echo get_text($step_desc); ?></p><?php } ?>
        </li>
        <?php } ?>
      </ol>
    </div>
  </section>

  <section class="svc-block">
    <div class="page-inner svc-split">
      <div class="svc-copy">
        <h2>비용 또는 지원 내용</h2>
        <p class="svc-prose"><?php echo get_text(!empty($page['cost_intro']) ? $page['cost_intro'] : '기관 금리·한도·심사비는 공고와 사업장 조건에 따라 달라집니다. 컨설팅 비용이 있으면 진행 범위를 정한 뒤 미리 안내합니다.'); ?></p>
      </div>
      <aside class="svc-panel">
        <h3>안내</h3>
        <ul class="svc-checks">
          <?php foreach ($page['cost'] as $line) { ?>
          <li><?php echo get_text($line); ?></li>
          <?php } ?>
        </ul>
      </aside>
    </div>
  </section>

  <section class="svc-block" id="svc-faq">
    <div class="page-inner">
      <h2 class="svc-heading">자주 묻는 질문</h2>
      <div class="svc-faq">
        <?php foreach ($page['faqs'] as $faq) { ?>
        <article class="svc-faq__item">
          <h3>Q. <?php echo get_text($faq['q']); ?></h3>
          <p><?php echo get_text($faq['a']); ?></p>
        </article>
        <?php } ?>
      </div>
    </div>
  </section>

  <section class="svc-block svc-block--muted" id="page-consult">
    <div class="page-inner">
      <h2 class="svc-heading">상담 신청</h2>
      <div class="svc-banner">
        <div>
          <h3><?php echo get_text($page['title']); ?>, 우리 회사에 맞는지 확인해 보세요.</h3>
          <p><?php echo get_text($page['summary']); ?></p>
        </div>
        <div class="svc-banner__actions">
          <?php $consult_on_dark = true; include G5_PATH.'/components/consult-actions.php'; ?>
        </div>
      </div>
    </div>
  </section>

  <section class="svc-block svc-center">
    <div class="page-inner">
      <h2 class="svc-heading">함께 확인하면 좋은 페이지</h2>
      <div class="svc-related">
        <?php foreach ($page['related'] as $rel) {
            if (!isset($catalog[$rel])) {
                continue;
            }
        ?>
        <a href="<?php echo htmlspecialchars(bizontop_service_url($rel), ENT_QUOTES, 'UTF-8'); ?>"><?php echo get_text($catalog[$rel]['title']); ?></a>
        <?php } ?>
      </div>
    </div>
  </section>

  <?php if ($column_posts) { ?>
  <section class="svc-block">
    <div class="page-inner">
      <p class="svc-kicker">COLUMN</p>
      <h2 class="svc-heading">관련 칼럼</h2>
      <div class="svc-columns">
        <?php foreach ($column_posts as $post) {
            $href = G5_BBS_URL.'/board.php?bo_table=column&amp;wr_id='.(int) $post['wr_id'];
            $when = substr($post['wr_datetime'], 0, 7);
            $when = str_replace('-', '.', $when);
        ?>
        <a class="svc-column" href="<?php echo $href; ?>">
          <em><?php echo get_text($post['ca_name']); ?></em>
          <strong><?php echo get_text($post['wr_subject']); ?></strong>
          <?php if ($post['excerpt'] !== '') { ?><span><?php echo get_text($post['excerpt']); ?></span><?php } ?>
          <small>비즈온탑 · <?php echo get_text($when); ?></small>
        </a>
        <?php } ?>
      </div>
    </div>
  </section>
  <?php } ?>
</div>
<?php
g5_page_end();
