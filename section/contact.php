<?php
if (!defined('_GNUBOARD_')) exit;

if (!get_session('onoff_inquiry_token')) {
    set_session('onoff_inquiry_token', md5(uniqid((string) mt_rand(), true)));
}
$g5_inquiry_token = get_session('onoff_inquiry_token');
$g5_inquiry_action = G5_URL . '/proc/inquiry-submit.php';
$g5_contact_tel = function_exists('g5site_cfg') ? g5site_cfg('phone', '02-0000-0000') : '02-0000-0000';
$g5_contact_tel_link = function_exists('g5site_tel_link') ? g5site_tel_link($g5_contact_tel) : 'tel:0200000000';
$g5_contact_email = function_exists('g5site_cfg') ? g5site_cfg('email', 'consult@bizontop.kr') : 'consult@bizontop.kr';
?>
<section class="section section-contact section-contact--incorp section--dark" id="section-contact">
  <div class="section-inner section-inner--narrow">
    <div class="section-head reveal">
      <p class="section-eyebrow">FREE CORPORATE ADVISORY</p>
      <h2 class="section-title">아직 법인설립을<br>결정하지 못하셨나요?</h2>
      <p class="section-desc">
        <strong>괜찮습니다.</strong><br>
        현재 사업상황을 알려주시면 법인설립이 필요한지부터 함께 확인해드립니다.<br>
        <span class="section-contact__highlight">3분이면 기본 상담 신청이 완료됩니다.</span>
      </p>
      <div class="section-actions section-actions--center">
        <a href="#section-diagnosis" class="btn btn-accent">3분 법인설립 진단하기</a>
      </div>
      <p class="section-contact__note">법인설립 · 법인전환 · 정책자금 · 기업인증 상담</p>
    </div>
    <div class="section-content reveal">
      <div class="consult-form-card">
        <div class="consult-form-card__head">
          <h3>비즈온탑 1:1 무료 상담 신청</h3>
          <p>접수 후 담당 컨설턴트가 확인하여 연락드립니다.</p>
        </div>
        <form class="biz-consult-form cmp-consult-form" action="<?php echo htmlspecialchars($g5_inquiry_action, ENT_QUOTES, 'UTF-8'); ?>" method="post" novalidate>
          <input type="hidden" name="onoff_inquiry_token" value="<?php echo htmlspecialchars($g5_inquiry_token, ENT_QUOTES, 'UTF-8'); ?>">
          <input type="hidden" name="referer_page" value="<?php echo htmlspecialchars(G5_URL.'/#section-contact', ENT_QUOTES, 'UTF-8'); ?>">
          <div class="cmp-form-row cmp-form-row--hp" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
            <label for="biz_consult_website">웹사이트</label>
            <input type="text" id="biz_consult_website" name="website_url" tabindex="-1" autocomplete="off">
          </div>

          <div class="consult-form-grid">
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="biz_consult_company">기업명 (상호명) <span class="cmp-form-optional">(선택)</span></label>
              <input type="text" id="biz_consult_company" class="cmp-form-input" placeholder="예: (주)비즈온테크 / 미정" autocomplete="organization">
            </div>
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="biz_consult_name">이름 (신청자 / 직책) <span class="cmp-form-required">*</span></label>
              <input type="text" id="biz_consult_name" name="name" class="cmp-form-input" placeholder="예: 홍길동 대표" autocomplete="name" required>
            </div>
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="biz_consult_phone">연락처 (휴대전화) <span class="cmp-form-required">*</span></label>
              <input type="tel" id="biz_consult_phone" name="phone" class="cmp-form-input" placeholder="예: 010-1234-5678" autocomplete="tel" required>
            </div>
            <div class="cmp-form-row">
              <label class="cmp-form-label" for="biz_consult_service">관심 서비스</label>
              <select id="biz_consult_service" class="cmp-form-input">
                <option value="법인설립">법인설립</option>
                <option value="법인전환">법인전환</option>
                <option value="정책자금/기업인증">정책자금 / 기업인증</option>
                <option value="경영컨설팅">경영컨설팅</option>
                <option value="종합 패키지">종합 패키지 컨설팅</option>
              </select>
            </div>
          </div>

          <div class="cmp-form-row">
            <label class="cmp-form-label" for="biz_consult_extra">추가 문의내용 <span class="cmp-form-optional">(선택)</span></label>
            <textarea id="biz_consult_extra" class="cmp-form-input cmp-form-textarea" rows="3" placeholder="현재 업종, 업력, 설립 목적 등을 적어 주시면 상담이 더 정확해집니다."></textarea>
          </div>

          <textarea name="message" id="biz_consult_message_payload" class="sound_only" rows="2" required aria-hidden="true">관심 서비스: 법인설립 / 기업명: (입력 대기) / 추가 내용: (없음)</textarea>

          <div class="cmp-form-row cmp-privacy-agree">
            <label class="cmp-privacy-agree__label">
              <input type="checkbox" id="biz_consult_privacy" name="privacy_agree" value="1" required>
              <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <p class="cmp-privacy-agree__note">수집 목적: 1:1 법인설립·기업성장 무료 상담 안내 / 수집 항목: 기업명, 이름, 연락처 / 보유 기간: 상담 종료 시 즉시 파기 (관계 법령 준수)</p>
          </div>

          <button type="submit" class="btn btn-accent consult-form-submit cmp-consult-form__submit">무료 상담 신청</button>
          <p class="consult-form-note">※ 입력하신 정보는 안전하게 처리되며 상담 목적 외로 사용되지 않습니다.</p>
          <p class="cmp-consult-form__status" role="status" aria-live="polite" hidden></p>
        </form>

        <ul class="contact-info contact-info--inline">
          <li><strong>전화</strong> <a href="<?php echo htmlspecialchars($g5_contact_tel_link, ENT_QUOTES, 'UTF-8'); ?>"><?php echo get_text($g5_contact_tel); ?></a></li>
          <li><strong>이메일</strong> <?php echo get_text($g5_contact_email); ?></li>
          <li><strong>운영시간</strong> 평일 09:00 – 18:00</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  var form = document.querySelector('.biz-consult-form');
  if (!form) return;
  var syncMessage = function () {
    var company = (document.getElementById('biz_consult_company') || {}).value || '';
    var service = (document.getElementById('biz_consult_service') || {}).value || '';
    var extra = (document.getElementById('biz_consult_extra') || {}).value || '';
    var payload = [
      '관심 서비스: ' + (service || '미선택'),
      '기업명: ' + (company.trim() || '미입력'),
      '추가 내용: ' + (extra.trim() || '(없음)')
    ].join('\n');
    var hidden = document.getElementById('biz_consult_message_payload');
    if (hidden) hidden.value = payload;
  };
  form.addEventListener('input', syncMessage);
  form.addEventListener('change', syncMessage);
  form.addEventListener('submit', syncMessage, true);
  syncMessage();
})();
</script>
