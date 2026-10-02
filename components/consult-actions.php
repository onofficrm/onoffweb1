<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

$consult_phone = function_exists('g5site_cfg') ? g5site_cfg('phone', '02-0000-0000') : '02-0000-0000';
$consult_kakao = function_exists('g5site_cfg') ? g5site_cfg('kakao_url', '') : '';
$consult_tel = function_exists('g5site_tel_link') ? g5site_tel_link($consult_phone) : 'tel:0200000000';
$consult_inquiry = G5_URL.'/#section-contact';
$consult_diagnosis = G5_URL.'/#section-diagnosis';
$consult_on_dark = !empty($consult_on_dark);
?>
<div class="consult-actions<?php echo $consult_on_dark ? ' consult-actions--on-dark' : ''; ?>">
  <a class="consult-actions__btn consult-actions__btn--primary" href="<?php echo htmlspecialchars($consult_inquiry, ENT_QUOTES, 'UTF-8'); ?>">무료상담 신청하기</a>
  <a class="consult-actions__btn consult-actions__btn--tel" href="<?php echo htmlspecialchars($consult_tel, ENT_QUOTES, 'UTF-8'); ?>">전화상담</a>
  <?php if ($consult_kakao !== '' && $consult_kakao !== '#') { ?>
  <a class="consult-actions__btn consult-actions__btn--kakao" href="<?php echo htmlspecialchars($consult_kakao, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener noreferrer">카카오톡상담</a>
  <?php } ?>
  <a class="consult-actions__btn consult-actions__btn--ghost" href="<?php echo htmlspecialchars($consult_diagnosis, ENT_QUOTES, 'UTF-8'); ?>">무료진단</a>
</div>
<?php
$consult_on_dark = false;
