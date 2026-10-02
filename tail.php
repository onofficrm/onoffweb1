<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

if (defined('G5_THEME_PATH')) {
    require_once(G5_THEME_PATH.'/tail.php');
    return;
}


if (!isset($site_config) && is_file(G5_PATH.'/_site.config.php')) {
    include_once(G5_PATH.'/_site.config.php');
}

if (!function_exists('bizontop_footer_text')) {
    function bizontop_footer_text($key)
    {
        $value = function_exists('g5site_cfg') ? trim((string) g5site_cfg($key, '')) : '';
        $samples = array(
            '대표자명',
            '정보책임자명',
            '개인정보보호책임자',
            '개인정보관리책임자',
            '회사명',
            '000-00-00000',
            '123-45-67890',
            '02-0000-0000',
            '02-123-4567',
            '02-123-4568',
            '010-0000-0000',
            '제 OO구 - 123호',
            '주소는 관리자 설정값으로 입력해 주세요',
            '주소를 입력하세요',
            'OO도 OO시 OO구 OO동 123-45',
            'info@example.com',
        );
        if ($value === '' || in_array($value, $samples, true)) {
            return '';
        }
        return $value;
    }
}

$g5_footer_tel_display = bizontop_footer_text('phone');
$g5_footer_tel_link    = ($g5_footer_tel_display !== '' && function_exists('g5site_tel_link')) ? g5site_tel_link($g5_footer_tel_display) : '';
$g5_footer_kakao_url   = function_exists('g5site_cfg') ? g5site_cfg('kakao_url', '') : '';
$g5_footer_company     = bizontop_footer_text('company_name');
$g5_footer_ceo         = bizontop_footer_text('ceo_name');
$g5_footer_intro       = function_exists('g5site_cfg') ? g5site_cfg('footer_desc', '') : '';
$g5_footer_biz_no      = bizontop_footer_text('business_no');
$g5_footer_sales_no    = bizontop_footer_text('sales_no');
$g5_footer_privacy     = bizontop_footer_text('privacy_manager');
$g5_footer_email       = bizontop_footer_text('email');
$g5_footer_address     = bizontop_footer_text('address');
$g5_footer_fax         = bizontop_footer_text('fax');

if (!isset($g5_inquiry_url)) {
    $g5_inquiry_url = defined('_INDEX_') ? G5_URL.'/#section-contact' : G5_BBS_URL.'/qalist.php';
}
$g5_is_index_page = defined('_INDEX_');
?>

    </div>
    <div id="aside" class="site-aside">
        <div class="site-g5-widgets site-g5-widgets--aside">
            <?php echo outlogin(); ?>
            <?php echo poll(); ?>
        </div>
    </div>
</div>

</div>
<!-- } 콘텐츠 끝 -->

<?php if ($g5_is_index_page) { ?>
<script>document.documentElement.classList.add('page-index');</script>
<?php } else { ?>
<script>document.documentElement.classList.add('page-sub');</script>
<?php } ?>

<hr>

<!-- 하단 시작 { -->
<div id="ft" class="site-footer-wrap">
    <div class="site-g5-widgets site-g5-widgets--tail">
        <?php echo latest('notice', 'notice', 4, 13); ?>
        <?php echo visit(); ?>
    </div>

    <footer id="siteFooter" class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__brand">
                <h2 class="site-footer__company"><?php echo get_text($g5_footer_company); ?></h2>
                <p class="site-footer__intro"><?php echo get_text($g5_footer_intro); ?></p>
            </div>

            <div class="site-footer__info">
                <h3 class="site-footer__info-title sound_only">사업자정보</h3>
                <dl class="site-footer__dl">
                    <?php if ($g5_footer_ceo !== '') { ?>
                    <div class="site-footer__row">
                        <dt>대표</dt>
                        <dd><?php echo get_text($g5_footer_ceo); ?></dd>
                    </div>
                    <?php } ?>
                    <?php if ($g5_footer_biz_no !== '') { ?>
                    <div class="site-footer__row">
                        <dt>사업자등록번호</dt>
                        <dd><?php echo get_text($g5_footer_biz_no); ?></dd>
                    </div>
                    <?php } ?>
                    <?php if ($g5_footer_sales_no !== '') { ?>
                    <div class="site-footer__row">
                        <dt>통신판매업신고</dt>
                        <dd><?php echo get_text($g5_footer_sales_no); ?></dd>
                    </div>
                    <?php } ?>
                    <?php if ($g5_footer_privacy !== '') { ?>
                    <div class="site-footer__row">
                        <dt>개인정보관리책임자</dt>
                        <dd><?php echo get_text($g5_footer_privacy); ?></dd>
                    </div>
                    <?php } ?>
                    <?php if ($g5_footer_tel_display !== '') { ?>
                    <div class="site-footer__row">
                        <dt>연락처</dt>
                        <dd>
                            <?php if ($g5_footer_tel_link !== '') { ?><a href="<?php echo $g5_footer_tel_link; ?>"><?php echo get_text($g5_footer_tel_display); ?></a><?php } else { echo get_text($g5_footer_tel_display); } ?>
                            <?php if ($g5_footer_fax !== '') { ?> / 팩스 <?php echo get_text($g5_footer_fax); ?><?php } ?>
                        </dd>
                    </div>
                    <?php } elseif ($g5_footer_fax !== '') { ?>
                    <div class="site-footer__row">
                        <dt>팩스</dt>
                        <dd><?php echo get_text($g5_footer_fax); ?></dd>
                    </div>
                    <?php } ?>
                    <?php if ($g5_footer_email !== '') { ?>
                    <div class="site-footer__row">
                        <dt>이메일</dt>
                        <dd><a href="mailto:<?php echo get_text($g5_footer_email); ?>"><?php echo get_text($g5_footer_email); ?></a></dd>
                    </div>
                    <?php } ?>
                    <?php if ($g5_footer_address !== '') { ?>
                    <div class="site-footer__row">
                        <dt>주소</dt>
                        <dd><?php echo get_text($g5_footer_address); ?></dd>
                    </div>
                    <?php } ?>
                </dl>
            </div>

            <nav class="site-footer__nav" aria-label="푸터 메뉴">
                <ul class="site-footer__menu">
                    <li><a href="<?php echo get_pretty_url('content', 'company'); ?>">회사소개</a></li>
                    <li><a href="<?php echo G5_URL; ?>/page/privacy.php">개인정보처리방침</a></li>
                    <li><a href="<?php echo get_pretty_url('content', 'provision'); ?>">서비스이용약관</a></li>
                    <li><a href="<?php echo G5_BBS_URL; ?>/faq.php">FAQ</a></li>
                </ul>
            </nav>
        </div>

        <div class="site-footer__copy">
            <p id="ft_copy" class="site-footer__copyright">
                Copyright &copy; <strong><?php echo get_text($config['cf_title']); ?></strong>. All rights reserved.
            </p>
        </div>
    </footer>
</div>

<?php
include_once(G5_PATH.'/components/floating-buttons.php');
include_once(G5_PATH.'/components/consult-modal.php');
include_once(G5_PATH.'/components/popup-banner.php');
?>

<?php
if ($config['cf_analytics']) {
    echo $config['cf_analytics'];
}
?>

<!-- } 하단 끝 -->

<script>
$(function() {
    font_resize("container", get_cookie("ck_font_resize_rmv_class"), get_cookie("ck_font_resize_add_class"));
});
</script>

<?php
include_once(G5_PATH.'/tail.sub.php');
