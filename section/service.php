<?php
if (!defined('_GNUBOARD_')) exit;

include_once G5_PATH.'/lib/bizontop-catalog.php';

$g5_home_services = bizontop_home_services();
$tones = array('blue', 'indigo', 'sky', 'teal', 'gold');
?>
<section class="section section-service section-service--incorp" id="section-service">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">SERVICES</p>
      <h2 class="section-title">필요한 서비스를<br>한눈에 확인하세요.</h2>
      <p class="section-desc">정책자금, 기업인증, 벤처투자 소득공제, 법인전환, 경영컨설팅을<br>서비스별 설명과 바로가기로 연결합니다.</p>
    </div>
    <div class="section-content">
      <div class="service-incorp-grid service-incorp-grid--home">
        <?php foreach ($g5_home_services as $i => $item) {
            $tone = $tones[$i % count($tones)];
        ?>
        <article class="service-incorp-card service-incorp-card--<?php echo $tone; ?> reveal">
          <div class="service-incorp-card__meta">
            <span class="service-incorp-card__badge">SERVICE <?php echo sprintf('%02d', $i + 1); ?></span>
            <span class="service-incorp-card__name"><?php echo get_text($item['title']); ?></span>
          </div>
          <h3 class="service-incorp-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="service-incorp-card__desc"><?php echo get_text($item['summary']); ?></p>
          <a href="<?php echo htmlspecialchars(bizontop_service_url($item['slug']), ENT_QUOTES, 'UTF-8'); ?>" class="btn btn-primary">자세히 보기</a>
        </article>
        <?php } ?>
      </div>
      <div class="section-actions section-actions--center" style="margin-top:1.5rem;">
        <a href="<?php echo G5_URL; ?>/#section-contact" class="btn btn-outline">어떤 서비스인지 상담하기</a>
      </div>
    </div>
  </div>
</section>
