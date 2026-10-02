<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

$consult_inquiry = G5_URL.'/#section-contact';
$consult_kakao = function_exists('g5site_cfg') ? g5site_cfg('kakao_url', '') : '';
$consult_on_dark = !empty($consult_on_dark);
$consult_show_kakao = !empty($consult_show_kakao);
?>
<div class="consult-actions<?php echo $consult_on_dark ? ' consult-actions--on-dark' : ''; ?>">
  <?php if ($consult_show_kakao && $consult_kakao !== '' && $consult_kakao !== '#') { ?>
  <a class="consult-actions__btn consult-actions__btn--kakao" href="<?php echo htmlspecialchars($consult_kakao, ENT_QUOTES, 'UTF-8'); ?>" target="_blank" rel="noopener noreferrer">카카오톡 상담</a>
  <?php } ?>
  <a class="consult-actions__btn consult-actions__btn--primary" href="<?php echo htmlspecialchars($consult_inquiry, ENT_QUOTES, 'UTF-8'); ?>">무료상담 신청하기</a>
</div>
<?php
$consult_on_dark = false;
$consult_show_kakao = false;
