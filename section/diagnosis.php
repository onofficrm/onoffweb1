<?php
if (!defined('_GNUBOARD_')) exit;

if (!get_session('onoff_inquiry_token')) {
    set_session('onoff_inquiry_token', md5(uniqid((string) mt_rand(), true)));
}
$g5_inquiry_token = get_session('onoff_inquiry_token');
$g5_inquiry_action = G5_URL . '/proc/inquiry-submit.php';

$g5_diagnosis_situations = array(
    '처음 사업을 시작합니다',
    '개인사업자를 운영 중입니다',
    '공동창업을 준비하고 있습니다',
    '투자유치를 준비합니다',
    '정책자금이 필요합니다',
    '이미 법인을 운영하고 있습니다',
    '기타',
);
?>
<section class="section section-diagnosis section--alt" id="section-diagnosis">
  <div class="section-inner section-inner--narrow">
    <div class="section-head reveal">
      <p class="section-eyebrow">FREE CORPORATE CHECK</p>
      <h2 class="section-title">3분 법인설립 무료진단</h2>
      <p class="section-desc">복잡한 내용을 미리 준비하지 않아도 됩니다.<br>간단한 질문에 답해주시면 상담 시 필요한 내용을 정리해드립니다.</p>
      <div class="diagnosis-badges">
        <span>무료진단</span>
        <span>약 3분</span>
        <span>간편신청</span>
      </div>
    </div>
    <div class="section-content reveal">
      <div class="diagnosis-form-card">
        <form class="diagnosis-form cmp-consult-form" action="<?php echo htmlspecialchars($g5_inquiry_action, ENT_QUOTES, 'UTF-8'); ?>" method="post" novalidate>
          <input type="hidden" name="onoff_inquiry_token" value="<?php echo htmlspecialchars($g5_inquiry_token, ENT_QUOTES, 'UTF-8'); ?>">
          <input type="hidden" name="referer_page" value="<?php echo htmlspecialchars(G5_URL.'/#section-diagnosis', ENT_QUOTES, 'UTF-8'); ?>">
          <div class="cmp-form-row cmp-form-row--hp" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
            <label for="diag_website">웹사이트</label>
            <input type="text" id="diag_website" name="website_url" tabindex="-1" autocomplete="off">
          </div>

          <div class="diagnosis-form-grid">
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="diag_situation">현재 상황 <span class="cmp-form-required">*</span></label>
              <select id="diag_situation" class="cmp-form-input" required>
                <?php foreach ($g5_diagnosis_situations as $sit) { ?>
                <option value="<?php echo htmlspecialchars($sit, ENT_QUOTES, 'UTF-8'); ?>"><?php echo get_text($sit); ?></option>
                <?php } ?>
              </select>
            </div>
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="diag_name">이름 <span class="cmp-form-required">*</span></label>
              <input type="text" id="diag_name" name="name" class="cmp-form-input" placeholder="예: 홍길동 대표" autocomplete="name" required>
            </div>
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="diag_phone">연락처 <span class="cmp-form-required">*</span></label>
              <input type="tel" id="diag_phone" name="phone" class="cmp-form-input" placeholder="예: 010-1234-5678" autocomplete="tel" required>
            </div>
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="diag_company">회사명 또는 예정 법인명 <span class="cmp-form-optional">(선택)</span></label>
              <input type="text" id="diag_company" class="cmp-form-input" placeholder="예: 주식회사 비즈온 / 미정" autocomplete="organization">
            </div>
          </div>

          <div class="cmp-form-row">
            <label class="cmp-form-label" for="diag_extra">추가 문의내용 <span class="cmp-form-optional">(선택)</span></label>
            <textarea id="diag_extra" class="cmp-form-input cmp-form-textarea" rows="3" placeholder="설립 목적, 희망 일정, 궁금한 점을 적어 주세요."></textarea>
          </div>

          <textarea name="message" id="diag_message_payload" class="sound_only" rows="2" required aria-hidden="true">[3분 법인설립 무료진단]
현재 상황: 처음 사업을 시작합니다
기업명: (입력 대기)
추가 내용: (없음)</textarea>

          <div class="cmp-form-row cmp-privacy-agree">
            <label class="cmp-privacy-agree__label">
              <input type="checkbox" id="diag_privacy" name="privacy_agree" value="1" required>
              <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <p class="cmp-privacy-agree__note">수집 목적: 법인설립 무료진단 및 상담 안내 / 수집 항목: 이름, 연락처, 상황 유형 / 보유 기간: 상담 종료 시 즉시 파기 (관계 법령 준수)</p>
          </div>

          <button type="submit" class="btn btn-accent diagnosis-form__submit cmp-consult-form__submit">3분 무료진단 신청하기</button>
          <p class="diagnosis-form__note">※ 입력하신 정보는 상담 목적 외로 사용되지 않으며 안전하게 보호됩니다.</p>
          <p class="cmp-consult-form__status" role="status" aria-live="polite" hidden></p>
        </form>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  var form = document.querySelector('.diagnosis-form');
  if (!form) return;
  var syncMessage = function () {
    var situation = (document.getElementById('diag_situation') || {}).value || '';
    var company = (document.getElementById('diag_company') || {}).value || '';
    var extra = (document.getElementById('diag_extra') || {}).value || '';
    var payload = [
      '[3분 법인설립 무료진단]',
      '현재 상황: ' + (situation || '미선택'),
      '기업명: ' + (company.trim() || '미입력'),
      '추가 내용: ' + (extra.trim() || '(없음)')
    ].join('\n');
    var hidden = document.getElementById('diag_message_payload');
    if (hidden) hidden.value = payload;
  };
  form.addEventListener('input', syncMessage);
  form.addEventListener('change', syncMessage);
  form.addEventListener('submit', syncMessage, true);
  syncMessage();
})();
</script>
