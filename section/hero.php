<?php
if (!defined('_GNUBOARD_')) exit;

$g5_hero_benefits = array(
    '전자등기 원스톱으로 방문 없이 완료',
    '초기 지분구조 & 정관 특약 1:1 맞춤 검토',
    '설립 후 첫 정책자금 매칭 로드맵 제공',
    '과밀억제권역 등록면허세 감면 사전 진단',
);

$g5_hero_steps = array(
    array('no' => '01', 'title' => '법인설립 준비', 'sub' => '상호 중복 체크, 자본금 및 주주·임원 구성', 'duration' => '1일 소요'),
    array('no' => '02', 'title' => '법인 구조 결정', 'sub' => '지분 배분율, 맞춤 정관 특약, 세무 리스크 방지', 'duration' => '1일 소요'),
    array('no' => '03', 'title' => '법인등기', 'sub' => '전자서명 또는 인감 날인으로 등기소 접수', 'duration' => '2~3일 소요'),
    array('no' => '04', 'title' => '사업자등록', 'sub' => '관할 세무서 사업자등록증 신청 및 발급', 'duration' => '당일~1일'),
    array('no' => '05', 'title' => '기업성장 지원', 'sub' => '설립 후 첫 정책자금 매칭 & 기업인증 연계', 'duration' => '설립 직후 계속'),
);
?>
<section class="section section-hero section-hero--incorp" id="section-hero">
  <div class="section-inner section-hero__inner">
    <div class="section-hero__content reveal">
      <p class="section-eyebrow section-eyebrow--accent">CORPORATE STARTUP CONSULTING | 법인설립 전문 컨설팅</p>
      <h2 class="section-title">법인설립,<br><span class="section-title__accent">어렵게 시작하지 마세요.</span></h2>
      <p class="section-hero__emphasis">사업에 맞는 법인 구조부터 설립 이후 <em>기업 성장까지</em> 함께합니다.</p>
      <p class="section-desc">상호, 자본금, 주주, 임원, 사업목적 등 법인설립에 필요한 준비사항을 알기 쉽게 안내하고, 설립 이후 필요한 정책자금과 기업인증까지 함께 검토합니다.</p>

      <ul class="hero-benefit-list">
        <?php foreach ($g5_hero_benefits as $benefit) { ?>
        <li class="hero-benefit-list__item"><?php echo get_text($benefit); ?></li>
        <?php } ?>
      </ul>

      <div class="section-actions">
        <a href="#section-diagnosis" class="btn btn-accent">3분 법인설립 진단하기</a>
        <a href="#section-contact" class="btn btn-outline">무료상담 신청하기</a>
      </div>
      <p class="section-hero__subcaption">법인설립 준비서류 · 예상기간 · 절차 · 설립 이후 준비사항 안내</p>
    </div>

    <div class="section-hero__visual reveal">
      <div class="hero-steps-card">
        <div class="hero-steps-card__head">
          <span class="hero-steps-card__live"></span>
          <strong>법인설립 5단계 로드맵</strong>
          <span class="hero-steps-card__badge">평균 3~5일 완성</span>
        </div>
        <ol class="hero-steps-card__list">
          <?php foreach ($g5_hero_steps as $i => $step) { ?>
          <li class="hero-steps-card__item<?php echo $i === 0 ? ' is-active' : ''; ?>">
            <span class="hero-steps-card__no"><?php echo get_text($step['no']); ?></span>
            <div class="hero-steps-card__body">
              <div class="hero-steps-card__row">
                <strong><?php echo get_text($step['title']); ?></strong>
                <span><?php echo get_text($step['duration']); ?></span>
              </div>
              <p><?php echo get_text($step['sub']); ?></p>
            </div>
          </li>
          <?php } ?>
        </ol>
        <div class="hero-steps-card__foot">
          <span>원스톱 연계 서비스</span>
          <div class="hero-steps-card__tags">
            <span>#법인설립</span>
            <span>#법인전환</span>
            <span>#기업인증</span>
            <span>#정책자금</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
