<?php
if (!defined('_GNUBOARD_')) exit;

$g5_situations = array(
    array(
        'no'    => '01',
        'title' => '처음 사업을 시작합니다',
        'desc'  => '개인사업자로 시작해야 할지, 법인으로 시작해야 할지 고민하고 있어요.',
        'tag'   => '창업 형태 및 절세 비교',
    ),
    array(
        'no'    => '02',
        'title' => '개인사업자를 운영 중입니다',
        'desc'  => '사업 규모가 커지면서 법인전환 시점을 고민하고 있어요.',
        'tag'   => '소득세 절감 & 법인전환 검토',
    ),
    array(
        'no'    => '03',
        'title' => '공동창업을 준비합니다',
        'desc'  => '대표자와 주주, 지분을 어떻게 정해야 할지 모르겠어요.',
        'tag'   => '주주 구성 및 정관 특약 설계',
    ),
    array(
        'no'    => '04',
        'title' => '투자유치를 준비합니다',
        'desc'  => '향후 투자를 고려해 법인설립과 지분 구조를 준비하려고 합니다.',
        'tag'   => '신주발행 및 스톡옵션 사전 고려',
    ),
    array(
        'no'    => '05',
        'title' => '정책자금이 필요합니다',
        'desc'  => '법인설립 이후 활용할 수 있는 기업지원제도가 궁금합니다.',
        'tag'   => '창업 초기 정책자금 & R&D 매칭',
    ),
    array(
        'no'    => '06',
        'title' => '이미 법인을 운영하고 있습니다',
        'desc'  => '벤처기업, 연구소, 기업인증, 정책자금 등을 준비하고 싶습니다.',
        'tag'   => '기업인증 및 성장 스케일업',
    ),
);
?>
<section class="section section-situation" id="section-situation">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">IS THIS YOUR SITUATION?</p>
      <h2 class="section-title">혹시 이런 고민 때문에<br>법인설립을 알아보고 계신가요?</h2>
      <p class="section-desc">사업을 처음 시작하는 경우부터 개인사업자의 법인전환, 공동창업, 투자유치까지<br>현재 상황에 따라 준비해야 할 내용이 달라집니다.</p>
    </div>
    <div class="section-content">
      <div class="situation-grid">
        <?php foreach ($g5_situations as $item) { ?>
        <a href="#section-diagnosis" class="situation-card reveal">
          <div class="situation-card__top">
            <span class="situation-card__no"><?php echo get_text($item['no']); ?></span>
          </div>
          <h3 class="situation-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="situation-card__desc"><?php echo get_text($item['desc']); ?></p>
          <span class="situation-card__tag">#<?php echo get_text($item['tag']); ?></span>
        </a>
        <?php } ?>
      </div>
      <div class="section-actions section-actions--center">
        <a href="#section-diagnosis" class="btn btn-accent">내 상황에 맞는 방법 확인하기</a>
      </div>
    </div>
  </div>
</section>
