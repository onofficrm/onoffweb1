<?php
include_once(dirname(__FILE__).'/_init.php');
include_once(G5_PATH.'/section/_helpers.php');

$cat = isset($_GET['cat']) ? preg_replace('/[^a-z0-9_-]/i', '', $_GET['cat']) : 'funding';

$catalog = array(
    'funding' => array(
        'title' => '정책자금',
        'desc'  => '기업 규모와 목적에 부합하는 최적의 정부 정책자금을 매칭합니다.',
        'items' => array(
            array('title' => '소상공인 정책자금', 'desc' => '소상공인시장진흥공단 및 지역신용보증재단 저금리 지원'),
            array('title' => '중소기업 정책자금', 'desc' => '중진공, 기보, 신보 연계 성장 동력 맞춤형 융자'),
            array('title' => '창업기업 정책자금', 'desc' => '예비창업자 및 7년 이내 초기 창업기업 특화 자금'),
            array('title' => '운전자금', 'desc' => '원부자재 구매, 인건비, 마케팅 등 기업 운영 유동성 확보'),
            array('title' => '시설자금', 'desc' => '공장 신축, 기계설비 매입, 사업장 확장용 중장기 자금'),
        ),
    ),
    'startup' => array(
        'title' => '창업기업자금',
        'desc'  => '업력 7년 미만 초기 창업기업의 안정적 데스밸리 극복을 지원합니다.',
        'items' => array(
            array('title' => '창업기업 정책자금', 'desc' => '무담보 신용 위주 정책자금 매칭'),
            array('title' => '청년창업 특화', 'desc' => '청년창업사관학교·기보 청년보증 연계'),
        ),
    ),
    'venture' => array(
        'title' => '벤처기업확인',
        'desc'  => '법인세·취득세 감면과 정부 지원 가점을 확보하는 벤처인증 컨설팅입니다.',
        'items' => array(
            array('title' => '벤처기업확인', 'desc' => '법인세 50% 감면, 취득세 75% 감면'),
            array('title' => '인증 패키지', 'desc' => '연구소 설립과 병행 시 세제 혜택 극대화'),
        ),
    ),
    'rnd' => array(
        'title' => '기업부설연구소',
        'desc'  => '연구개발비 세액공제와 연구전담인력 비과세 체계를 구축합니다.',
        'items' => array(
            array('title' => '기업부설연구소', 'desc' => '연구개발비 25% 세액공제'),
            array('title' => '연구개발전담부서', 'desc' => '소규모 연구인력 세제·기술평가 우대'),
        ),
    ),
    'corp' => array(
        'title' => '법인설립·전환',
        'desc'  => '절세형 법인 전환과 정관·주주구조 최적화를 지원합니다.',
        'items' => array(
            array('title' => '법인설립 컨설팅', 'desc' => '개인사업자 법인전환, 정관 정비'),
            array('title' => '재무구조 개선', 'desc' => '가지급금 정리, 신용등급 개선'),
        ),
    ),
    'facility' => array(
        'title' => '시설자금',
        'desc'  => '공장·사옥 매입 및 설비 도입을 위한 장기 저리 자금 조달입니다.',
        'items' => array(
            array('title' => '시설자금', 'desc' => '소요 자금의 최대 80~90% 장기 저리 조달'),
            array('title' => '부동산 시설자금', 'desc' => '사옥·공장 부지 매입·건축 자금'),
        ),
    ),
    'cert' => array(
        'title' => '기업인증',
        'desc'  => '세제 혜택과 공공입찰 가점을 확보하는 국가 공인 인증 컨설팅입니다.',
        'items' => array(
            array('title' => '벤처기업확인', 'desc' => '법인세·취득세 감면 및 정부 가점'),
            array('title' => '기업부설연구소', 'desc' => 'R&D 세액공제·연구인력 비과세'),
            array('title' => '이노비즈·메인비즈', 'desc' => '기술·경영혁신 인증 및 금융 우대'),
            array('title' => 'ISO 인증', 'desc' => '품질·환경·안전보건 국제표준'),
        ),
    ),
    'consulting' => array(
        'title' => '경영컨설팅',
        'desc'  => '기업 생애주기 전반의 재무구조 개선과 지속 성장 전략을 제안합니다.',
        'items' => array(
            array('title' => '법인설립·전환', 'desc' => '정관 정비 및 주주구조 최적화'),
            array('title' => '통합경영자문', 'desc' => '노무·세무·법률 리스크 예방'),
            array('title' => '부동산·시설자금', 'desc' => '사옥·공장 매입 원스톱 지원'),
            array('title' => '성장전략 수립', 'desc' => '신사업·BM 재정비·스케일업'),
        ),
    ),
);

if (!isset($catalog[$cat])) {
    $cat = 'funding';
}
$page = $catalog[$cat];

g5_page_start($page['title']);
?>
<div class="page-template page-service">
  <header class="page-hero reveal">
    <div class="page-inner">
      <p class="page-eyebrow">Service</p>
      <h1 class="page-title"><?php echo get_text($page['title']); ?></h1>
      <p class="page-desc"><?php echo get_text($page['desc']); ?></p>
    </div>
  </header>

  <section class="page-section reveal">
    <div class="page-inner">
      <h2 class="page-section__title">대표 서비스</h2>
      <div class="card-grid card-grid--auto">
        <?php foreach ($page['items'] as $item) { ?>
        <article class="base-card">
          <h3 class="base-card-title"><?php echo get_text($item['title']); ?></h3>
          <p class="base-card-desc"><?php echo get_text($item['desc']); ?></p>
        </article>
        <?php } ?>
      </div>
    </div>
  </section>

  <section class="page-section page-cta reveal">
    <div class="page-inner page-cta__inner">
      <h2 class="page-cta__title">우리 기업에 맞는 솔루션이 궁금하신가요?</h2>
      <p class="page-cta__desc">무료 사전 진단으로 최적 트랙을 안내해 드립니다.</p>
      <div class="page-cta__actions">
        <a href="<?php echo G5_URL; ?>/#section-contact" class="btn btn-primary">무료 상담 신청</a>
        <a href="<?php echo G5_BBS_URL; ?>/login.php" class="btn btn-outline">회원 로그인</a>
      </div>
    </div>
  </section>
</div>
<?php
g5_page_end();
