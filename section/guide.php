<?php
if (!defined('_GNUBOARD_')) exit;

$g5_guide_checklist = array(
    array('name' => '상호', 'desc' => '관할 등기소 내 중복 여부 확인'),
    array('name' => '본점 주소', 'desc' => '사업자등록 가능 임대차계약'),
    array('name' => '자본금', 'desc' => '100원 이상 (1,000~3,000만 원 권장)'),
    array('name' => '주주', 'desc' => '자본금을 출자한 주식 소유자'),
    array('name' => '임원', 'desc' => '이사/감사 (지분 없는 임원 1인 권장)'),
    array('name' => '사업목적', 'desc' => '현재 및 향후 영위할 구체적 업종'),
);
?>
<section class="section section-guide" id="section-guide">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">STARTUP GUIDE</p>
      <h2 class="section-title">법인설립,<br>무엇을 준비해야 할까요?</h2>
      <p class="section-desc">복잡해 보이는 법인설립 절차도 필수 준비사항과 프로세스를 미리 확인하면 불필요한 시행착오와 추가 비용을 방지할 수 있습니다.</p>
    </div>
    <div class="section-content">
      <div class="guide-grid">
        <article class="guide-card reveal">
          <div class="guide-card__top">
            <span class="guide-card__step">STEP 01</span>
          </div>
          <h3 class="guide-card__title">예상 소요기간</h3>
          <p class="guide-card__desc">법인 구조 및 서류 준비 후 법인등기 절차가 진행됩니다.</p>
          <ul class="guide-card__list">
            <li><span>1. 서류 및 정관 준비</span><strong>1~2일</strong></li>
            <li><span>2. 등기소 전자등기 심사</span><strong>2~3일</strong></li>
            <li><span>3. 사업자등록증 발급</span><strong>당일~1일</strong></li>
          </ul>
          <p class="guide-card__note">상황, 관할기관 및 서류 준비상태에 따라 기간이 달라질 수 있습니다.</p>
        </article>

        <article class="guide-card reveal">
          <div class="guide-card__top">
            <span class="guide-card__step guide-card__step--indigo">STEP 02</span>
          </div>
          <h3 class="guide-card__title">기본 준비사항</h3>
          <p class="guide-card__desc">설립 전 아래 6가지 기본 정보가 확정되어야 등기가 가능합니다.</p>
          <ul class="guide-card__checklist">
            <?php foreach ($g5_guide_checklist as $item) { ?>
            <li>
              <strong><?php echo get_text($item['name']); ?></strong>
              <span><?php echo get_text($item['desc']); ?></span>
            </li>
            <?php } ?>
          </ul>
          <p class="guide-card__note">상호 중복 및 사업목적 구성은 비즈온탑에서 사전 무료 검토를 지원합니다.</p>
        </article>

        <article class="guide-card reveal">
          <div class="guide-card__top">
            <span class="guide-card__step guide-card__step--amber">STEP 03</span>
          </div>
          <h3 class="guide-card__title">설립비용</h3>
          <p class="guide-card__desc">자본금, 본점 소재지, 설립 구조 등에 따라 등록면허세 등 관련 비용이 달라질 수 있습니다.</p>
          <ul class="guide-card__cost">
            <li>
              <strong>공과금(등록면허세/교육세)</strong>
              <p>자본금 규모 및 과밀억제권역 해당 여부(중과세/감면)에 따라 차등 산정</p>
            </li>
            <li>
              <strong>등기 수수료 &amp; 부대비용</strong>
              <p>전자등기 여부, 인감증명 및 법인도장 제작 등 실비</p>
            </li>
          </ul>
          <a href="#section-contact" class="btn btn-accent guide-card__cta">무료상담 신청하기</a>
        </article>
      </div>
    </div>
  </div>
</section>
