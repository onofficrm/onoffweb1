<?php
if (!defined('_GNUBOARD_')) exit;
include_once(G5_PATH.'/section/_helpers.php');

$g5_consult_url = G5_URL.'/#section-contact';
?>
<section class="section section-hero section-hero--bizontop" id="section-hero">
  <div class="section-inner section-hero__inner">
    <div class="section-hero__content reveal">
      <p class="section-eyebrow section-eyebrow--accent">중소기업·스타트업 경영 자문 전문 파트너</p>
      <h2 class="section-title">기업의 성장에 필요한<br><span class="section-title__accent">모든 솔루션</span></h2>
      <p class="section-desc">정책자금부터 기업인증, 경영컨설팅까지 비즈온탑이 함께합니다. 기업별 정밀 진단을 통해 최적의 조달 전략과 지속 가능한 성장 로드맵을 제시합니다.</p>
      <div class="section-actions">
        <a href="<?php echo $g5_consult_url; ?>" class="btn btn-accent">무료 상담 신청</a>
        <a href="#section-service" class="btn btn-outline btn-outline--light">서비스 알아보기</a>
      </div>
      <div class="section-hero__highlights">
        <div class="section-hero__hl">
          <strong>맞춤 조달</strong>
          <span>정부 정책자금 연계</span>
        </div>
        <div class="section-hero__hl">
          <strong>조세 감면</strong>
          <span>벤처·연구소 국가인증</span>
        </div>
        <div class="section-hero__hl">
          <strong>경영 자문</strong>
          <span>법인전환 및 사옥자금</span>
        </div>
      </div>
    </div>
    <div class="section-hero__visual reveal">
      <div class="section-hero__visual-frame">
        <?php g5_sample_main_media('hero.jpg', '비즈온탑 전문 비즈니스 컨설팅 상담', 'section-hero__img', 'hero'); ?>
        <div class="section-hero__trust">
          <strong>1:1 전담 수석 컨설턴트 밀착 배정</strong>
          <span>신용도 영향 없는 비공개 사전 기업진단</span>
          <a href="<?php echo $g5_consult_url; ?>">상담하기 &gt;</a>
        </div>
      </div>
    </div>
  </div>
</section>
