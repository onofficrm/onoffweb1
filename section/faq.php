<?php
if (!defined('_GNUBOARD_')) exit;

include_once G5_PATH . '/section/_helpers.php';
include_once G5_PATH . '/lib/bizontop-faq.php';

$g5_faq_items = bizontop_faq_items();
$g5_faqs = $g5_faq_items;
?>
<section class="section section-faq" id="section-faq">
  <div class="section-inner section-inner--narrow">
    <div class="section-head reveal">
      <p class="section-eyebrow">FAQ</p>
      <h2 class="section-title">법인설립,<br>많이 궁금해하시는 질문입니다.</h2>
      <p class="section-desc">예비 대표님들이 가장 많이 문의하시는 핵심 질문들을 엄선하여 알기 쉽게 정리해드렸습니다.</p>
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
      <div class="faq-cta-box">
        <h3>더 궁금한 점이 있으신가요?</h3>
        <p>전문 컨설턴트가 대표님의 사업 형태에 맞춘 1:1 맞춤 답변을 드립니다.</p>
        <a href="#section-contact" class="btn btn-accent">무료상담 신청하기</a>
      </div>
    </div>
  </div>
</section>
