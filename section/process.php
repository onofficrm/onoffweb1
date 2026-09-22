<?php
if (!defined('_GNUBOARD_')) exit;

$g5_process_steps = array(
    array('no' => '01', 'title' => '상담 신청', 'desc' => '온라인 간편 상담 또는 유선을 통해 기업 기본 정보 및 당면 과제를 접수합니다.', 'tone' => 'blue'),
    array('no' => '02', 'title' => '기업 현황 진단', 'desc' => '재무제표, 매출 추이, 업력, 기술력을 정밀 분석하여 지원 적격성을 검토합니다.', 'tone' => 'blue'),
    array('no' => '03', 'title' => '맞춤 솔루션 제안', 'desc' => '기관별 자금 트랙과 세제 감면 인증 등 최적의 맞춤 실행 계획을 제안합니다.', 'tone' => 'gold'),
    array('no' => '04', 'title' => '계약 및 컨설팅 진행', 'desc' => '전담 수석 컨설턴트 배정 후 사업계획서 편철, 현장 실사 및 PT를 밀착 지도합니다.', 'tone' => 'navy'),
    array('no' => '05', 'title' => '결과 확인 및 사후관리', 'desc' => '자금 실행 및 인증 취득 완료 후 후속 연계 과제와 정기 사후관리를 지속합니다.', 'tone' => 'green'),
);
?>
<section class="section section-process section--alt" id="section-process">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">5-STEP ROADMAP</p>
      <h2 class="section-title">체계적인 5단계 컨설팅 프로세스</h2>
      <p class="section-desc">사전 상담부터 최종 사후관리까지 전담 컨설턴트와 함께 단계별로 명확하게 진행됩니다.</p>
    </div>
    <div class="section-content">
      <ol class="process-timeline process-timeline--pc reveal">
        <?php foreach ($g5_process_steps as $step) { ?>
        <li class="process-timeline__item process-timeline__item--<?php echo htmlspecialchars($step['tone'], ENT_QUOTES, 'UTF-8'); ?>">
          <div class="process-timeline__num">
            <span class="process-timeline__step-label">STEP</span>
            <span class="process-timeline__step-no"><?php echo get_text($step['no']); ?></span>
          </div>
          <h3 class="process-timeline__title"><?php echo get_text($step['title']); ?></h3>
          <p class="process-timeline__desc"><?php echo get_text($step['desc']); ?></p>
        </li>
        <?php } ?>
      </ol>
      <ol class="process-timeline process-timeline--mo">
        <?php foreach ($g5_process_steps as $i => $step) { ?>
        <li class="process-timeline__mo-item reveal">
          <span class="process-timeline__mo-num"><?php echo (int) ($i + 1); ?></span>
          <div class="process-timeline__mo-body">
            <span class="process-timeline__mo-label">STEP <?php echo get_text($step['no']); ?></span>
            <h3><?php echo get_text($step['title']); ?></h3>
            <p><?php echo get_text($step['desc']); ?></p>
          </div>
        </li>
        <?php } ?>
      </ol>
      <div class="section-actions section-actions--center">
        <a href="<?php echo G5_URL; ?>/page/about.php" class="btn btn-outline">프로세스 상세 내용 확인하기 →</a>
      </div>
    </div>
  </div>
</section>
