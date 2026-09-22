<?php
if (!defined('_GNUBOARD_')) exit;

$g5_values = array(
    array(
        'no'    => '01',
        'title' => '기업별 맞춤 진단',
        'desc'  => '일률적인 제안이 아닌 기업의 업종, 재무구조, 기술력, 고용 실적을 면밀히 분석합니다. 현재 기업 여건에서 가장 유리한 최적의 조달 트랙과 인증 요건을 사전에 도출합니다.',
        'tone'  => 'blue',
    ),
    array(
        'no'    => '02',
        'title' => '체계적인 컨설팅 프로세스',
        'desc'  => '사전 검토부터 전문 사업계획서 편철, 현장 실사 및 질의응답 대응까지 전담 수석 컨설턴트가 밀착 조력합니다. 기관별 심사위원 관점에 부합하도록 체계적이고 표준화된 절차를 지원합니다.',
        'tone'  => 'gold',
    ),
    array(
        'no'    => '03',
        'title' => '지속적인 사후관리',
        'desc'  => '일회성 자금 수령에 그치지 않고, 취득한 인증의 유지관리 및 연구노트 지도, 차년도 후속 정책과제 연계까지 기업이 안정적으로 스케일업할 수 있도록 지속적인 자문을 제공합니다.',
        'tone'  => 'navy',
    ),
);
?>
<section class="section section-advantage section-advantage--bizontop" id="section-advantage">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">BIZ ON TOP PHILOSOPHY</p>
      <h2 class="section-title">기업의 현재를 진단하고<br>미래의 성장을 설계합니다.</h2>
      <p class="section-desc">비즈온탑은 단편적인 상품 안내를 넘어, 기업의 재무 상태와 성장 단계를 입체적으로 검토하여 기업 가치를 높이는 3대 핵심 가치를 실천합니다.</p>
    </div>
    <div class="section-content">
      <div class="value-grid">
        <?php foreach ($g5_values as $item) { ?>
        <article class="value-card value-card--<?php echo htmlspecialchars($item['tone'], ENT_QUOTES, 'UTF-8'); ?> reveal">
          <span class="value-card__no">CORE VALUE <?php echo get_text($item['no']); ?></span>
          <h3 class="value-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="value-card__desc"><?php echo get_text($item['desc']); ?></p>
        </article>
        <?php } ?>
      </div>
    </div>
  </div>
</section>
