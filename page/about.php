<?php
include_once(dirname(__FILE__).'/_init.php');
include_once(G5_PATH.'/section/_helpers.php');

g5_page_start('비즈온탑 소개');
?>
<div class="page-template page-about">
  <header class="page-hero reveal">
    <div class="page-inner">
      <p class="page-eyebrow">About BIZ ON TOP</p>
      <h1 class="page-title">비즈온탑 소개</h1>
      <p class="page-desc">정책자금·기업인증·경영컨설팅으로 기업 성장의 든든한 파트너가 됩니다.</p>
    </div>
  </header>

  <section class="page-section page-section--vision reveal">
    <div class="page-inner">
      <h2 class="page-section__title">3대 핵심 가치</h2>
      <p class="page-section__desc">기업의 현재를 진단하고 미래의 성장을 설계합니다.</p>
      <div class="card-grid card-grid--3">
        <article class="base-card icon-card">
          <div class="icon-card__icon" aria-hidden="true">01</div>
          <h3 class="base-card-title">기업별 맞춤 진단</h3>
          <p class="base-card-desc">업종·재무·기술력·고용 실적을 분석해 최적의 조달 트랙과 인증 요건을 도출합니다.</p>
        </article>
        <article class="base-card icon-card">
          <div class="icon-card__icon" aria-hidden="true">02</div>
          <h3 class="base-card-title">체계적 프로세스</h3>
          <p class="base-card-desc">사전 검토부터 사업계획서·실사·질의응답까지 전담 수석 컨설턴트가 밀착 조력합니다.</p>
        </article>
        <article class="base-card icon-card">
          <div class="icon-card__icon" aria-hidden="true">03</div>
          <h3 class="base-card-title">지속 사후관리</h3>
          <p class="base-card-desc">인증 유지·연구노트·후속 정책과제 연계까지 스케일업을 지원합니다.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="page-section page-section--alt reveal">
    <div class="page-inner">
      <h2 class="page-section__title">5단계 컨설팅 프로세스</h2>
      <ol class="page-steps">
        <li class="page-steps__item"><strong>01. 상담 신청</strong><span>온라인·유선으로 기업 과제 접수</span></li>
        <li class="page-steps__item"><strong>02. 기업 현황 진단</strong><span>재무·업력·기술력 정밀 분석</span></li>
        <li class="page-steps__item"><strong>03. 맞춤 솔루션 제안</strong><span>자금 트랙·세제 인증 실행안</span></li>
        <li class="page-steps__item"><strong>04. 계약 및 컨설팅</strong><span>사업계획서·실사·PT 밀착 지도</span></li>
        <li class="page-steps__item"><strong>05. 결과·사후관리</strong><span>자금 실행·인증 유지·후속 과제</span></li>
      </ol>
    </div>
  </section>

  <section class="page-section page-cta reveal">
    <div class="page-inner page-cta__inner">
      <h2 class="page-cta__title">1:1 무료 상담이 필요하신가요?</h2>
      <p class="page-cta__desc">신용도 영향 없는 비공개 사전 진단을 제공합니다.</p>
      <div class="page-cta__actions">
        <a href="<?php echo G5_URL; ?>/#section-contact" class="btn btn-primary">무료 상담 신청</a>
        <a href="<?php echo G5_URL; ?>/page/service.php" class="btn btn-outline">서비스 보기</a>
      </div>
    </div>
  </section>
</div>
<?php
g5_page_end();
