<?php
if (!defined('_GNUBOARD_')) exit;

include_once G5_PATH . '/section/_helpers.php';

$g5_faq_items = array(
    array(
        'question' => '정책자금 신청 시 컨설팅을 받으면 어떤 점이 유리한가요?',
        'answer'   => '정부 정책자금은 한정된 예산 속에서 기관별 엄격한 기술성, 사업성, 재무 평가를 거쳐 선정됩니다. 탈락 시 통상 6개월간 재신청이 제한되므로, 비즈온탑은 사전 정밀 진단을 통해 승인 가능성이 가장 높은 트랙을 매칭하고 사업계획서 고도화 및 실사 인터뷰 코칭까지 밀착 지원하여 성공 가능성을 극대화합니다.',
    ),
    array(
        'question' => '기존 대출이 많거나 담보가 부족한데도 자금 조달이 가능한가요?',
        'answer'   => '네, 가능합니다. 정부 정책자금은 일반 시중은행과 달리 부동산 담보뿐만 아니라 신용보증재단, 신용보증기금, 기술보증기금의 보증서를 바탕으로 실행됩니다. 기술력, 고용 실적, 사업 모델의 혁신성을 입증하면 무담보 신용 보증으로 자금을 확보할 수 있습니다.',
    ),
    array(
        'question' => '벤처기업확인과 기업부설연구소를 함께 진행하면 좋은 이유는 무엇인가요?',
        'answer'   => '기업부설연구소를 설립하면 연구개발비의 25%를 세액공제 받을 뿐만 아니라, 연구 인력과 과제 실적이 벤처기업 인증 심사에서 강력한 기술성 가점으로 인정됩니다. 두 가지 인증을 패키지로 진행하면 세제 감면 효과를 극대화하고 심사 통과 기간을 단축할 수 있습니다.',
    ),
    array(
        'question' => '비즈온탑의 초기 무료 상담은 어떻게 진행되나요?',
        'answer'   => '온라인 간편 상담 신청 또는 대표번호로 접수해 주시면, 전문 수석 컨설턴트가 기업의 업종, 업력, 재무 현황을 1차 유선 분석한 뒤 사전 기업진단 보고서를 무료로 제공해 드립니다. 심층 자문이나 대면 방문 상담 역시 대표님의 편의에 맞춰 진행됩니다.',
    ),
    array(
        'question' => '메인비즈와 이노비즈의 주된 차이점은 무엇인가요?',
        'answer'   => '메인비즈(MAIN-BIZ)는 마케팅, 조직, 유통 등 경영 시스템 전반의 혁신을 평가하는 제도로 비제조업 및 서비스업에 유리합니다. 반면 이노비즈(INNO-BIZ)는 R&D 역량과 생산 기술력을 중점 평가하는 제도로 제조업 및 IT 개발 기업에 적합합니다.',
    ),
    array(
        'question' => '법인 설립 및 전환 시 정관 작성이 왜 중요한가요?',
        'answer'   => '법인 정관에 임원 퇴직금 지급 규정, 유족보상 규정, 차등배당 규정이 미비하면 추후 세무조사 시 손금불산입되어 막대한 법인세와 가산세가 부과될 수 있습니다. 비즈온탑은 세무와 법무 리스크가 원천 차단된 맞춤형 정관을 설계해 드립니다.',
    ),
);

$g5_faqs = $g5_faq_items;
?>
<section class="section section-faq section--alt" id="section-faq">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">FAQ</p>
      <h2 class="section-title">자주 묻는 질문</h2>
      <p class="section-desc">정책자금·기업인증·경영컨설팅 상담 전 가장 많이 문의하시는 내용입니다.</p>
    </div>
    <div class="section-content reveal">
      <?php if (!empty($g5_faq_items)) { ?>
      <div class="faq-list" data-accordion-mode="single">
        <?php foreach ($g5_faq_items as $i => $faq) {
            $faq_q = isset($faq['question']) ? $faq['question'] : (isset($faq['q']) ? $faq['q'] : '');
            $faq_a = isset($faq['answer']) ? $faq['answer'] : (isset($faq['a']) ? $faq['a'] : '');
            if ($faq_q === '' || $faq_a === '') {
                continue;
            }
            ?>
        <div class="faq-item<?php echo $i === 0 ? ' is-open' : ''; ?>">
          <button type="button" class="faq-question" aria-expanded="<?php echo $i === 0 ? 'true' : 'false'; ?>">
            <?php echo get_text($faq_q); ?>
          </button>
          <div class="faq-answer">
            <p><?php echo get_text($faq_a); ?></p>
          </div>
        </div>
        <?php } ?>
      </div>
      <?php } ?>
      <?php
      if (!empty($g5_faq_items)) {
          g5_sample_faq_output_schema($g5_faq_items);
      }
      ?>
    </div>
  </div>
</section>
