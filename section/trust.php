<?php
if (!defined('_GNUBOARD_')) exit;

$g5_trust_items = array(
    array(
        'title'  => '법인설립 상담',
        'desc'   => '상호·주주·정관 1:1 맞춤 설계',
        'detail' => '초보 대표님도 서류 준비부터 등기까지 막힘없이',
        'badge'  => '원스톱',
        'tone'   => 'blue',
    ),
    array(
        'title'  => '법인전환 컨설팅',
        'desc'   => '개인사업자 종합소득세 절감',
        'detail' => '성실신고 대상 기업의 안전한 포괄양수도 전환',
        'badge'  => '절세 최적화',
        'tone'   => 'indigo',
    ),
    array(
        'title'  => '기업인증',
        'desc'   => '벤처기업 · 연구소 · 이노비즈',
        'detail' => '세제 감면 및 정부 R&D 가점 사전 준비',
        'badge'  => '세제 혜택',
        'tone'   => 'amber',
    ),
    array(
        'title'  => '정책자금 컨설팅',
        'desc'   => '중기부 · 신보 · 기보 맞춤 매칭',
        'detail' => '설립 직후 초기 운전자금 및 시설자금 솔루션',
        'badge'  => '자금 확보',
        'tone'   => 'emerald',
    ),
);
?>
<section class="section section-trust" id="section-trust">
  <div class="section-inner">
    <div class="section-head section-head--row reveal">
      <div>
        <p class="section-eyebrow">TRUST AREA</p>
        <h2 class="section-title">법인설립부터 기업성장까지 한 번에</h2>
      </div>
      <p class="section-desc section-desc--compact">분야별 공인 전문가 그룹이 설립부터 사후 관리까지 밀착 지원합니다</p>
    </div>
    <div class="section-content reveal">
      <div class="trust-grid">
        <?php foreach ($g5_trust_items as $item) { ?>
        <a href="#section-contact" class="trust-card trust-card--<?php echo htmlspecialchars($item['tone'], ENT_QUOTES, 'UTF-8'); ?>">
          <div class="trust-card__top">
            <span class="trust-card__icon" aria-hidden="true"></span>
            <span class="trust-card__badge"><?php echo get_text($item['badge']); ?></span>
          </div>
          <h3 class="trust-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="trust-card__desc"><?php echo get_text($item['desc']); ?></p>
          <p class="trust-card__detail"><?php echo get_text($item['detail']); ?></p>
        </a>
        <?php } ?>
      </div>
    </div>
  </div>
</section>
