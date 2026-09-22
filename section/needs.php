<?php
if (!defined('_GNUBOARD_')) exit;

$g5_needs = array(
    array(
        'href'  => G5_URL.'/page/service.php?cat=funding',
        'badge' => '정책자금',
        'title' => '사업 운영자금이 필요한 기업',
        'desc'  => '원자재 매입, 인건비 지급, 거래처 결제 등 유동성 확보를 위한 저금리 정책 운전자금을 연계합니다.',
        'cta'   => '운전자금 알아보기',
        'icon'  => 'coins',
    ),
    array(
        'href'  => G5_URL.'/page/service.php?cat=startup',
        'badge' => '창업자금',
        'title' => '창업 초기 자금이 필요한 기업',
        'desc'  => '업력 7년 미만 초기 스타트업을 위해 재무제표 부담 없는 무담보 신용 융자 및 청년창업 자금을 지원합니다.',
        'cta'   => '창업기업자금 알아보기',
        'icon'  => 'rocket',
    ),
    array(
        'href'  => G5_URL.'/page/service.php?cat=venture',
        'badge' => '기업인증',
        'title' => '벤처기업확인을 준비하는 기업',
        'desc'  => '창업 초기 5년간 법인세 50% 세액 감면과 취득세 75% 감면, 정부 R&D 과제 심사 가점을 확보합니다.',
        'cta'   => '벤처기업확인 알아보기',
        'icon'  => 'award',
    ),
    array(
        'href'  => G5_URL.'/page/service.php?cat=rnd',
        'badge' => 'R&D 절세',
        'title' => '기업부설연구소 설립이 필요한 기업',
        'desc'  => '연구인력개발비 25% 법인세 세액공제와 연구원 비과세 혜택을 받는 공인 연구개발 전담부서를 구축합니다.',
        'cta'   => '연구소 설립 요건 확인',
        'icon'  => 'flask',
    ),
    array(
        'href'  => G5_URL.'/page/service.php?cat=corp',
        'badge' => '경영컨설팅',
        'title' => '법인설립을 고민하는 대표자',
        'desc'  => '개인사업자의 고율 누진소득세를 절감하고, 자산과 부채를 분리하며 정관을 정비하는 맞춤 법인 전환을 돕습니다.',
        'cta'   => '법인전환 전략 알아보기',
        'icon'  => 'scale',
    ),
    array(
        'href'  => G5_URL.'/page/service.php?cat=facility',
        'badge' => '시설자금',
        'title' => '공장·사옥 매입 및 시설투자를 계획하는 기업',
        'desc'  => '자가 사업장 확보와 생산설비 도입을 위해 소요 자금의 최대 80~90%까지 장기 저리로 조달합니다.',
        'cta'   => '시설자금 한도 알아보기',
        'icon'  => 'factory',
    ),
);
?>
<section class="section section-needs" id="section-needs">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">CLIENT NEEDS &amp; SOLUTIONS</p>
      <h2 class="section-title">지금 어떤 고민을 하고 계신가요?</h2>
      <p class="section-desc">기업의 현재 성장 단계와 마주한 과제에 따라 가장 적합한 전문 솔루션을 확인해 보세요.</p>
    </div>
    <div class="section-content">
      <div class="needs-grid">
        <?php foreach ($g5_needs as $item) { ?>
        <a href="<?php echo htmlspecialchars($item['href'], ENT_QUOTES, 'UTF-8'); ?>" class="needs-card reveal">
          <div class="needs-card__top">
            <span class="needs-card__icon needs-card__icon--<?php echo htmlspecialchars($item['icon'], ENT_QUOTES, 'UTF-8'); ?>" aria-hidden="true"></span>
            <span class="needs-card__badge"><?php echo get_text($item['badge']); ?></span>
          </div>
          <h3 class="needs-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="needs-card__desc"><?php echo get_text($item['desc']); ?></p>
          <span class="needs-card__cta"><?php echo get_text($item['cta']); ?> →</span>
        </a>
        <?php } ?>
      </div>
    </div>
  </div>
</section>
