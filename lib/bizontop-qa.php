<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

function bizontop_qa_is_private($value)
{
    return is_string($value) && strncmp($value, '$2y$', 4) === 0;
}

function bizontop_qa_privacy_store($w, $write = array())
{
    $open = isset($_POST['qa_open']) ? $_POST['qa_open'] : 'secret';
    if ($open === 'public') {
        return 'public';
    }

    $pin = isset($_POST['qa_pin']) ? preg_replace('/[^0-9]/', '', $_POST['qa_pin']) : '';
    if (strlen($pin) === 4) {
        return password_hash($pin, PASSWORD_DEFAULT);
    }

    $current = isset($write['qa_1']) ? $write['qa_1'] : '';
    if ($w === 'u' && bizontop_qa_is_private($current)) {
        return $current;
    }

    return false;
}

function bizontop_qa_privacy_fields($w, $write = array())
{
    if ($w === 'a' || (isset($write['qa_type']) && $write['qa_type'])) {
        return;
    }

    $current = isset($write['qa_1']) ? $write['qa_1'] : '';
    $is_public = ($current === 'public');
    $has_pin = bizontop_qa_is_private($current);
    $secret_on = !$is_public;
    ?>
    <div class="qa-privacy">
        <p class="qa-privacy__label">글을 어떻게 올릴까요?</p>
        <div class="qa-privacy__choices">
            <label class="qa-privacy__choice<?php echo $secret_on ? ' is-on' : ''; ?>">
                <input type="radio" name="qa_open" value="secret" <?php echo $secret_on ? 'checked' : ''; ?>>
                <span>비밀번호로 나만 보기</span>
            </label>
            <label class="qa-privacy__choice<?php echo $is_public ? ' is-on' : ''; ?>">
                <input type="radio" name="qa_open" value="public" <?php echo $is_public ? 'checked' : ''; ?>>
                <span>공개로 작성</span>
            </label>
        </div>
        <div class="qa-privacy__pin" id="qa_pin_box" <?php echo $secret_on ? '' : 'hidden'; ?>>
            <label for="qa_pin">비밀번호 4자리</label>
            <input type="password" name="qa_pin" id="qa_pin" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" autocomplete="off" placeholder="<?php echo $has_pin ? '바꾸려면 새 숫자 4자리' : '숫자 4자리'; ?>" data-keep="<?php echo $has_pin ? '1' : '0'; ?>">
            <p>이 비밀번호를 아는 사람만 내용, 연락처를 볼 수 있습니다.<?php echo $has_pin ? ' 비밀번호를 유지하려면 비워 두세요.' : ''; ?></p>
        </div>
    </div>
    <script>
    function bizontopQaTogglePin(form) {
        var picked = form.querySelector('input[name="qa_open"]:checked');
        var secret = !picked || picked.value === 'secret';
        var box = document.getElementById('qa_pin_box');
        if (box) box.hidden = !secret;
        var choices = form.querySelectorAll('.qa-privacy__choice');
        for (var i = 0; i < choices.length; i++) {
            var input = choices[i].querySelector('input');
            choices[i].classList.toggle('is-on', !!(input && input.checked));
        }
    }
    function bizontopQaPinOk(form) {
        if (!form.qa_open) return true;
        var picked = form.querySelector('input[name="qa_open"]:checked');
        if (!picked || picked.value !== 'secret') return true;
        var pin = (form.qa_pin.value || '').replace(/\D/g, '');
        var keep = form.qa_pin.getAttribute('data-keep') === '1';
        if (pin.length === 4 || (keep && pin.length === 0)) return true;
        alert('비공개로 작성하려면 숫자 4자리 비밀번호를 입력해 주십시오.');
        form.qa_pin.focus();
        return false;
    }
    document.addEventListener('change', function (event) {
        if (event.target && event.target.name === 'qa_open') {
            bizontopQaTogglePin(event.target.form);
        }
    });
    </script>
    <?php
}
