<?php
include_once(dirname(__DIR__).'/_common.php');
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
$kakao = function_exists('g5site_cfg') ? g5site_cfg('kakao_url', '') : '';

g5_page_start($page['title'].' | 비즈온탑');
?>
<div class="page-template page-service page-service--detail">
  <header class="page-hero">
    <div class="page-inner page-service__hero">
      <p class="page-eyebrow"><?php echo get_text($group['label']); ?></p>
      <h1 class="page-title"><?php echo get_text($page['title']); ?></h1>
      <p class="page-desc"><?php echo get_text($page['message']); ?></p>
      <div class="page-service__hero-actions">
        <a href="#page-consult" class="btn btn-primary">무료 상담 신청</a>
        <a href="<?php echo htmlspecialchars($tel, ENT_QUOTES, 'UTF-8'); ?>" class="btn btn-outline">전화 상담</a>
        <?php if ($kakao !== '' && $kakao !== '#') { ?>
        <a href="<?php echo htmlspecialchars($kakao, ENT_QUOTES, 'UTF-8'); ?>" class="btn btn-outline" target="_blank" rel="noopener noreferrer">카카오톡 상담</a>
        <?php } ?>
      </div>
    </div>
  </header>

  <section class="page-section">
    <div class="page-inner">
      <h2 class="page-section__title">대상 및 자격</h2>
      <ul class="page-service__list">
        <?php foreach ($page['who'] as $line) { ?>
        <li><?php echo get_text($line); ?></li>
        <?php } ?>
      </ul>
    </div>
  </section>

  <section class="page-section page-section--alt">
    <div class="page-inner">
      <h2 class="page-section__title">주요 혜택</h2>
      <ul class="page-service__list">
        <?php foreach ($page['benefits'] as $line) { ?>
        <li><?php echo get_text($line); ?></li>
        <?php } ?>
      </ul>
      <div class="page-service__midcta">
        <p>우리 회사에 해당하는지 3분이면 방향을 잡을 수 있습니다.</p>
        <a href="#page-consult" class="btn btn-primary">상담 신청하기</a>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="page-inner">
      <h2 class="page-section__title">주요 내용</h2>
      <div class="card-grid card-grid--auto">
        <?php foreach ($page['points'] as $point) { ?>
        <article class="base-card">
          <h3 class="base-card-title"><?php echo get_text($point['title']); ?></h3>
          <p class="base-card-desc"><?php echo get_text($point['desc']); ?></p>
        </article>
        <?php } ?>
      </div>
    </div>
  </section>

  <section class="page-section page-section--alt">
    <div class="page-inner">
      <h2 class="page-section__title">진행 절차</h2>
      <ol class="page-service__steps">
        <?php foreach ($page['steps'] as $i => $step) { ?>
        <li><span><?php echo sprintf('%02d', $i + 1); ?></span><?php echo get_text($step); ?></li>
        <?php } ?>
      </ol>
    </div>
  </section>

  <section class="page-section">
    <div class="page-inner">
      <h2 class="page-section__title">비용 또는 지원 내용</h2>
      <ul class="page-service__list">
        <?php foreach ($page['cost'] as $line) { ?>
        <li><?php echo get_text($line); ?></li>
        <?php } ?>
      </ul>
    </div>
  </section>

  <section class="page-section page-section--alt">
    <div class="page-inner">
      <h2 class="page-section__title">함께 보면 좋은 서비스</h2>
      <p class="page-section__desc">설립 이후 자금, 인증, 세제는 순서를 두고 이어지는 경우가 많습니다.</p>
      <div class="page-service__related">
        <?php foreach ($page['related'] as $rel) {
            if (!isset($catalog[$rel])) {
                continue;
            }
        ?>
        <a class="page-service__related-card" href="<?php echo htmlspecialchars(bizontop_service_url($rel), ENT_QUOTES, 'UTF-8'); ?>">
          <strong><?php echo get_text($catalog[$rel]['title']); ?></strong>
          <span><?php echo get_text($catalog[$rel]['summary']); ?></span>
        </a>
        <?php } ?>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="page-inner">
      <h2 class="page-section__title">자주 묻는 질문</h2>
      <div class="page-service__faq">
        <?php foreach ($page['faqs'] as $faq) { ?>
        <details>
          <summary><?php echo get_text($faq['q']); ?></summary>
          <p><?php echo get_text($faq['a']); ?></p>
        </details>
        <?php } ?>
      </div>
    </div>
  </section>

  <section class="page-section page-cta" id="page-consult">
    <div class="page-inner page-cta__inner">
      <h2 class="page-cta__title"><?php echo get_text($page['title']); ?>, 어디부터 보면 될지 함께 정리합니다.</h2>
      <p class="page-cta__desc"><?php echo get_text($page['summary']); ?></p>
      <div class="page-cta__actions">
        <a href="<?php echo G5_URL; ?>/#section-contact" class="btn btn-primary">무료 상담 신청</a>
        <a href="<?php echo htmlspecialchars($tel, ENT_QUOTES, 'UTF-8'); ?>" class="btn btn-outline">전화 상담</a>
        <a href="<?php echo G5_URL; ?>/#section-diagnosis" class="btn btn-outline">무료 진단</a>
      </div>
    </div>
  </section>
</div>
<?php
g5_page_end();
