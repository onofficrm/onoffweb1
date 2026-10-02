<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('g5site_cfg')) {
    if (is_file(G5_PATH . '/_site.config.php')) {
        include_once G5_PATH . '/_site.config.php';
    }
}

$cmp_consult_label = g5site_cfg('consultation_text', '상담문의');
$cmp_site_name = g5site_cfg('site_name', '샘플 사이트');
?>

<div id="cmpPopupBanner" class="cmp-popup" role="dialog" aria-modal="true" aria-labelledby="cmpPopupTitle" aria-hidden="true" hidden>
    <div class="cmp-popup__backdrop" aria-hidden="true"></div>
    <div class="cmp-popup__panel">
        <button type="button" class="cmp-popup__close" aria-label="팝업 닫기">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        <p class="cmp-popup__badge">안내</p>
        <h2 id="cmpPopupTitle" class="cmp-popup__title"><?php echo htmlspecialchars($cmp_site_name, ENT_QUOTES, 'UTF-8'); ?> 오픈 안내</h2>
        <p class="cmp-popup__desc">법인설립 준비부터 설립 이후 정책자금·기업인증까지, 회사 상황에 맞는 순서를 상담으로 정리해 드립니다.</p>
        <div class="cmp-popup__actions">
            <button type="button" class="btn btn-primary consult-modal-open cmp-popup__cta" data-target="#cmpConsultModal"><?php echo htmlspecialchars($cmp_consult_label, ENT_QUOTES, 'UTF-8'); ?></button>
            <button type="button" class="btn btn-outline cmp-popup__close-btn">닫기</button>
        </div>
        <label class="cmp-popup__today">
            <input type="checkbox" id="cmpPopupToday" value="1">
            <span>오늘 하루 보지 않기</span>
        </label>
    </div>
</div>
