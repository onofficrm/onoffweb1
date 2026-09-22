<?php
if (!defined('_GNUBOARD_')) exit;

$g5_services = array(
    array(
        'badge'     => 'SERVICE 01',
        'name'      => '법인설립',
        'title'     => '사업에 맞는 법인 구조 설계',
        'desc'      => '법인을 단순히 설립하는 데 그치지 않고 사업형태와 향후 계획을 고려해 기본 구조를 함께 검토합니다.',
        'features'  => array('신규 법인설립', '1인 법인', '공동창업 법인', '주주 및 임원구조', '사업목적 구성'),
        'highlight' => true,
        'tone'      => 'blue',
    ),
    array(
        'badge'     => 'SERVICE 02',
        'name'      => '법인전환',
        'title'     => '개인사업자의 법인전환',
        'desc'      => '사업규모 증가에 따라 법인전환을 고려하는 경우 현재 사업상황을 검토하고 적절한 전환 방향을 상담합니다.',
        'features'  => array('법인전환 상담', '기존 사업현황 검토', '전환 방식 검토'),
        'highlight' => false,
        'tone'      => 'sky',
    ),
    array(
        'badge'     => 'SERVICE 03',
        'name'      => '기업지원',
        'title'     => '정책자금 · 기업인증',
        'desc'      => '기업의 업력, 업종, 재무상황 등을 확인하여 활용 가능한 기업지원제도를 검토합니다.',
        'features'  => array('정책자금', '벤처기업확인', '기업부설연구소', '연구개발전담부서', '이노비즈', '메인비즈'),
        'highlight' => false,
        'tone'      => 'indigo',
    ),
    array(
        'badge'     => 'SERVICE 04',
        'name'      => '경영컨설팅',
        'title'     => '기업 성장 단계별 컨설팅',
        'desc'      => '법인설립 이후 기업이 성장하면서 필요한 다양한 경영 이슈를 함께 검토합니다.',
        'features'  => array('기업 성장전략', '재무구조', '조직 및 운영', '기업인증 연계'),
        'highlight' => false,
        'tone'      => 'teal',
    ),
);
?>
<section class="section section-service section-service--incorp" id="section-service">
  <div class="section-inner">
    <div class="section-head reveal">
      <p class="section-eyebrow">BUSINESS SERVICES</p>
      <h2 class="section-title">법인설립부터<br>기업의 성장까지 함께합니다.</h2>
      <p class="section-desc">단순 법인등기 대행에 머무르지 않고, 개인사업자 전환부터 정책자금,<br>각종 기업인증 및 경영 전략까지 원스톱으로 지원합니다.</p>
    </div>
    <div class="section-content">
      <div class="service-incorp-grid">
        <?php foreach ($g5_services as $item) { ?>
        <article class="service-incorp-card service-incorp-card--<?php echo htmlspecialchars($item['tone'], ENT_QUOTES, 'UTF-8'); ?><?php echo !empty($item['highlight']) ? ' is-highlight' : ''; ?> reveal">
          <div class="service-incorp-card__meta">
            <span class="service-incorp-card__badge"><?php echo get_text($item['badge']); ?></span>
            <span class="service-incorp-card__name"><?php echo get_text($item['name']); ?></span>
            <?php if (!empty($item['highlight'])) { ?>
            <span class="service-incorp-card__core">핵심 서비스</span>
            <?php } ?>
          </div>
          <h3 class="service-incorp-card__title"><?php echo get_text($item['title']); ?></h3>
          <p class="service-incorp-card__desc"><?php echo get_text($item['desc']); ?></p>
          <p class="service-incorp-card__label">주요 제공 서비스</p>
          <ul class="service-incorp-card__features">
            <?php foreach ($item['features'] as $feature) { ?>
            <li><?php echo get_text($feature); ?></li>
            <?php } ?>
          </ul>
          <a href="#section-contact" class="btn <?php echo !empty($item['highlight']) ? 'btn-accent' : 'btn-outline'; ?>">자세히 보기</a>
        </article>
        <?php } ?>
      </div>
    </div>
  </div>
</section>
