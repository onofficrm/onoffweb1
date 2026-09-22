<?php
if (!defined('_GNUBOARD_')) exit;

$g5_cases = array(
    array(
        'badge'    => 'CASE 01',
        'category' => '온라인 쇼핑몰 운영기업',
        'title'    => '개인사업자 → 법인전환',
        'situation'=> '사업규모가 증가하면서 법인전환을 검토',
        'concerns' => array('법인전환 시점', '주주구성', '향후 기업운영'),
        'flow'     => array('현황검토', '법인구조 검토', '법인설립', '후속 기업지원 상담'),
        'tone'     => 'blue',
    ),
    array(
        'badge'    => 'CASE 02',
        'category' => '3인 공동창업',
        'title'    => '공동창업 법인설립',
        'situation'=> '3명의 창업자가 신규 사업을 공동으로 준비',
        'concerns' => array('대표자', '주주', '임원', '지분구조'),
        'flow'     => array('사업구조 확인', '지분 및 임원 구성 검토', '법인설립'),
        'tone'     => 'indigo',
    ),
    array(
        'badge'    => 'CASE 03',
        'category' => '스타트업',
        'title'    => '투자유치 준비 법인',
        'situation'=> '서비스 출시와 향후 투자유치를 준비',
        'concerns' => array('초기 주주구조', '자본금', '향후 투자구조'),
        'flow'     => array('설립목적 확인', '법인구조 검토', '법인설립', '기업성장 상담'),
        'tone'     => 'sky',
    ),
);
?>
<section class="section section-cases section-cases--incorp" id="section-cases">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">CONSULTING CASES</p>
      <h2 class="section-title">기업마다 상황이 다르기 때문에<br>진행 방법도 달라집니다.</h2>
      <p class="section-desc">사업형태와 향후 계획에 맞춰 법인설립 및 기업 성장 방향을 함께 검토합니다.<br>실제 상담 유형별 표준 진행 프로세스를 확인해보세요.</p>
    </div>
    <div class="section-content">
      <div class="cases-incorp-grid">
        <?php foreach ($g5_cases as $item) { ?>
        <article class="cases-incorp-card cases-incorp-card--<?php echo htmlspecialchars($item['tone'], ENT_QUOTES, 'UTF-8'); ?> reveal">
          <div class="cases-incorp-card__top">
            <span class="cases-incorp-card__badge"><?php echo get_text($item['badge']); ?></span>
            <span class="cases-incorp-card__cat"><?php echo get_text($item['category']); ?></span>
          </div>
          <h3 class="cases-incorp-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="cases-incorp-card__sub">상담 유형 예시</p>
          <div class="cases-incorp-card__block">
            <span class="cases-incorp-card__label">상황</span>
            <p><?php echo get_text($item['situation']); ?></p>
          </div>
          <div class="cases-incorp-card__concerns">
            <span class="cases-incorp-card__label">주요 고민사항</span>
            <div class="cases-incorp-card__tags">
              <?php foreach ($item['concerns'] as $c) { ?>
              <span>#<?php echo get_text($c); ?></span>
              <?php } ?>
            </div>
          </div>
          <div class="cases-incorp-card__flow">
            <span class="cases-incorp-card__label">진행 프로세스</span>
            <ol>
              <?php foreach ($item['flow'] as $fi => $step) { ?>
              <li><span><?php echo (int) ($fi + 1); ?></span><?php echo get_text($step); ?></li>
              <?php } ?>
            </ol>
          </div>
          <a href="#section-contact" class="btn btn-outline">무료상담 신청하기</a>
        </article>
        <?php } ?>
      </div>
      <p class="cases-incorp-note">* 위 사례는 비즈온탑에서 가장 빈번하게 진행되는 법인설립 및 구조 설계 대표 상담 유형 예시입니다.</p>
    </div>
  </div>
</section>
