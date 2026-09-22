<?php
if (!defined('_GNUBOARD_')) exit;

$g5_comparison_rows = array(
    array(
        'category' => '설립',
        'en'       => 'Establishment',
        'sole'     => '상대적으로 간단',
        'sole_d'   => '세무서 사업자등록만으로 즉시 개시 가능',
        'corp'     => '법인등기 절차 필요',
        'corp_d'   => '정관 작성, 주주·임원 구성, 법원 등기소 등기 필수',
    ),
    array(
        'category' => '사업주체',
        'en'       => 'Legal Entity',
        'sole'     => '개인',
        'sole_d'   => '사업상 모든 채무와 법적 책임이 대표 개인에게 귀속',
        'corp'     => '독립된 법인',
        'corp_d'   => '대표자와 분리된 별도 법인격 부여 (유한책임 원칙)',
    ),
    array(
        'category' => '공동사업',
        'en'       => 'Co-Founding',
        'sole'     => '공동사업 구조 검토 필요',
        'sole_d'   => '공동사업자 등록은 가능하나 지분 분쟁 및 양도 시 세무 복잡',
        'corp'     => '주주 및 지분구조 설계 가능',
        'corp_d'   => '주식 비율에 따른 명확한 의결권 및 이익 배분 구조 확립',
    ),
    array(
        'category' => '투자',
        'en'       => 'Investment',
        'sole'     => '투자 구조에 제약이 있을 수 있음',
        'sole_d'   => '외부 엔젤/VC 지분 투자 유치가 사실상 불가능',
        'corp'     => '지분을 활용한 투자 구조 설계 가능',
        'corp_d'   => '신주발행(RCPS, 보통주), 스톡옵션 등 다양한 투자 유치 가능',
    ),
    array(
        'category' => '대외거래',
        'en'       => 'External Trust',
        'sole'     => '개인사업자 명의',
        'sole_d'   => '대기업 납품, 공공기관 입찰 및 대규모 계약 시 신인도 제약',
        'corp'     => '법인 명의',
        'corp_d'   => '독립 회계감사 및 법인 명의 계약으로 높은 공신력 확보',
    ),
    array(
        'category' => '기업 성장제도',
        'en'       => 'Growth Programs',
        'sole'     => '사업 및 제도별 적용 여부 확인',
        'sole_d'   => '일부 소상공인 정책자금 위주, R&D 및 대형 지원에 한계',
        'corp'     => '다양한 기업지원제도 검토 가능',
        'corp_d'   => '벤처기업, 연구소 인증, 중기부 창업패키지, 기보·신보 대형자금',
    ),
);
?>
<section class="section section-comparison section--alt" id="section-comparison">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">SOLE PROPRIETOR VS CORPORATION</p>
      <h2 class="section-title">개인사업자와 법인,<br>무엇이 다를까요?</h2>
      <p class="section-desc">무조건 법인이 좋은 것은 아닙니다.<br>현재 사업규모와 향후 계획에 맞는 형태를 선택하는 것이 중요합니다.</p>
    </div>
    <div class="section-content reveal">
      <div class="comparison-table" role="table" aria-label="개인사업자 vs 법인 비교">
        <div class="comparison-table__head" role="row">
          <div class="comparison-table__cell comparison-table__cell--cat" role="columnheader">비교 항목</div>
          <div class="comparison-table__cell comparison-table__cell--sole" role="columnheader">개인사업자</div>
          <div class="comparison-table__cell comparison-table__cell--corp" role="columnheader">법인 (주식회사) <span class="comparison-table__pill">기업성장 유리</span></div>
        </div>
        <?php foreach ($g5_comparison_rows as $i => $row) { ?>
        <div class="comparison-table__row<?php echo ($i % 2 === 1) ? ' is-alt' : ''; ?>" role="row">
          <div class="comparison-table__cell comparison-table__cell--cat" role="cell">
            <strong><?php echo get_text($row['category']); ?></strong>
            <span><?php echo get_text($row['en']); ?></span>
          </div>
          <div class="comparison-table__cell comparison-table__cell--sole" role="cell" data-label="개인사업자">
            <strong><?php echo get_text($row['sole']); ?></strong>
            <p><?php echo get_text($row['sole_d']); ?></p>
          </div>
          <div class="comparison-table__cell comparison-table__cell--corp" role="cell" data-label="법인 (주식회사)">
            <strong><?php echo get_text($row['corp']); ?></strong>
            <p><?php echo get_text($row['corp_d']); ?></p>
          </div>
        </div>
        <?php } ?>
      </div>

      <div class="comparison-note">
        <div class="comparison-note__body">
          <h3>&quot;법인이 항상 유리한 것은 아닙니다.&quot;</h3>
          <p>현재 매출, 사업형태, 주주구성, 향후 투자계획 등을 함께 확인한 후 결정하는 것이 좋습니다. 비즈온탑 전문 컨설턴트가 대표님의 현 사업 상황을 객관적으로 분석해 최적의 방향을 추천해 드립니다.</p>
        </div>
        <a href="#section-contact" class="btn btn-accent">무료상담 신청하기</a>
      </div>
    </div>
  </div>
</section>
