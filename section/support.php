<?php
if (!defined('_GNUBOARD_')) exit;

$g5_support_cards = array(
    array(
        'name'    => '정책자금',
        'en'      => 'Policy Funds',
        'desc'    => '중소벤처기업진흥공단, 기술보증기금, 신용보증기금 등 설립 초기 운전자금 및 시설자금 지원제도',
        'benefit' => '운전자금 및 저금리 융자/보증 연계 검토',
    ),
    array(
        'name'    => '벤처기업확인',
        'en'      => 'Venture Business',
        'desc'    => '혁신성장유형 및 벤처투자유형 확인을 통한 취득세/재산세 및 법인세 세제 감면 혜택',
        'benefit' => '법인세 최대 50% 감면 및 정부 R&D 가점',
    ),
    array(
        'name'    => '기업부설연구소',
        'en'      => 'R&D Center',
        'desc'    => '연구개발 전담 인력 및 독립 연구공간을 갖춘 기업을 위한 한국산업기술진흥협회(KOITA) 인증',
        'benefit' => '연구인력개발비 세액공제 및 전문연구요원 지정',
    ),
    array(
        'name'    => '연구개발전담부서',
        'en'      => 'R&D Department',
        'desc'    => '연구원 1인 이상 소규모 기업도 설립 가능한 초기 기술기반 기업 대상 R&D 전담 조직 인증',
        'benefit' => '설립 요건 완화 및 R&D 세액공제 동일 적용',
    ),
    array(
        'name'    => '이노비즈',
        'en'      => 'Inno-Biz',
        'desc'    => '기술 경쟁력과 미래 성장성을 갖춘 업력 3년 이상 기술혁신형 중소기업 인증 제도',
        'benefit' => '금융 우대지원, R&D 우선선정, 판로개척',
    ),
    array(
        'name'    => '메인비즈',
        'en'      => 'Main-Biz',
        'desc'    => '경영혁신 활동을 통해 마케팅, 조직, 프로세스 등 혁신성을 인정받은 경영혁신형 중소기업 인증',
        'benefit' => '신보 보증료율 감면 및 금리우대 혜택',
    ),
);
?>
<section class="section section-support section--dark" id="section-support">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">AFTER INCORPORATION</p>
      <h2 class="section-title">법인설립이 끝이 아닙니다.<br>기업의 성장은 그 이후부터 시작됩니다.</h2>
      <p class="section-desc">기업의 업종, 업력, 재무상태, 연구개발 현황 등에 따라 활용할 수 있는 기업지원제도가 달라집니다.</p>
    </div>
    <div class="section-content">
      <div class="support-grid">
        <?php foreach ($g5_support_cards as $item) { ?>
        <article class="support-card reveal">
          <div class="support-card__top">
            <span class="support-card__icon" aria-hidden="true"></span>
            <span class="support-card__en"><?php echo get_text($item['en']); ?></span>
          </div>
          <h3 class="support-card__title"><?php echo get_text($item['name']); ?></h3>
          <p class="support-card__desc"><?php echo get_text($item['desc']); ?></p>
          <p class="support-card__benefit"><?php echo get_text($item['benefit']); ?></p>
        </article>
        <?php } ?>
      </div>
      <div class="support-disclaimer reveal">
        <strong>기업지원제도 안내 시 유의사항</strong>
        <p>각 기업지원제도는 기업의 실제 요건(재무상황, 업종, 기술성 평가, 대표자 이력 등)과 공고 시기별 주관기관의 정책 방향에 따라 적용 가능 여부가 상이할 수 있습니다. 비즈온탑은 객관적인 사전 요건 검토를 통해 실현 가능한 제도를 정직하게 안내해드립니다.</p>
      </div>
      <div class="section-actions section-actions--center">
        <a href="#section-contact" class="btn btn-accent">무료상담 신청하기</a>
      </div>
    </div>
  </div>
</section>
