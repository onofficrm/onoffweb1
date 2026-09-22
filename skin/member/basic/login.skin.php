<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

add_stylesheet('<link rel="stylesheet" href="'.$member_skin_url.'/style.css">', 0);
?>

<!-- 비즈온탑 로그인 { -->
<div id="mb_login" class="mbskin bizontop-login">
    <div class="bizontop-login__hero">
        <div class="bizontop-login__mark" aria-hidden="true">BT</div>
        <h1 class="bizontop-login__title">비즈온탑 회원 로그인</h1>
        <p class="bizontop-login__desc">기업 회원 계정으로 게시판·상담 내역 등 회원 전용 서비스를 이용하세요.</p>
    </div>

    <div class="mbskin_box bizontop-login__box">
        <div class="mb_log_cate">
            <h2><span class="sound_only">회원</span>로그인</h2>
            <a href="<?php echo G5_BBS_URL ?>/register.php" class="join">회원가입</a>
        </div>
        <form name="flogin" action="<?php echo $login_action_url ?>" onsubmit="return flogin_submit(this);" method="post">
        <input type="hidden" name="url" value="<?php echo $login_url ?>">

        <fieldset id="login_fs">
            <legend>회원로그인</legend>
            <label for="login_id" class="sound_only">회원아이디<strong class="sound_only"> 필수</strong></label>
            <input type="text" name="mb_id" id="login_id" required class="frm_input required" size="20" maxLength="20" placeholder="아이디">
            <label for="login_pw" class="sound_only">비밀번호<strong class="sound_only"> 필수</strong></label>
            <input type="password" name="mb_password" id="login_pw" required class="frm_input required" size="20" maxLength="20" placeholder="비밀번호">
            <button type="submit" class="btn_submit">로그인</button>

            <div id="login_info">
                <div class="login_if_auto chk_box">
                    <input type="checkbox" name="auto_login" id="login_auto_login" class="selec_chk">
                    <label for="login_auto_login"><span></span> 자동로그인</label>
                </div>
                <div class="login_if_lpl">
                    <a href="<?php echo G5_BBS_URL ?>/password_lost.php">아이디/비밀번호 찾기</a>
                </div>
            </div>
        </fieldset>
        </form>
        <?php @include_once(get_social_skin_path().'/social_login.skin.php'); ?>

        <ul class="bizontop-login__hints">
            <li>게시판 글쓰기·댓글은 로그인 후 이용 가능합니다.</li>
            <li>관리자 계정은 그누보드 관리자 설정에서 관리합니다.</li>
        </ul>
    </div>

    <?php if (isset($default['de_level_sell']) && $default['de_level_sell'] == 1) { ?>
	<?php if (preg_match("/orderform.php/", $url)) { ?>
    <section id="mb_login_notmb">
        <h2>비회원 구매</h2>
        <p>비회원으로 주문하시는 경우 포인트는 지급하지 않습니다.</p>
        <div id="guest_privacy">
            <?php echo conv_content($default['de_guest_privacy'], $config['cf_editor']); ?>
        </div>
		<div class="chk_box">
			<input type="checkbox" id="agree" value="1" class="selec_chk">
        	<label for="agree"><span></span> 개인정보수집에 대한 내용을 읽었으며 이에 동의합니다.</label>
		</div>
        <div class="btn_confirm">
            <a href="javascript:guest_submit(document.flogin);" class="btn_submit">비회원으로 구매하기</a>
        </div>
        <script>
        function guest_submit(f)
        {
            if (document.getElementById('agree')) {
                if (!document.getElementById('agree').checked) {
                    alert("개인정보수집에 대한 내용을 읽고 이에 동의하셔야 합니다.");
                    return;
                }
            }
            f.url.value = "<?php echo $url; ?>";
            f.action = "<?php echo $url; ?>";
            f.submit();
        }
        </script>
    </section>
    <?php } else if (preg_match("/orderinquiry.php$/", $url)) { ?>
    <div id="mb_login_od_wr">
        <h2>비회원 주문조회 </h2>
        <fieldset id="mb_login_od">
            <legend>비회원 주문조회</legend>
            <form name="forderinquiry" method="post" action="<?php echo urldecode($url); ?>" autocomplete="off">
            <label for="od_id" class="od_id sound_only">주문서번호<strong class="sound_only"> 필수</strong></label>
            <input type="text" name="od_id" value="<?php echo $od_id; ?>" id="od_id" required class="frm_input required" size="20" placeholder="주문서번호">
            <label for="od_pwd" class="od_pwd sound_only">비밀번호 <strong>필수</strong></label>
            <input type="password" name="od_pwd" size="20" id="od_pwd" required class="frm_input required" placeholder="비밀번호">
            <button type="submit" class="btn_submit">확인</button>
            </form>
        </fieldset>
        <section id="mb_login_odinfo">
            <p>메일로 발송해드린 주문서의 <strong>주문번호</strong> 및 주문 시 입력하신 <strong>비밀번호</strong>를 정확히 입력해주십시오.</p>
        </section>
    </div>
    <?php } ?>
    <?php } ?>
</div>

<script>
jQuery(function($){
    $("#login_auto_login").click(function(){
        if (this.checked) {
            this.checked = confirm("자동로그인을 사용하시면 다음부터 회원아이디와 비밀번호를 입력하실 필요가 없습니다.\n\n공공장소에서는 개인정보가 유출될 수 있으니 사용을 자제하여 주십시오.\n\n자동로그인을 사용하시겠습니까?");
        }
    });
});

function flogin_submit(f)
{
    if( $( document.body ).triggerHandler( 'login_form_check' ) !== false ){
        return true;
    }
    return false;
}
</script>
<!-- } 로그인 끝 -->
