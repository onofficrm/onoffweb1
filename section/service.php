<?php
if (!defined('_GNUBOARD_')) exit;
include_once(G5_PATH.'/section/_helpers.php');

$g5_services = array(
    array(
        'img'    => 'service-funding.jpg',
        'badge'  => '정책자금 (Funding)',
        'title'  => '맞춤형 정부 정책자금 조달',
        'desc'   => '소상공인시장진흥공단, 중진공, 기보, 신보 등 기업 상황에 가장 적합한 정부 정책자금을 발굴하고 최적 조건의 저금리 융자를 연계합니다.',
        'items'  => array(
            '소상공인 및 초기 스타트업 창업지원자금',
            '중소 제조·유통기업 맞춤 운전자금',
            '공장·사옥 매입 및 기계설비 시설자금',
        ),
        'href'   => G5_URL.'/page/service.php?cat=funding',
        'cta'    => '정책자금 자세히 보기',
        'tone'   => 'blue',
    ),
    array(
        'img'    => 'service-cert.jpg',
        'badge'  => '기업인증 (Certification)',
        'title'  => '국가 공인 기업인증 획득',
        'desc'   => '벤처기업확인, 기업부설연구소, 이노비즈, 메인비즈, ISO 등 파격적인 조세 감면과 공공조달 입찰 가점을 확보하는 공인 인증을 취득합니다.',
        'items'  => array(
            '벤처기업확인 (법인세 최대 50% 감면)',
            '기업부설연구소 / 연구전담부서 (R&D 25% 공제)',
            '이노비즈 · 메인비즈 · ISO 국제표준인증',
        ),
        'href'   => G5_URL.'/page/service.php?cat=cert',
        'cta'    => '기업인증 자세히 보기',
        'tone'   => 'gold',
    ),
    array(
        'img'    => 'service-consulting.jpg',
        'badge'  => '경영컨설팅 (Consulting)',
        'title'  => '전략적 경영자문 및 리스크 개선',
        'desc'   => '법인설립 및 전환, 가지급금 정리, 정관 개정, 사옥 매입 시설자금 등 기업의 안정적인 영속과 재무 리스크를 선제적으로 해결합니다.',
        'items'  => array(
            '개인사업자 절세형 법인설립 및 법인전환',
            '자가 사옥 및 공장 매입 부동산 시설자금',
            '가지급금 정리 및 기업 신용평가등급 개선',
        ),
        'href'   => G5_URL.'/page/service.php?cat=consulting',
        'cta'    => '경영컨설팅 자세히 보기',
        'tone'   => 'navy',
    ),
);
?>
<section class="section section-service section-service--bizontop section--alt" id="section-service">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">CORE THREE DOMAINS</p>
      <h2 class="section-title">비즈온탑의 핵심 서비스</h2>
      <p class="section-desc">재무 건전성 확충부터 조세 감면, 지배구조 개선까지 전문 영역별 체계적인 컨설팅을 제공합니다.</p>
    </div>
    <div class="section-content">
      <div class="service-core-grid">
        <?php foreach ($g5_services as $item) { ?>
        <article class="service-core-card service-core-card--<?php echo htmlspecialchars($item['tone'], ENT_QUOTES, 'UTF-8'); ?> reveal">
          <div class="service-core-card__thumb">
            <?php g5_sample_main_media($item['img'], $item['title'], 'service-core-card__img', 'card'); ?>
            <span class="service-core-card__badge"><?php echo get_text($item['badge']); ?></span>
          </div>
          <div class="service-core-card__body">
            <h3 class="service-core-card__title"><?php echo get_text($item['title']); ?></h3>
            <p class="service-core-card__desc"><?php echo get_text($item['desc']); ?></p>
            <p class="service-core-card__list-label">대표 서비스 상품</p>
            <ul class="service-core-card__list">
              <?php foreach ($item['items'] as $li) { ?>
              <li><?php echo get_text($li); ?></li>
              <?php } ?>
            </ul>
          </div>
          <div class="service-core-card__foot">
            <a href="<?php echo htmlspecialchars($item['href'], ENT_QUOTES, 'UTF-8'); ?>" class="btn btn-outline"><?php echo get_text($item['cta']); ?></a>
          </div>
        </article>
        <?php } ?>
      </div>
    </div>
  </div>
</section>
