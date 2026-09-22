<?php
if (!defined('_GNUBOARD_')) exit;

$g5_process_steps = array(
    array(
        'no'       => '01',
        'title'    => '현재 상황 진단',
        'desc'     => '사업내용과 현재 상황, 법인을 설립하려는 목적을 먼저 확인합니다.',
        'keywords' => array('사업형태', '예상매출', '설립목적'),
    ),
    array(
        'no'       => '02',
        'title'    => '법인 구조 설계',
        'desc'     => '법인 운영에 필요한 기본 구조를 정리합니다.',
        'keywords' => array('상호', '자본금', '주주', '임원', '지분', '사업목적'),
    ),
    array(
        'no'       => '03',
        'title'    => '법인설립 진행',
        'desc'     => '필요한 서류와 절차를 확인하고 법인설립을 진행합니다.',
        'keywords' => array('서류준비', '법인등기'),
    ),
    array(
        'no'       => '04',
        'title'    => '사업 시작 준비',
        'desc'     => '법인설립 이후 사업자등록 등 사업운영에 필요한 사항을 안내합니다.',
        'keywords' => array('사업자등록', '세무', '노무'),
    ),
    array(
        'no'       => '05',
        'title'    => '기업 성장 지원',
        'desc'     => '필요한 기업은 정책자금, 기업인증, 연구소, 벤처기업 등 추가적인 기업 성장제도를 검토합니다.',
        'keywords' => array('정책자금', '기업인증', '기업부설연구소', '벤처기업'),
    ),
);
?>
<section class="section section-process section--alt" id="section-process">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">HOW IT WORKS</p>
      <h2 class="section-title">복잡한 법인설립,<br>5단계로 쉽게 진행합니다.</h2>
      <p class="section-desc">처음 법인을 만드는 분도 현재 어느 단계인지 쉽게 알 수 있도록<br>법인설립 과정을 체계적으로 안내합니다.</p>
    </div>
    <div class="section-content">
      <ol class="process-steps process-steps--pc reveal">
        <?php foreach ($g5_process_steps as $step) { ?>
        <li class="process-steps__item">
          <span class="process-steps__no"><?php echo get_text($step['no']); ?></span>
          <span class="process-steps__label">STEP <?php echo get_text($step['no']); ?></span>
          <h3 class="process-steps__title"><?php echo get_text($step['title']); ?></h3>
          <p class="process-steps__desc"><?php echo get_text($step['desc']); ?></p>
          <div class="process-steps__tags">
            <?php foreach ($step['keywords'] as $kw) { ?>
            <span>#<?php echo get_text($kw); ?></span>
            <?php } ?>
          </div>
        </li>
        <?php } ?>
      </ol>
      <ol class="process-steps process-steps--mo">
        <?php foreach ($g5_process_steps as $step) { ?>
        <li class="process-steps__mo-item reveal">
          <span class="process-steps__mo-no"><?php echo get_text($step['no']); ?></span>
          <div class="process-steps__mo-body">
            <span class="process-steps__label">STEP <?php echo get_text($step['no']); ?></span>
            <h3><?php echo get_text($step['title']); ?></h3>
            <p><?php echo get_text($step['desc']); ?></p>
            <div class="process-steps__tags">
              <?php foreach ($step['keywords'] as $kw) { ?>
              <span>#<?php echo get_text($kw); ?></span>
              <?php } ?>
            </div>
          </div>
        </li>
        <?php } ?>
      </ol>
      <div class="section-actions section-actions--center">
        <a href="#section-contact" class="btn btn-accent">무료상담 신청하기</a>
      </div>
    </div>
  </div>
</section>
