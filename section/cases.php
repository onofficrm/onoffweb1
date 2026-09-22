<?php
if (!defined('_GNUBOARD_')) exit;

/**
 * 메인 컨설팅 사례 — 관리자 동의 사례만 게시.
 * 빈 배열이면 안내 UI만 표시 (허위 사례 생성 금지).
 * 게시판(cases) 연동 시 latest()로 교체 가능.
 */
$g5_cases = array(
    array(
        'service' => '중소기업 정책자금 & 시설자금',
        'industry'=> '정밀 금형 및 자동차 부품 제조',
        'title'   => '정밀 금형 제조기업 중진공 시설 및 운전자금 24억 원 조달',
        'process' => '기존 사업장 임대차 비용 절감 분석 후 산업단지 부지 매입 계획 수립, 공학적 설비 견적서 편철 및 평가위원 맞춤형 사업계획서 보완',
        'result'  => '중진공 시설 및 운전자금 총 24억 원 최저 2%대 우대금리 승인 및 자금 실행 완료',
        'period'  => '컨설팅 착수 후 4주 만에 기표',
    ),
    array(
        'service' => '창업기업자금 & 벤처기업확인',
        'industry'=> 'AI 기반 스마트 물류 솔루션',
        'title'   => 'AI 물류 솔루션 스타트업 창업기업자금 및 벤처인증 동시 획득',
        'process' => '초기 재무제표 부재를 보완하기 위해 기술 특허 등록원부와 소프트웨어 아키텍처 기술보고서 작성, 기보 전문위원 기술평가 현장 대응 코칭',
        'result'  => '기보 청년창업보증 5억 원 조달 및 혁신성장형 벤처기업확인서 획득 (5년간 법인세 50% 감면)',
        'period'  => '창업 2년 차에 동시 달성',
    ),
    array(
        'service' => '운전자금 & 메인비즈 인증',
        'industry'=> 'HACCP 인증 육가공품 유통',
        'title'   => '식품 가공·유통기업 원자재 구매 운전자금 8억 및 메인비즈 취득',
        'process' => '대형 유통 채널 납품 수주잔고와 공급계약서 집중 편철, 경영혁신 자가진단표 720점 달성 및 신용보증기금 지점 심사 대응',
        'result'  => '신보 특례보증 8억 원 조달 성공 및 메인비즈 경영혁신기업 선정 (금리 0.3%p 우대)',
        'period'  => '컨설팅 후 3주 내 완료',
    ),
    array(
        'service' => '기업부설연구소 & 이노비즈 인증',
        'industry'=> '친환경 포장재 및 생분해 소재',
        'title'   => '친환경 소재 개발기업 기업부설연구소 설립 및 이노비즈 A등급',
        'process' => '이공계 연구원 전담 배치 및 독립 공간 실측, 연구개발계획서 및 연구노트 관리체계 수립, 기보 4대 기술혁신 영역 현장 실사 동행',
        'result'  => 'KOITA 정식 연구소 인정서 수령 (연간 1.2억 절세 체계) 및 이노비즈 A등급 획득, 후속 R&D 과제 4억 연계',
        'period'  => '2개월 종합 컨설팅',
    ),
);

$g5_cases_board_url = get_pretty_url('cases');
if (!$g5_cases_board_url) {
    $g5_cases_board_url = G5_BBS_URL.'/board.php?bo_table=cases';
}
?>
<section class="section section-cases" id="section-cases">
  <div class="section-inner">
    <div class="section-head section-head--row reveal">
      <div>
        <p class="section-eyebrow">CONSULTING CASE STUDIES</p>
        <h2 class="section-title">실제 컨설팅 진행 사례</h2>
        <p class="section-desc">고객사의 사전 동의를 득한 검증된 컨설팅 진행 내용과 결과 요약입니다.</p>
      </div>
      <a href="<?php echo htmlspecialchars($g5_cases_board_url, ENT_QUOTES, 'UTF-8'); ?>" class="section-head__link">사례 게시판 전체보기 →</a>
    </div>
    <div class="section-content">
      <?php if (!empty($g5_cases)) { ?>
      <div class="cases-grid">
        <?php foreach ($g5_cases as $item) { ?>
        <article class="cases-card reveal">
          <div class="cases-card__meta">
            <span class="cases-card__service"><?php echo get_text($item['service']); ?></span>
            <span class="cases-card__industry">업종: <?php echo get_text($item['industry']); ?></span>
          </div>
          <h3 class="cases-card__title"><?php echo get_text($item['title']); ?></h3>
          <div class="cases-card__block">
            <span class="cases-card__label">진행 내용</span>
            <p><?php echo get_text($item['process']); ?></p>
          </div>
          <div class="cases-card__result">
            <span class="cases-card__label">결과 요약</span>
            <p><?php echo get_text($item['result']); ?></p>
          </div>
          <div class="cases-card__foot">
            <span>소요 기간: <?php echo get_text($item['period']); ?></span>
            <span>※ 기업 정보 비식별화 처리</span>
          </div>
        </article>
        <?php } ?>
      </div>
      <?php } else { ?>
      <div class="cases-empty reveal">
        <h3>등록된 공개 컨설팅 사례를 준비 중입니다.</h3>
        <p>비즈온탑은 고객사의 영업비밀과 개인정보 보호 규정을 철저히 준수합니다. 허위 사례를 생성하지 않으며, 정식 동의를 완료한 실제 검증 사례에 한하여 순차적으로 공개하고 있습니다.</p>
        <a href="<?php echo G5_URL; ?>/#section-contact" class="btn btn-outline">유사 업종 1:1 비공개 상담 문의</a>
      </div>
      <?php } ?>
      <p class="cases-notice">비즈온탑은 금융 및 경영 자문 규정을 준수하며, 고객사의 사전 승인 없는 허위·과장 사례를 게시하지 않습니다.</p>
    </div>
  </div>
</section>
