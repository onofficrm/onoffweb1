<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

$consult_inquiry = G5_URL.'/#section-contact';
$consult_on_dark = !empty($consult_on_dark);
?>
<div class="consult-actions<?php echo $consult_on_dark ? ' consult-actions--on-dark' : ''; ?>">
  <a class="consult-actions__btn consult-actions__btn--primary" href="<?php echo htmlspecialchars($consult_inquiry, ENT_QUOTES, 'UTF-8'); ?>">무료상담 신청하기</a>
</div>
<?php
$consult_on_dark = false;
