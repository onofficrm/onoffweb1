<?php
if (!defined('_GNUBOARD_')) {
    exit;
}

/**
 * 비즈온탑 서비스 카탈로그
 * 메뉴, 메인 카드, 상세페이지, 관련 서비스가 이 데이터를 함께 사용합니다.
 */
function bizontop_catalog()
{
    static $items = null;
    if ($items !== null) {
        return $items;
    }

    $consult = '정확한 대상·한도·금리는 공고와 사업장 조건에 따라 달라집니다. 상담에서 현재 요건을 기준으로 안내합니다.';

    $items = array(
        'funding' => array(
            'group' => 'funding', 'title' => '정책자금 안내', 'home' => true,
            'summary' => '소상공인·중소기업 정책자금의 종류와 신청 순서를 사업 상황에 맞게 정리합니다.',
            'message' => '정책자금은 종류가 많아서, 이름만 보고 신청하면 시간과 신용조회만 늘어나는 경우가 많습니다. 업력, 업종, 매출, 기존 대출을 먼저 보고 가능한 자금부터 좁히는 것이 출발점입니다.',
            'who' => array('운전자금·시설자금이 필요한 소상공인·중소기업', '어떤 자금을 먼저 신청해야 할지 모르는 대표', '기존 대출이 있어 추가 자금이 막막한 사업장'),
            'benefits' => array('신청 가능한 자금과 어려운 자금을 먼저 구분', '소진공·중진공·신보·기보 역할을 한 번에 비교', '인증·법인 구조와 겹치는 가점 요소를 함께 검토'),
            'points' => array(
                array('title' => '자금 지도', 'desc' => '소상공인, 중소기업, 보증기관 자금을 목적별로 나눠 설명합니다.'),
                array('title' => '우선순위', 'desc' => '한도, 금리, 서류 부담, 소요 기간을 기준으로 순서를 제안합니다.'),
                array('title' => '연계 검토', 'desc' => '벤처·연구소·이노비즈처럼 심사에 영향을 줄 수 있는 제도를 함께 봅니다.'),
            ),
            'steps' => array('사업 현황 청취', '가능 자금 후보 정리', '필요 서류와 일정 안내', '신청 또는 보완 동행', '실행 이후 다음 제도 검토'),
            'cost' => array('상담과 1차 진단은 무료입니다.', '대행 범위와 비용은 자금 종류를 정한 뒤 사전에 안내합니다.', $consult),
            'faqs' => array(
                array('q' => '정책자금은 대출인가요?', 'a' => '상당수는 보증 또는 융자 형태입니다. 지원금·출연과 다르므로 상환 조건까지 함께 확인해야 합니다.'),
                array('q' => '여러 곳에 동시에 넣어도 되나요?', 'a' => '가능 여부는 기관과 기존 채무에 따라 다릅니다. 조회가 겹치면 오히려 불리할 수 있어 순서를 먼저 정합니다.'),
            ),
            'related' => array('funding-small', 'funding-sme', 'funding-kosmes', 'funding-kodit', 'funding-kibo', 'cert-venture'),
        ),
        'funding-small' => array(
            'group' => 'funding', 'title' => '소상공인 정책자금',
            'summary' => '소상공인시장진흥공단과 지역 보증재단 등 소상공인 자금을 조건에 맞게 찾습니다.',
            'message' => '소상공인 정책자금은 업종, 상시근로자, 매출 규모에 따라 신청 창구가 갈립니다. 창업 초기인지, 운영 중 운전자금인지부터 구분해야 합니다.',
            'who' => array('소상공인 기준에 해당하는 사업장', '임차보증금·운영자금·창업자금이 필요한 대표', '지역 신용보증재단 이용을 검토하는 사업장'),
            'benefits' => array('목적별 자금(창업·운영·경영안정) 구분', '지역 재단과 소진공 자금의 차이 안내', '서류가 막히는 지점을 미리 점검'),
            'points' => array(
                array('title' => '대상 확인', 'desc' => '업종, 상시근로자 수, 매출이 소상공인 범위인지 먼저 봅니다.'),
                array('title' => '자금 용도', 'desc' => '운전자금, 시설, 임차보증금 중 어디에 쓰는지에 따라 상품이 달라집니다.'),
                array('title' => '지역 자금', 'desc' => '지자체·지역신보 특화 자금이 있으면 함께 비교합니다.'),
            ),
            'steps' => array('소상공인 해당 여부 확인', '필요 자금 용도 정리', '후보 상품과 보증 경로 비교', '서류 준비', '접수와 보완'),
            'cost' => array('상품별 금리·보증료·한도는 공고 기준입니다.', '컨설팅 비용은 진행 범위를 정한 뒤 안내합니다.', $consult),
            'faqs' => array(
                array('q' => '개인사업자도 신청할 수 있나요?', 'a' => '많은 소상공인 자금은 개인사업자도 대상입니다. 일부는 업력과 세금 체납 여부를 함께 봅니다.'),
                array('q' => '매출이 적어도 가능한가요?', 'a' => '상품마다 최소 매출 또는 업력 조건이 있습니다. 없는 경우 다른 창구를 찾는 편이 낫습니다.'),
            ),
            'related' => array('funding', 'funding-kodit', 'corp-convert', 'cert-mainbiz'),
        ),
        'funding-sme' => array(
            'group' => 'funding', 'title' => '중소기업 정책자금',
            'summary' => '성장 단계의 중소기업이 운전자금·시설자금·보증을 어떻게 나눌지 설계합니다.',
            'message' => '중소기업 자금은 직접 융자, 보증, R&D·수출 지원이 섞여 있습니다. 회사의 업력과 담보·기술성 중 무엇을 강점으로 볼지에 따라 창구가 달라집니다.',
            'who' => array('중소기업 범위의 제조·서비스·지식기업', '시설 투자와 운전자금을 함께 보는 기업', '보증서 기반으로 자금을 검토하는 기업'),
            'benefits' => array('중진공·신보·기보 역할을 분리해서 설명', '시설과 운영자금을 섞지 않고 용도별로 설계', '인증·연구소가 심사에 주는 영향을 함께 검토'),
            'points' => array(
                array('title' => '직접대출과 보증', 'desc' => '중진공 융자와 신보·기보 보증은 심사 포인트가 다릅니다.'),
                array('title' => '용도 분리', 'desc' => '시설, 운전, 수출, R&D는 서류를 나눠 준비하는 편이 분명합니다.'),
                array('title' => '재무 정합성', 'desc' => '재무제표와 자금 사용 계획이 맞는지 먼저 확인합니다.'),
            ),
            'steps' => array('재무·업력 진단', '자금 용도 확정', '기관별 후보 비교', '서류·보증 준비', '실행 후 한도 관리'),
            'cost' => array('기관 금리·보증료는 공고와 신용도에 따릅니다.', $consult),
            'faqs' => array(
                array('q' => '담보가 없어도 되나요?', 'a' => '보증기관을 통하면 담보 없이 검토되는 경우가 있습니다. 기술성·매출·기존 채무가 함께 봅니다.'),
            ),
            'related' => array('funding-kosmes', 'funding-kodit', 'funding-kibo', 'cert-venture', 'cert-lab'),
        ),
        'funding-kosmes' => array(
            'group' => 'funding', 'title' => '중진공 정책자금',
            'summary' => '중소벤처기업진흥공단 정책자금의 신청 자격과 준비 서류를 중심으로 안내합니다.',
            'message' => '중진공 자금은 중소기업 정책자금의 대표 창구입니다. 업력, 매출, 부채 비율, 자금 용도가 맞아야 하고, 사업계획서가 심사 자료가 됩니다.',
            'who' => array('중진공 신청 자격을 확인하고 싶은 중소기업', '시설·운전 자금을 정책자금으로 검토하는 기업', '사업계획서 정리가 필요한 대표'),
            'benefits' => array('신청 전 결격·보완 포인트를 미리 점검', '자금 용도와 사업계획의 정합성 정리', '다른 보증 자금과 중복 여부를 비교'),
            'points' => array(
                array('title' => '자격', 'desc' => '업력, 기업 규모, 세금 체납, 휴폐업 이력을 먼저 확인합니다.'),
                array('title' => '사업계획', 'desc' => '자금 사용처, 매출 근거, 상환 재원을 짧게라도 숫자로 맞춥니다.'),
                array('title' => '일정', 'desc' => '접수 시기와 예산 소진 여부를 함께 봅니다.'),
            ),
            'steps' => array('자격 사전 점검', '용도와 금액 설정', '사업계획·재무 자료 정리', '접수', '심사 보완'),
            'cost' => array('대출 조건은 중진공 공고 기준입니다.', $consult),
            'faqs' => array(
                array('q' => '창업 직후에도 가능한가요?', 'a' => '상품마다 업력 요건이 다릅니다. 업력이 짧으면 창업 특화 자금을 따로 보는 경우가 많습니다.'),
            ),
            'related' => array('funding-sme', 'funding', 'cert-venture', 'corp-setup'),
        ),
        'funding-kodit' => array(
            'group' => 'funding', 'title' => '신용보증기금',
            'summary' => '신용보증기금 보증을 통한 자금 조달 가능성과 준비 포인트를 검토합니다.',
            'message' => '신용보증기금은 담보가 부족한 기업의 은행 대출을 보증하는 기관입니다. 보증 한도는 매출, 재무, 기존 보증, 업종 리스크를 함께 봅니다.',
            'who' => array('은행 대출에 보증이 필요한 기업', '기존 보증 한도를 점검하려는 기업', '매출은 있으나 담보가 부족한 기업'),
            'benefits' => array('보증 가능 구간을 사전에 가늠', '재무 비율과 기존 채무를 같이 정리', '기보·지역신보와 역할을 비교'),
            'points' => array(
                array('title' => '보증의 역할', 'desc' => '자금을 직접 빌려 주는 곳이 아니라, 은행 대출의 보증서입니다.'),
                array('title' => '심사 자료', 'desc' => '재무제표, 세금계산서, 거래처, 자금 사용 계획이 핵심입니다.'),
                array('title' => '한도 관리', 'desc' => '기존 보증이 있으면 추가 한도부터 확인합니다.'),
            ),
            'steps' => array('기존 보증·대출 확인', '필요 금액과 용도 정리', '재무 자료 점검', '보증 상담·신청', '은행 실행'),
            'cost' => array('보증료와 대출 금리는 별개입니다.', $consult),
            'faqs' => array(
                array('q' => '신보와 기보는 무엇이 다른가요?', 'a' => '둘 다 보증기관이지만 기술성 평가 비중과 주력 기업군이 다릅니다. 업종과 기술 자료에 따라 창구를 나눕니다.'),
            ),
            'related' => array('funding-kibo', 'funding-sme', 'funding-small'),
        ),
        'funding-kibo' => array(
            'group' => 'funding', 'title' => '기술보증기금',
            'summary' => '기술성·사업성을 보는 기술보증기금 보증의 준비 방향을 안내합니다.',
            'message' => '기술보증기금은 담보보다 기술과 사업 내용을 보는 보증입니다. 특허, 연구소, 개발 인력, 매출 전환 가능성이 자료가 됩니다.',
            'who' => array('기술·지식 기반 기업', '특허나 연구개발 이력이 있는 기업', '담보는 부족하지만 기술 자료가 있는 기업'),
            'benefits' => array('기술평가에 필요한 자료를 미리 정리', '연구소·특허·벤처 인증과의 연결 고리 설명', '운전자금과 기술사업화 자금의 차이 안내'),
            'points' => array(
                array('title' => '기술 자료', 'desc' => '개발 내용, 차별점, 적용 시장을 짧은 문서로 정리합니다.'),
                array('title' => '인증 연계', 'desc' => '벤처, 연구소, 특허가 있으면 평가 자료로 연결할 수 있습니다.'),
                array('title' => '상환 계획', 'desc' => '기술만으로 끝나지 않고 매출·수금 계획을 같이 봅니다.'),
            ),
            'steps' => array('기술 개요 정리', '재무·매출 자료 준비', '보증 유형 선택', '평가 대응', '대출 실행'),
            'cost' => array('기술평가 수수료·보증료는 상품 기준입니다.', $consult),
            'faqs' => array(
                array('q' => '특허가 꼭 있어야 하나요?', 'a' => '필수는 아닌 경우가 많습니다. 다만 기술 내용을 설명할 자료는 필요합니다.'),
            ),
            'related' => array('cert-ip', 'cert-lab', 'cert-venture', 'funding-kodit'),
        ),
        'cert' => array(
            'group' => 'cert', 'title' => '기업인증 안내', 'home' => true,
            'summary' => '벤처, 이노비즈, 메인비즈, 연구소, ISO, 특허를 목적에 맞게 고릅니다.',
            'message' => '인증은 종류마다 혜택과 유지 의무가 다릅니다. 세제, 정책자금 가점, 입찰, 투자 중 무엇을 목표로 하는지 정한 뒤 순서를 짜야 합니다.',
            'who' => array('처음 인증을 준비하는 기업', '정책자금·세제·입찰 가점이 필요한 기업', '여러 인증을 한꺼번에 알아보는 대표'),
            'benefits' => array('목적별로 인증 우선순위를 정리', '준비 인력·비용·유지 조건을 비교', '자금·법인 구조와 겹치는 일정을 맞춤'),
            'points' => array(
                array('title' => '벤처·이노비즈·메인비즈', 'desc' => '기술·혁신·경영 역량을 보는 대표 인증입니다.'),
                array('title' => '연구소·특허', 'desc' => '연구개발비와 지식재산 자료를 만드는 기반입니다.'),
                array('title' => 'ISO', 'desc' => '품질·환경 등 운영 체계를 문서로 증명합니다.'),
            ),
            'steps' => array('목표 확인', '현재 요건 진단', '인증 순서 제안', '자료 준비', '신청·사후 관리'),
            'cost' => array('인증별 관납료·심사비와 컨설팅 범위는 따로 안내합니다.', $consult),
            'faqs' => array(
                array('q' => '인증을 받으면 자금이 바로 나오나요?', 'a' => '인증만으로 자금이 실행되지는 않습니다. 심사에서 참고되는 요소로 함께 설계하는 경우가 많습니다.'),
            ),
            'related' => array('cert-venture', 'cert-innobiz', 'cert-mainbiz', 'cert-lab', 'cert-iso', 'cert-ip'),
        ),
        'cert-venture' => array(
            'group' => 'cert', 'title' => '벤처기업인증',
            'summary' => '혁신성장·벤처투자·연구개발 유형 등 벤처기업확인 경로를 비교합니다.',
            'message' => '벤처기업확인은 유형마다 보는 자료가 다릅니다. 투자 유치 계획이 있는지, 연구개발 비중이 있는지에 따라 경로를 고릅니다.',
            'who' => array('기술·혁신 기업', '투자 유치를 준비하는 법인', '연구개발비를 인정받고 싶은 기업'),
            'benefits' => array('유형별 요건을 미리 대조', '세제·자금 가점으로 이어질 수 있는 지점 설명', '유효기간과 갱신 일정 안내'),
            'points' => array(
                array('title' => '유형 선택', 'desc' => '투자, 연구개발, 혁신성장 등 회사에 맞는 유형을 고릅니다.'),
                array('title' => '증빙', 'desc' => '재무, 인력, 기술 자료를 유형 기준에 맞춥니다.'),
                array('title' => '이후 연결', 'desc' => '확인 이후 정책자금·연구소·소득공제 검토로 이어질 수 있습니다.'),
            ),
            'steps' => array('유형 진단', '부족 요건 보완', '신청 서류 정리', '확인 신청', '사후 유지'),
            'cost' => array('확인 수수료와 준비 범위는 유형에 따라 달라집니다.', $consult),
            'faqs' => array(
                array('q' => '설립한 지 얼마 안 된 법인도 가능한가요?', 'a' => '유형별 업력 요건이 있습니다. 짧은 업력은 연구개발·투자 자료가 더 중요할 수 있습니다.'),
            ),
            'related' => array('tax-deduction', 'cert-lab', 'funding', 'corp-setup'),
        ),
        'cert-innobiz' => array(
            'group' => 'cert', 'title' => '이노비즈',
            'summary' => '기술혁신형 중소기업(이노비즈) 인증의 평가 항목과 준비 순서를 안내합니다.',
            'message' => '이노비즈는 기술혁신 역량을 점수화합니다. 연구개발, 기술 인력, 지식재산, 사업화 성과가 골고루 있어야 합니다.',
            'who' => array('기술 개발 이력이 있는 중소기업', '정책자금·공공 판로 가점을 원하는 기업'),
            'benefits' => array('평가 항목별 부족 점수를 미리 확인', '연구소·특허와 중복 준비를 줄임', '유효기간 관리 포인트 안내'),
            'points' => array(
                array('title' => '기술혁신', 'desc' => 'R&D 조직, 지식재산, 기술 인력을 봅니다.'),
                array('title' => '사업화', 'desc' => '매출과 기술 제품의 연결을 설명해야 합니다.'),
            ),
            'steps' => array('자가진단', '보완 과제 정리', '증빙 수집', '신청', '사후 관리'),
            'cost' => array('심사 비용과 컨설팅 범위는 사전 안내합니다.', $consult),
            'faqs' => array(
                array('q' => '메인비즈와 같이 받을 수 있나요?', 'a' => '목적과 평가 축이 다릅니다. 기술 중심이면 이노비즈, 경영혁신 중심이면 메인비즈를 먼저 보는 경우가 많습니다.'),
            ),
            'related' => array('cert-mainbiz', 'cert-lab', 'cert-ip', 'funding-sme'),
        ),
        'cert-mainbiz' => array(
            'group' => 'cert', 'title' => '메인비즈',
            'summary' => '경영혁신형 중소기업(메인비즈) 인증의 준비 포인트를 안내합니다.',
            'message' => '메인비즈는 경영 시스템과 혁신 활동을 봅니다. 기술 특허보다 프로세스, 고객 관리, 생산성 개선 자료가 중요할 수 있습니다.',
            'who' => array('경영 프로세스 개선 이력이 있는 기업', '서비스·유통·제조 중소기업'),
            'benefits' => array('경영혁신 증빙을 항목별로 정리', '이노비즈와 역할을 구분해 중복 비용을 줄임'),
            'points' => array(
                array('title' => '혁신 활동', 'desc' => '제도, 교육, 품질, 고객 대응 기록을 모읍니다.'),
                array('title' => '성과', 'desc' => '개선 전후 숫자가 있으면 설명이 분명해집니다.'),
            ),
            'steps' => array('현황 진단', '혁신 활동 정리', '서류 구성', '신청', '유지'),
            'cost' => array($consult),
            'faqs' => array(
                array('q' => '제조업만 가능한가요?', 'a' => '서비스·유통 등도 대상인 경우가 있습니다. 업종 제한은 공고 기준으로 확인합니다.'),
            ),
            'related' => array('cert-innobiz', 'cert-iso', 'corp-consult'),
        ),
        'cert-lab' => array(
            'group' => 'cert', 'title' => '기업부설연구소',
            'summary' => '기업부설연구소·연구개발전담부서 설립 요건과 세액공제 연결을 안내합니다.',
            'message' => '연구소는 간판이 아니라 연구 인력, 공간, 연구 과제가 있어야 합니다. 설립 전에 인력 요건과 회계 처리를 맞춰 두는 것이 중요합니다.',
            'who' => array('연구 인력을 두고 있거나 채용 예정인 기업', '연구개발비 세액공제를 검토하는 기업'),
            'benefits' => array('연구소와 전담부서의 차이 설명', '인력·공간 요건을 사전에 대조', '벤처·이노비즈 자료와 연결'),
            'points' => array(
                array('title' => '인력', 'desc' => '연구전담 인력의 자격과 겸직 제한을 확인합니다.'),
                array('title' => '공간·과제', 'desc' => '독립 공간과 연구 과제 기록이 필요합니다.'),
                array('title' => '세무', 'desc' => '신고한 연구개발비와 실제 장부가 맞아야 합니다.'),
            ),
            'steps' => array('요건 진단', '인력·공간 정리', '연구 과제 문서화', '신고', '사후 관리'),
            'cost' => array('설립 자체보다 인력 인건비 구조가 비용의 핵심입니다.', $consult),
            'faqs' => array(
                array('q' => '1인 기업도 가능한가요?', 'a' => '연구전담 인력 수 요건이 있습니다. 대표만으로 충족되지 않는 경우가 많아 사전 확인이 필요합니다.'),
            ),
            'related' => array('cert-venture', 'cert-innobiz', 'corp-tax', 'funding-kibo'),
        ),
        'cert-iso' => array(
            'group' => 'cert', 'title' => 'ISO인증',
            'summary' => 'ISO 9001·14001 등 필요한 표준을 목적에 맞게 고르고 문서 체계를 준비합니다.',
            'message' => 'ISO는 인증서 자체보다 현장 운영이 문서와 맞는지가 심사 포인트입니다. 입찰, 납품, 수출 중 어디에 쓸지 정하고 범위를 좁힙니다.',
            'who' => array('거래처·입찰에서 ISO를 요구받는 기업', '품질·환경 체계를 정리하려는 기업'),
            'benefits' => array('필요한 표준만 선택', '기존 업무 기록으로 문서를 줄여 준비', '심사 대응 순서 안내'),
            'points' => array(
                array('title' => '범위 설정', 'desc' => '전 사업장이 아니라 해당 공정·서비스만 범위로 잡을 수 있습니다.'),
                array('title' => '문서와 현장', 'desc' => '절차서와 실제 기록이 다르면 지적 사항이 됩니다.'),
            ),
            'steps' => array('요구 표준 확인', '갭 진단', '문서·기록 정비', '심사', '사후 심사 대비'),
            'cost' => array('심사 기관 비용과 준비 범위는 별도로 안내합니다.', $consult),
            'faqs' => array(
                array('q' => '한 번 받으면 끝나나요?', 'a' => '유효기간과 사후심사가 있습니다. 유지 일정도 같이 잡아야 합니다.'),
            ),
            'related' => array('cert-mainbiz', 'cert', 'corp-consult'),
        ),
        'cert-ip' => array(
            'group' => 'cert', 'title' => '특허·상표',
            'summary' => '사업에 필요한 특허·상표 출원 시점과 기술 자료 정리를 안내합니다.',
            'message' => '지식재산은 빨리 내는 것보다, 사업과 맞는 권리 범위를 정하는 일이 먼저입니다. 기술 공개 전후에 따라 전략이 달라집니다.',
            'who' => array('기술·브랜드를 권리로 남기려는 기업', '벤처·기보·연구소 증빙이 필요한 기업'),
            'benefits' => array('특허와 상표의 역할을 구분해 설명', '출원 전 공개 리스크를 점검', '인증·보증 자료로 쓰는 방법 안내'),
            'points' => array(
                array('title' => '특허', 'desc' => '기술 내용, 선행기술, 청구항 방향을 정리합니다.'),
                array('title' => '상표', 'desc' => '상호·서비스표가 사업 범위와 맞는지 봅니다.'),
            ),
            'steps' => array('권리 목적 확인', '선행 조사 방향 정리', '명세서·표장 준비', '출원', '중간 사건 대응'),
            'cost' => array('관납료와 대리인 비용은 권리 수에 따라 달라집니다.', '제휴 변리 절차가 필요하면 범위를 먼저 안내합니다.'),
            'faqs' => array(
                array('q' => '출원만 해도 인증에 도움이 되나요?', 'a' => '등록 여부와 평가 기준이 인증마다 다릅니다. 출원 사실을 어떻게 쓸지는 제도별로 확인합니다.'),
            ),
            'related' => array('funding-kibo', 'cert-venture', 'cert-lab'),
        ),
        'tax' => array(
            'group' => 'tax', 'title' => '벤처투자·세제혜택 안내',
            'summary' => '벤처투자 소득공제, 개인투자조합, 관련 세제 포인트를 한 흐름으로 설명합니다.',
            'message' => '투자 관련 세제는 투자자, 피투자 기업, 조합이 보는 요건이 각각 다릅니다. 법인 설립 구조와 벤처 확인 시점이 어긋나면 공제 논의 자체가 어려워질 수 있습니다.',
            'who' => array('엔젤·개인 투자를 받는 스타트업', '투자 소득공제를 검토하는 투자자', '개인투자조합 결성을 알아보는 팀'),
            'benefits' => array('기업·투자자·조합의 역할을 분리해서 설명', '벤처확인과 투자 계약 순서를 맞춤', '놓치기 쉬운 신고 시점을 안내'),
            'points' => array(
                array('title' => '소득공제', 'desc' => '투자자가 요건을 갖춘 기업에 투자할 때 검토합니다.'),
                array('title' => '개인투자조합', 'desc' => '여러 개인이 조합을 통해 투자하는 구조입니다.'),
                array('title' => '기업 측 세제', 'desc' => '벤처확인, 연구소와 연결되는 감면은 별도 요건입니다.'),
            ),
            'steps' => array('투자 구조 확인', '벤처 요건 대조', '계약·조합 방식 정리', '신고 일정 안내', '사후 유지'),
            'cost' => array('세제 적용 여부는 세무사 검토가 필요합니다. 비즈온탑은 요건과 일정을 먼저 정리합니다.', $consult),
            'faqs' => array(
                array('q' => '투자만 받으면 자동으로 공제되나요?', 'a' => '아닙니다. 기업 요건, 투자 방식, 보유 기간, 신고가 맞아야 검토할 수 있습니다.'),
            ),
            'related' => array('tax-deduction', 'tax-fund', 'tax-benefit', 'cert-venture'),
        ),
        'tax-deduction' => array(
            'group' => 'tax', 'title' => '벤처투자 소득공제', 'home' => true,
            'summary' => '벤처투자 소득공제를 검토할 때 기업과 투자자가 맞춰야 할 요건을 안내합니다.',
            'message' => '소득공제는 투자자의 세금 이야기이지만, 피투자 기업이 벤처 요건과 투자 계약 형태를 갖추지 않으면 논의가 시작되지 않습니다.',
            'who' => array('개인 투자 유치를 준비하는 법인', '엔젤 투자 공제를 문의하는 투자자'),
            'benefits' => array('공제 논의 전에 기업 요건을 점검', '투자 계약과 벤처확인 순서를 정리', '보유 기간 등 사후 조건을 미리 공유'),
            'points' => array(
                array('title' => '기업 요건', 'desc' => '벤처기업확인 등 당시 기준의 기업 요건을 확인합니다.'),
                array('title' => '투자 방식', 'desc' => '신주 인수 등 허용되는 투자 형태인지 봅니다.'),
                array('title' => '신고', 'desc' => '투자자와 기업의 신고 시점이 다릅니다.'),
            ),
            'steps' => array('투자 계획 확인', '기업 요건 진단', '계약 구조 검토', '확인·신고 일정', '보유 기간 안내'),
            'cost' => array('실제 공제액은 세법과 개인 소득에 따라 달라지므로 세무 검토가 필요합니다.'),
            'faqs' => array(
                array('q' => '기존 주식을 양도받아도 되나요?', 'a' => '일반적으로 요건에 맞는 신규 출자인지가 중요합니다. 개별 계약은 별도 확인이 필요합니다.'),
            ),
            'related' => array('cert-venture', 'tax-fund', 'corp-structure', 'corp-setup'),
        ),
        'tax-fund' => array(
            'group' => 'tax', 'title' => '개인투자조합',
            'summary' => '개인투자조합의 역할과 결성 전 확인할 포인트를 안내합니다.',
            'message' => '개인투자조합은 여러 개인의 자금을 모아 창업·벤처기업에 투자하는 그릇입니다. 결성 요건, 등록, 투자 대상기업 요건이 따로 있습니다.',
            'who' => array('지인 투자를 조합으로 정리하려는 팀', '개인 자격 투자 구조를 알아보는 대표'),
            'benefits' => array('조합과 직접 투자의 차이를 설명', '등록과 투자 집행 순서를 안내', '대상 기업 요건과 벤처확인의 연결'),
            'points' => array(
                array('title' => '결성', 'desc' => '출자자 구성과 업무집행조합원 역할을 정리합니다.'),
                array('title' => '투자 대상', 'desc' => '조합이 투자할 수 있는 기업 요건을 확인합니다.'),
            ),
            'steps' => array('목적 확인', '출자 구조 스케치', '등록 요건 점검', '투자 집행', '사후 보고'),
            'cost' => array('등록·운용 비용은 구조에 따라 다릅니다. 법률·세무 검토가 필요한 부분은 범위를 먼저 나눕니다.'),
            'faqs' => array(
                array('q' => '조합 없이 개인이 직접 투자해도 되나요?', 'a' => '가능합니다. 다만 공제와 지분 관리는 방식이 달라 목적을 먼저 정해야 합니다.'),
            ),
            'related' => array('tax-deduction', 'tax-benefit', 'corp-structure'),
        ),
        'tax-benefit' => array(
            'group' => 'tax', 'title' => '벤처투자 관련 세제혜택',
            'summary' => '투자 소득공제 외에 벤처·연구소와 연결되는 세제 포인트를 구분해 설명합니다.',
            'message' => '벤처 주변의 세제는 투자자 공제, 기업 감면, 스톡옵션, 연구소 세액공제가 서로 다릅니다. 이름을 묶어 말하면 적용 주체가 헷갈립니다.',
            'who' => array('벤처확인 전후의 세금을 정리하려는 대표', '투자 조건에 세제 이야기를 넣는 기업'),
            'benefits' => array('주체별(투자자/법인)로 혜택을 분리', '적용 시점과 사후 의무를 같이 안내', '연구소·법인 구조와 중복 여부를 점검'),
            'points' => array(
                array('title' => '투자자', 'desc' => '소득공제, 양도세 등은 투자자 요건을 봅니다.'),
                array('title' => '법인', 'desc' => '벤처 감면, 연구인력·연구소 공제는 회사 요건을 봅니다.'),
            ),
            'steps' => array('현재 혜택 후보 목록화', '적용 주체 분리', '부족 요건 확인', '신고 일정', '내년 구조 점검'),
            'cost' => array('절세액 추정은 세무 자료가 있어야 합니다. 여기서는 해당 여부를 먼저 가릅니다.'),
            'faqs' => array(
                array('q' => '벤처인증만 받으면 법인세가 줄어드나요?', 'a' => '감면은 별도의 업력·지역·소득 요건이 있습니다. 확인서만으로 자동 적용이라고 보시면 안 됩니다.'),
            ),
            'related' => array('tax-deduction', 'cert-venture', 'cert-lab', 'corp-tax'),
        ),
        'corp' => array(
            'group' => 'corp', 'title' => '법인·경영컨설팅 안내',
            'summary' => '법인설립, 전환, 절세, 구조설계, 설립 이후 경영 이슈를 한 흐름으로 봅니다.',
            'message' => '법인은 등기 자체가 목적이 아닙니다. 주주, 임원, 자본, 사업목적을 어떻게 두느냐가 이후 투자·자금·인증에 남습니다.',
            'who' => array('설립 또는 전환을 고민하는 대표', '이미 법인이지만 구조가 불안한 기업'),
            'benefits' => array('설립·전환·절세·인증을 분리해서 설명', '지금 할 일과 나중 일을 일정으로 나눔'),
            'points' => array(
                array('title' => '설립·전환', 'desc' => '개인과 법인의 차이를 현재 매출 기준으로 봅니다.'),
                array('title' => '구조', 'desc' => '지분과 정관은 분쟁과 투자 전에 손보는 편이 낫습니다.'),
                array('title' => '성장', 'desc' => '설립 이후 자금·인증·경영 과제를 이어서 봅니다.'),
            ),
            'steps' => array('현황 진단', '구조 제안', '등기·전환 절차', '세무 기장 연결', '자금·인증 연계'),
            'cost' => array('등기 세금과 대행 범위는 자본금·소재지에 따라 달라집니다.', $consult),
            'faqs' => array(
                array('q' => '무조건 법인이 유리한가요?', 'a' => '아닙니다. 매출, 인원, 투자 계획에 따라 개인이 맞는 시기도 있습니다.'),
            ),
            'related' => array('corp-setup', 'corp-convert', 'corp-tax', 'corp-structure', 'corp-consult'),
        ),
        'corp-setup' => array(
            'group' => 'corp', 'title' => '법인설립',
            'summary' => '상호·자본금·주주·임원·사업목적까지 사업에 맞는 설립 구조를 잡습니다.',
            'message' => '법인설립은 서류 대행으로 끝나면 나중에 지분과 정관을 다시 고치게 됩니다. 1인 법인인지, 공동창업인지, 투자 계획이 있는지를 먼저 정합니다.',
            'who' => array('처음 법인을 만드는 예비 대표', '공동창업으로 지분을 나눠야 하는 팀', '설립 이후 정책자금·인증까지 이어서 보고 싶은 대표'),
            'benefits' => array('개인·법인 유불리를 상황별로 비교', '주주·임원·자본금 체크리스트 제공', '설립 이후 자금·인증 순서를 미리 연결'),
            'points' => array(
                array('title' => '기본 구조', 'desc' => '상호, 본점, 자본금, 주주, 임원, 사업목적을 확정합니다.'),
                array('title' => '등기', 'desc' => '필요 서류와 전자등기 흐름을 안내하고 제휴 절차로 진행합니다.'),
                array('title' => '이후', 'desc' => '사업자등록, 기장, 정책자금·벤처·연구소로 이어질 수 있습니다.'),
            ),
            'steps' => array('상황 진단', '구조 설계', '서류·등기', '사업자등록 안내', '성장 제도 연계'),
            'cost' => array('등록면허세 등은 본점 소재지와 자본금에 따라 달라집니다.', '과밀억제권역은 중과 여부를 따로 봅니다.', '대행 보수는 범위를 정한 뒤 안내합니다.'),
            'faqs' => array(
                array('q' => '1인 법인이 가능한가요?', 'a' => '대표 1인 설립이 가능한 구조가 있습니다. 조사보고 임원 요건은 따로 확인합니다.'),
                array('q' => '자본금은 얼마가 적당한가요?', 'a' => '상법상 최저 기준과 업종 인허가, 통장 개설, 대외 신뢰를 함께 보고 정합니다.'),
            ),
            'related' => array('funding', 'cert-venture', 'cert-lab', 'cert-innobiz', 'cert-mainbiz', 'tax-deduction'),
        ),
        'corp-convert' => array(
            'group' => 'corp', 'title' => '개인사업자 법인전환', 'home' => true,
            'summary' => '개인사업자의 매출·자산·세금 부담을 보고 법인전환 시점과 방식을 검토합니다.',
            'message' => '법인전환은 간판만 바꾸는 일이 아닙니다. 포괄양수도와 신규 설립 후 이전은 세금과 계약 승계가 다릅니다. 순이익 규모와 성실신고 여부를 먼저 봅니다.',
            'who' => array('소득세 부담이 커진 개인사업자', '거래처·입찰 때문에 법인이 필요한 사업장', '자산을 어떻게 넘길지 고민인 대표'),
            'benefits' => array('전환 시점의 유불리 점검', '포괄양수도와 다른 방식의 차이 설명', '전환 후 기장·정책자금 연결'),
            'points' => array(
                array('title' => '시점', 'desc' => '매출, 소득, 직원 수, 내년 계획을 같이 봅니다.'),
                array('title' => '방식', 'desc' => '사업용 자산·부채를 어떻게 넘길지 정합니다.'),
                array('title' => '이후 운영', 'desc' => '개인 사업자 유지 여부와 동일 업종 병행 리스크를 점검합니다.'),
            ),
            'steps' => array('재무 현황 확인', '전환 방식 비교', '법인 구조 설계', '이전·등기', '기장과 자금 일정'),
            'cost' => array('취득세·양도 관련 세금은 자산 내용에 따라 크게 달라집니다.', '숫자 확정은 세무 자료 검토 후 가능합니다.'),
            'faqs' => array(
                array('q' => '개인사업자를 없애야 하나요?', 'a' => '사업 목적이 분명히 나뉘면 병행할 수도 있습니다. 같은 사업을 이중으로 두면 과세 이슈가 생길 수 있습니다.'),
            ),
            'related' => array('corp-setup', 'corp-tax', 'funding-small', 'corp-structure'),
        ),
        'corp-tax' => array(
            'group' => 'corp', 'title' => '기업절세',
            'summary' => '법인 설립·전환 이후 반복되는 세금 포인트를 구조와 함께 정리합니다.',
            'message' => '절세는 비용 처리 요령만으로 되지 않습니다. 대표 보수, 가지급금, 연구개발비, 법인 차량처럼 구조가 어긋난 항목부터 봐야 합니다.',
            'who' => array('결산 전에 세금 포인트를 점검하려는 법인', '가지급금·보수·비용 처리가 불안한 대표'),
            'benefits' => array('손익과 통장 흐름을 같이 봄', '연구소·벤처 감면처럼 제도 절세와 구분', '당장 고칠 항목과 내년 항목을 나눔'),
            'points' => array(
                array('title' => '대표 계정', 'desc' => '가지급금, 가수금, 보수 설계를 분리해서 봅니다.'),
                array('title' => '제도 공제', 'desc' => '연구소, 벤처, 고용 관련 공제는 요건이 맞을 때만 이야기합니다.'),
            ),
            'steps' => array('자료 수령', '리스크 목록', '우선 조치', '세무 연계', '다음 결산 점검'),
            'cost' => array('절세 금액은 장부와 신고 내역이 있어야 말합니다. 사전 진단은 방향 제시에 가깝습니다.'),
            'faqs' => array(
                array('q' => '법인카드만 잘 쓰면 되나요?', 'a' => '증빙은 기본이고, 업무 관련성과 한도, 대표 개인 경비가 섞이지 않는지가 더 중요합니다.'),
            ),
            'related' => array('corp-convert', 'cert-lab', 'tax-benefit', 'corp-consult'),
        ),
        'corp-structure' => array(
            'group' => 'corp', 'title' => '법인구조설계',
            'summary' => '주주 구성, 지분, 정관 특약, 임원 구조를 투자와 운영에 맞게 설계합니다.',
            'message' => '지분 50:50은 결정이 멈추기 쉽고, 정관에 없는 특약은 나중에 분쟁 문서가 되지 못합니다. 설립 전이나 투자 전에 구조를 적는 일이 핵심입니다.',
            'who' => array('공동창업 팀', '투자 전 지분 정리가 필요한 법인', '가족 주주 구조를 정리하려는 회사'),
            'benefits' => array('의사결정이 막히지 않는 지분안 검토', '정관에 넣을 항목과 주주간 계약 항목을 구분', '이후 투자·스톡옵션 여지를 남김'),
            'points' => array(
                array('title' => '지분', 'desc' => '역할, 출자, 향후 기여를 함께 보고 대표 의결권을 설계합니다.'),
                array('title' => '임원', 'desc' => '등기임원과 실무 역할을 구분합니다.'),
                array('title' => '정관', 'desc' => '주식 양도, 이사 선임, 신주발행 관련 조항을 점검합니다.'),
            ),
            'steps' => array('이해관계 정리', '지분 시안', '정관·계약 포인트', '등기 반영', '투자 일정과 대조'),
            'cost' => array('법률 문서가 필요하면 제휴 범위를 먼저 정합니다.'),
            'faqs' => array(
                array('q' => '설립 후에도 지분을 바꿀 수 있나요?', 'a' => '가능하지만 세금과 기존 주주 동의가 따릅니다. 처음부터 여지를 두는 편이 비용이 적습니다.'),
            ),
            'related' => array('corp-setup', 'tax-deduction', 'tax-fund', 'corp-consult'),
        ),
        'corp-consult' => array(
            'group' => 'corp', 'title' => '경영컨설팅', 'home' => true,
            'summary' => '설립 이후 성장 전략, 재무, 조직, 인증·자금 우선순위를 함께 정리합니다.',
            'message' => '경영컨설팅은 두꺼운 보고서보다, 이번 분기에 손댈 순서를 정하는 일에 가깝습니다. 자금, 인증, 채용, 세무 중 병목을 고릅니다.',
            'who' => array('할 일은 많은데 순서가 없는 대표', '인증·자금·조직을 한 번에 묻고 싶은 기업'),
            'benefits' => array('이번 분기 우선순위 3가지로 압축', '외부 제도(자금·인증)와 내부 운영을 한 표로 정리'),
            'points' => array(
                array('title' => '진단', 'desc' => '매출, 현금, 인력, 제도 일정을 같이 봅니다.'),
                array('title' => '실행', 'desc' => '내부에서 할 일과 외부 전문가에게 맡길 일을 나눕니다.'),
            ),
            'steps' => array('인터뷰', '이슈 정리', '90일 과제', '실행 점검', '다음 제도 연결'),
            'cost' => array('자문 범위(횟수·산출물)를 정한 뒤 안내합니다.'),
            'faqs' => array(
                array('q' => '컨설팅 결과물은 무엇인가요?', 'a' => '우선순위, 일정, 필요한 제도 목록입니다. 등기나 세무 신고 자체는 해당 전문가 영역으로 연결합니다.'),
            ),
            'related' => array('corp-setup', 'funding', 'cert', 'corp-tax'),
        ),
    );

    return $items;
}

function bizontop_groups()
{
    return array(
        'funding' => array('label' => '정책자금', 'hub' => 'funding'),
        'cert' => array('label' => '기업인증', 'hub' => 'cert'),
        'tax' => array('label' => '벤처투자/세제혜택', 'hub' => 'tax'),
        'corp' => array('label' => '법인/경영컨설팅', 'hub' => 'corp'),
    );
}

function bizontop_service_url($slug)
{
    return G5_URL.'/page/service.php?id='.rawurlencode($slug);
}

function bizontop_service($slug)
{
    $items = bizontop_catalog();
    if (!isset($items[$slug])) {
        return null;
    }
    $page = $items[$slug];
    if (!function_exists('bizontop_service_detail')) {
        include_once dirname(__FILE__).'/bizontop-detail.php';
    }
    $extra = bizontop_service_detail($slug);
    if (is_array($extra)) {
        foreach ($extra as $key => $value) {
            $page[$key] = $value;
        }
    }
    return $page;
}

function bizontop_nav()
{
    $groups = bizontop_groups();
    $items = bizontop_catalog();
    $nav = array();

    foreach ($groups as $gid => $group) {
        $sub = array();
        foreach ($items as $slug => $item) {
            if ($item['group'] !== $gid) {
                continue;
            }
            $sub[] = array(
                'me_name' => $item['title'],
                'me_link' => bizontop_service_url($slug),
                'me_target' => 'self',
            );
        }
        $nav[] = array(
            'me_name' => $group['label'],
            'me_link' => bizontop_service_url($group['hub']),
            'me_target' => 'self',
            'sub' => $sub,
        );
    }

    $nav[] = array(
        'me_name' => '정보/칼럼',
        'me_link' => G5_URL.'/page/column.php',
        'me_target' => 'self',
        'sub' => array(
            array('me_name' => '전체 칼럼', 'me_link' => G5_URL.'/page/column.php', 'me_target' => 'self'),
            array('me_name' => '정책자금', 'me_link' => G5_URL.'/page/column.php?sca='.rawurlencode('정책자금'), 'me_target' => 'self'),
            array('me_name' => '기업인증', 'me_link' => G5_URL.'/page/column.php?sca='.rawurlencode('기업인증'), 'me_target' => 'self'),
            array('me_name' => '법인', 'me_link' => G5_URL.'/page/column.php?sca='.rawurlencode('법인'), 'me_target' => 'self'),
            array('me_name' => '절세', 'me_link' => G5_URL.'/page/column.php?sca='.rawurlencode('절세'), 'me_target' => 'self'),
            array('me_name' => '벤처투자', 'me_link' => G5_URL.'/page/column.php?sca='.rawurlencode('벤처투자'), 'me_target' => 'self'),
        ),
    );

    return $nav;
}

function bizontop_home_services()
{
    $want = array('funding', 'cert', 'tax-deduction', 'corp-convert', 'corp-consult');
    $items = bizontop_catalog();
    $list = array();
    foreach ($want as $slug) {
        if (isset($items[$slug])) {
            $row = $items[$slug];
            $row['slug'] = $slug;
            $list[] = $row;
        }
    }
    return $list;
}
