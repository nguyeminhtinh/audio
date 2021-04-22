// @flow

import React, { useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import { Creators } from 'screens/myPage/redux';
import { useDispatch } from 'react-redux';

const Terms = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.registerHistoryPage('SG12'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainLayout customClass="" titleHeader="이용약관" isShowHeader isLink>
      <div className="page-terms">
        <p>[웅진씽크빅 딸기콩 이용약관]</p>{' '}
        <p>
          제 1조 (목적) 이 약관은 주식회사 웅진씽크빅(이하 ‘회사’)에서 제공하는
          딸기콩 어플리케이션(Android, IOS)(이하 ‘딸기콩’) 서비스를 이용하는
          회원이 온라인으로 제공하는 디지털 콘텐츠(이하 ‘콘텐츠’) 및 제반
          서비스를 이용함에 있어 회사와 회원의 권리, 의무 및 책임 사항 등을
          규정함을 목적으로 합니다.{' '}
        </p>
        <p>
          제 2조 (정의) <br />
          1. ‘회사’라 함은 ‘콘텐츠’ 산업과 관련된 경제활동을 영위하는 자로서
          콘텐츠 및 제반 서비스를 제공하는 자이며, 이 약관에서는 주식회사
          웅진씽크빅을 말합니다. <br />
          2. ‘딸기콩’이란 오디오북, 동영상북 콘텐츠 이용, 각종 정보 관리 및
          이벤트 참여 등과 같은 회원에게 다양한 서비스 및 혜택을 담고 있는
          모바일 앱을 말합니다. <br />
          3. ‘서비스’란 접속 가능한 유무선 통신기기의 종류와는 상관없이 이용
          가능한 ‘회사’가 제공하는 모든 서비스를 의미합니다. <br />
          4. ‘회원’이란 유무선 통신기기에 ‘딸기콩’을 설치하고 접속하여 사용하는
          자를 말하며, 회사에 개인정보를 제공하여 회원가입을 한 자로서, 회원
          아이디를 부여받아 본 약관에 따라 회사가 딸기콩 앱 (Android, IOS)
          서비스를 이용하는 자를 말합니다. <br />
          5. ‘회원 아이디(이하 ‘ID’라 한다)’란 회원의 식별과 회원의 서비스
          이용을 위하여 회원이 선정하고 회사가 승인하는 이메일을 의미합니다.{' '}
          <br />
          6. ‘비밀번호’란 회원이 부여받은 ID와 일치된 회원임을 확인하고, 회원의
          개인정보를 보호하기 위하여 회원이 정한 문자, 숫자, 특수문자 1자
          이상씩의 조합(최소 8자 ~ 최대 20자 이내)을 의미합니다. <br />
          7. ‘회원가입’이라 함은 딸기콩 서비스를 이용하고자 하는
          자(‘고객’이라고도 합니다)가 딸기콩 이용약관에 동의하고 회사와 그
          이용계약을 체결하는 것을 의미합니다. 회원가입을 하는 경우 고객은
          딸기콩 서비스 회원이 됩니다. <br />
          8. ‘회원탈퇴’라 함은 회원이 딸기콩 이용약관 또는 딸기콩
          유료서비스약관의 체결로 발생한 제반 권리와 의무 등의 법률관계를 자의로
          영구히 종료하거나, 포기하는 것을 의미합니다. <br />
          9. ‘유료 서비스’라 함은 회사가 제공하는 별도의 결제방식을 이용하여
          이용요금을 지급한 후에 사용할 수 있는 딸기콩의 서비스를 의미합니다.
          유료서비스의 세부내용은 멤버십 안내 페이지와, 결제 또는 구독 안내
          페이지에 자세히 기재되어 있습니다. <br />
          10. ‘유료회원’이라 함은 별도의 금액을 지불하여 유료서비스를 구매한
          회원을 말합니다. <br />
          11. ‘무료회원’이라 함은 유료회원이 아닌 회원으로 회원가입 이후에
          기본적으로 모든 회원에게 부여되는 자격을 가진 회원을 의미합니다.{' '}
          <br />
          12. ‘결제’라 함은 회원이 특정 유료서비스를 이용하기 위하여 각종
          지불수단을 통하여 회사가 정한 일정 금액을 회사에 지불하는 것을
          의미합니다. <br />
          13. ‘구매’라 함은 회사가 유료서비스에 대한 이용 승낙 및 유료서비스
          제공이 가능할 수 있도록 회원이 이용하고자 하는 유료서비스를 선택하여
          지불수단을 통한 결제를 함으로써 그 대가를 지급하는 행위를 의미합니다.{' '}
          <br />
          14. 이 약관에서 사용하는 용어의 정의는 상기에서 정한 것을 제외하고는
          거래관행 및 관계 법령을 따릅니다. <br />제 3조 (신원정보 등의 제공)
          <br />
          회사는 이 약관의 내용, 상호, 대표자 성명, 영업소 소재지 주소(소비자의
          불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호,
          전자우편주소, 사업자등록번호, 통신 판매업 신고 번호 및
          개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 딸기콩 앱 서비스
          초기화면에 게시합니다. 다만, 약관은 이용자가 연결화면을 통하여 볼 수
          있도록 할 수 있습니다. <br />제 4조 (약관의 효력/변경 등) <br />
          1. 이 약관은 서비스를 이용하기를 희망하는 회원이 동의함으로써 효력이
          발생하며, 회원이 이 약관에 대하여 “동의하기” 버튼을 클릭한 경우, 이
          약관의 내용을 충분히 이해하고 그 적용에 동의한 것으로 봅니다. <br />
          2. 회사는 “전자상거래등에서의소비자보호에관한법률”,
          "약관의규제에관한법률", "전자문서및전자거래기본법", "전자서명법",
          “전자금융거래법”, "정보통신망이용촉진등에관한법률",
          "방문판매등에관한법률", "소비자보호법" 등 관련법을 위배하지 않는
          범위에서 이 약관을 개정할 수 있습니다. <br />
          3. 회사가 약관을 개정할 경우에는 적용 일자 및 개정사유를 명시하여 본
          딸기콩 초기화면에 적용일자 15일부터 적용일자 전일까지 공지합니다. 다만
          회원에게 불리하게 약관 내용을 변경하는 경우에는 최소 30일 이상의
          유예기간을 두고 공지합니다. <br />
          4. 회사가 이 약관을 개정하는 경우 그 개정약관은 적용일자 이후에
          체결되는 계약에 적용되며, 기존 회원들도 충분한 유예기간을 두고 공지한
          후 소급적용 됩니다. 개정 약관의 적용/시행일까지 회원이 거부 의사를
          표시하지 아니할 경우 약관의 개정에 동의한 것으로 간주한다는 내용을
          알렸으나, 회원이 명시적으로 약관 변경에 대한 거부의사를 표시하지
          아니하면, 회사는 회원이 적용/시행 일자 부로 변경 약관에 동의한 것으로
          간주합니다. 개정/변경 약관에 대하여 거부의사를 표시한 회원은 계약의
          해지 또는 회원 탈퇴를 선택할 수 있습니다. <br />
          5. 이 약관은 회원이 이 약관에 동의한 날로부터 회원 탈퇴 시까지
          적용하는 것을 원칙으로 합니다. 단, 이 약관의 일부 조항은 회원이 탈퇴
          후에도 유효하게 적용될 수 있습니다. <br />
          6. 이 약관은 회사가 제공하는 각 서비스 별 운영 규칙과 함께 적용됩니다.
          이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
          전자상거래등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률,
          공정거래위원회가 정하는 ‘전자상거래등에서의 소비자 보호지침’ 및 관계
          법령 또는 상관례에 따릅니다. <br />제 5조 (회원가입) <br />
          1. 회원가입은 이용자가 약관의 내용에 대하여 동의를 하고 회원가입
          신청을 한 후 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.{' '}
          <br />
          2. 회원가입 신청서에는 다음 사항을 기재해야 합니다. 다음 제1호 또는
          제2호의 사항은 필수 기재사항이며, 그 외의 사항은 선택 사항입니다.{' '}
          <br />① 회원의 이름 <br />② 이메일 주소와 비밀번호, 생년월일 <br />③
          결제 정보 (카드사 명, 카드 번호 첫/끝 뒷자리, 카드 유효기간, 핸드폰
          번호) <br />④ 이벤트 진행 시 받는 정보 (이름, 연락처, 주소) <br />⑤
          개인정보 수집 제공 동의 <br />⑥ 기타 회사가 필요하다고 인정하는 사항{' '}
          <br />
          3. 회사는 상기 이용자의 신청에 대하여 회원가입을 승낙함을 원칙으로
          합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지
          않을 수 있습니다. <br />① 실명이 아니거나 타인의 명의를 이용하여
          신청한 경우 <br />② 이용계약 신청서의 내용을 허위로 기재한 경우 <br />
          ③ 사회의 안녕과 질서, 미풍양속을 저해할 목적으로 신청한 경우 <br />④
          부정한 용도로 본 서비스를 이용하고자 하는 경우 <br />⑤ 영리를 추구할
          목적으로 본 서비스를 이용하고자 하는 경우 <br />⑥ 기타 회사가 정한
          등록신청 요건이 미비한 경우 <br />⑦ 가입 신청자가 본 약관에 의하여
          이전에 회원자격을 잃은 적이 있는 경우 <br />⑧ 기타 규정한 제반 사항을
          위반하며 신청하는 경우 <br />
          4. 회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가
          있는 경우에는 승낙을 유보할 수 있습니다. <br />
          5. 제3항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한
          경우, 회사는 이를 신청자에게 알려야 합니다. 회사의 귀책사유 없이
          신청자에게 통지할 수 없는 경우에는 예외로 합니다. <br />
          6. 회원가입계약의 성립 시기는 회사의 승낙이 이용자에게 도달한 시점으로
          합니다. <br />제 6조 (미성년자의 회원가입에 관한 특칙) <br />만 14세
          미만의 이용자는 개인정보의 수집 및 이용목적에 대하여 충분히 숙지하고
          부모 등 법정대리인의 동의를 얻은 후에 회원가입을 신청하고 본인의
          개인정보를 제공하여야 합니다. <br />
          회사는 부모 등 법정대리인의 동의에 대한 확인절차를 거치지 않은 14세
          미만 이용자에 대하여는 가입을 취소 또는 허락하지 않습니다. 만 14세
          미만 이용자의 부모 등 법정대리인은 아동에 대한 개인정보의 열람, 정정,
          갱신을 요청하거나 회원가입에 대한 동의를 철회할 수 있으며 이러한
          경우에 회사는 지체없이 필요한 조치를 해야 합니다. <br />제 7조
          (회원정보의 변경) <br />
          1. 회원은 1:1 문의 혹은 마이 화면을 통하여 언제든지 자신의 개인정보를
          열람하고 수정할 수 있습니다. (아이디는 변경 불가, 비밀번호 등 변경
          가능) <br />
          2. 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로
          수정하거나 이메일 등 기타 방법으로 회사에 대하여 그 변경사항을 알려야
          합니다. <br />
          3. 제2항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는
          책임지지 않습니다. <br />제 8조 (회원의 ‘아이디’ 및 ‘비밀번호’의
          관리에 대한 의무) <br />
          1. 회원의 ‘아이디’와 ‘비밀번호’에 관한 관리책임은 회원에게 있으며,
          이를 제3자가 이용하도록 하여서는 안 됩니다. <br />
          2. 회원은 ‘아이디’ 및 ‘비밀번호’가 도용되거나 제3자에 의해 사용되고
          있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야
          합니다. <br />
          3. 제2항의 상황에 해당 회원이 회사에 그 사실을 통지하지 않거나 통지한
          경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는
          책임지지 않습니다. <br />제 9조 (회원에 대한 통지) <br />
          1. 회사가 회원에 대한 통지를 하는 경우 회원이 지정한 이메일 주소로 할
          수 있습니다. <br />
          2. 회사는 회원 전체에 대한 통지의 경우 7일 이상 회사의 게시판에
          게시함으로써 제 1항의 통지에 대신할 수 있습니다. 다만, 회원 본인의
          거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별 통지를
          합니다. <br />제 10조 (회원탈퇴 및 자격 상실 등) <br />
          1. 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시
          회원탈퇴를 처리합니다. 단, 탈퇴한 회원은 탈퇴 일로부터 같은 아이디로
          회원가입을 할 수 없습니다. <br />
          2. 회원이 다음 각 호의 사유에 해당하면, 회사는 회원자격을 제한 및
          정지시킬 수 있습니다, <br />① 가입 신청 시에 계약에 위반되는 허위
          사실을 기입하였을 경우 <br />② 다른 사람의 회사의 서비스 이용을
          방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우{' '}
          <br />③ 회사를 이용하여 기타 관련 법률과 이 약관이 금지하는 행위를
          하거나 미풍양속에 반하는 행위를 하는 경우 <br />④ 기타 이 약관의
          회원의 의무를 위반하는 경우 <br />
          3. 회사가 회원자격을 제한•정지시킨 후, 동일한 행위가 2회 이상
          반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 회사는
          회원자격을 상실시킬 수 있습니다. <br />
          4. 회사가 회원자격을 상실시키는 경우에는 회원등록을 말소하며, 이 경우
          회원에게 이를 통지하고, 회원등록 말소 전에 소명할 기회를 부여합니다.{' '}
          <br />
          5. 제 2항의 경우, 회사는 회원에게 손해배상을 청구할 수 있습니다.{' '}
          <br />제 11조 (개인정보의 보호 및 관리) <br />
          1. 회사는 서비스를 제공하는 데 필요한 회원의 개인정보를 수집할 수
          있습니다. <br />
          2. 회사는 회원의 개인정보를 수집이용하는 때에는 그 목적을 고지하고
          동의를 받습니다. <br />
          3. 회사는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운
          이용목적이 발생한 경우 또는 제 3자에게 제공하는 경우에는
          이용제공단계에서 당해 회원에게 그 목적을 고지하고 동의를 받습니다.
          다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다. <br />
          4. 회원은 언제든지 회사가 가지고 잇는 자신의 개인정보에 대해 열람 및
          오류정정을 요구할 수 있으며 회사는 이에 대해 지체 없이 필요한 조치를
          취할 의무를 집니다. 회원이 오류의 정정을 요구한 경우에는 회원은 그
          오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다. <br />
          5. 회사는 개인정보 보호를 위하여 회원의 개인정보를 취급하는 자를
          최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 회원의 개인
          정보의 분실, 도난, 유출, 동의 없는 제 3자 제공, 변조 등으로 인한
          회원의 손해에 대하여 모든 책임을 집니다. <br />
          6. 회사 또는 그로부터 개인정보를 제공받은 제 3자는 개인정보의 수집목적
          또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이
          파기합니다. <br />
          7. 회사는 개인정보의 수집이용제공에 과한 동의 란을 미리 선택한
          것으로 설정해 두지 않습니다. 다만, 개인정보의 수집이용제공에 관한
          동의를 회원이 거절하는 경우 회원은 딸기콩 서비스의 이용을 일부 제한
          받을 수 있습니다. <br />
          8. 회사는 회사의 귀책 없이 회원의 귀책사유로 인하여 회원의 정보가
          노출된 경우 이에 대해서는 책임을 지지 않습니다. <br />제 12조 (회원의
          의무)
          <br />
          1. 회원은 관련 법령, 본 약관의 각 규정, 이용안내 및 서비스와 관련하여
          공지하거나 통지한 주의사항 등을 준수하여야 하며, 기타 회사의 업무에
          방해되는 행위를 하여서는 아니 됩니다. <br />
          2. 회원은 내용별로 회사가 서비스 공지사항에 게시하거나 별도로 공지한
          이용제한 사항을 준수하여야 합니다.
          <br />
          3. 회원은 회사의 사전승낙 없이는 서비스를 이용하여 영업 기타 영리적
          목적의 활동을 할 수 없으며, 그 영업활동의 결과와 회원이 약관에 위반한
          영업활동을 하여 발생한 결과에 대하여 회사는 책임을 지지 않습니다.
          회원은 이와 같은 영업활동으로 회사가 손해를 입었을 때 회사에 대하여
          손해배상 의무를 집니다. <br />
          4. 회원은 회사의 명시적인 동의가 없는 한 서비스의 이용권한, 기타 이용
          계약상의 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수
          없습니다. <br />
          5. 회원은 서비스 이용과 관련하여 다음 각 호에 해당하는 행위를 하여서는
          안 됩니다. <br />① 신청 또는 변경 시 허위내용의 기재 <br />② 타인의
          정보도용 <br />③ 회사가 게시된 정보의 변경
          <br />④ 회사가 금지한 정보(컴퓨터 프로그램 등)의 송신 또는 게시 <br />
          ⑤ 회사와 기타 제삼자의 저작권 등 지식재산권에 대한 침해 <br />⑥ 회사
          및 기타 제삼자의 명예를 손상하거나 업무를 방해하는 행위 <br />⑦ 외설
          또는 폭력적인 말이나 글, 화상, 음향, 기타 미풍양속에 반하는 정보를
          회사의 사이트에 공개 또는 게시하는 행위 <br />⑧ 불법적이거나 부당한
          행위 <br />⑨ 기타 관계되는 법령에 위배되는 행위 <br />
          6. 회원은 본 약관에서 규정하는 사항 및 주의사항을 준수하여야 합니다.{' '}
          <br />제 13조 (서비스 이용계약의 성립 및 승낙의 제한) <br />
          1. 서비스에 대한 이용계약은 이 약관에 동의한다는 의사표시(동의함을
          선택)와 함께 이용신청을 하고 회사가 이를 승낙함으로써 비로소
          성립합니다. <br />
          2. 회원은 서비스 이용계약을 체결하기 전에 해당 서비스에 대하여 이
          약관에서 회사가 명시, 고지하는 사항을 숙지하고, 착오 없이 정확히
          거래할 수 있도록 하여야 합니다. <br />
          3. 회사와 회원 간 서비스 이용계약은 회사의 승낙이 회원에게 도달한
          시점(유료서비스의 “구매/결제완료 등”의 표시가 회원에게 절차상 표시된
          시점)에 성립합니다.
          <br />
          4. 회사는 서비스 이용약관 제 13조(이용 신청에 대한 승낙의 제한)에서
          정하는 사유가 발생하는 경우, 이용신청을 승낙하지 아니하거나 소정의
          조건 성취 또는 제한 사유가 해소될 때까지 일정 기간 동안 승낙을 유보할
          수 있습니다. <br />
          5. 회원은 유료서비스 이용 신청을 위한 제반 사항을 기재할 경우 회원의
          현재의 사실과 일치하는 정보를 기재하여야 하며, 회원이 이용하고자 하는
          유료서비스 결제방법의 선택 및 선택한 결제방법에 필요한 결제정보를
          정확히 회사에 제공하여야 합니다. 해당 사항이 변경될 경우 지체 없이
          회사가 정한 절차에 따라 변경사항을 고지, 반영하여야 합니다.
          <br />
          6. 회사는 딸기콩 이용약관 제 13조(서비스 이용계약의 성립 및 승낙의
          제한)의 기재사항 이외에 회원의 서비스 이용에 필요한 최소한의 정보를
          수집할 수 있습니다. 이를 위해 회사가 문의한 사항에 대해 회원은
          성실하게 알립니다. 회사는 이 경우 수집하는 회원의 정보를 딸기콩
          이용약관, 개인정보취급방침 및 정보통신망의 이용촉진 및 정보보호 등에
          관한 법률이 정한 바에 따라 이용, 관리합니다. <br />제 14조 (결제수단
          등) <br />
          1. 회원이 유료서비스의 결제를 위하여 이용할 수 있는 지불 수단은 다음
          각 호와 같습니다. <br />① 제휴된 신용/체크카드 하여 회원에게 결제 가능
          여부 및 그 방법을 안내하게 되는 결제 수단에 의한 대금 지급 <br />
          2. 결제를 통해 회원은 아래와 같은 행위를 할 수 있습니다. <br />①
          유료서비스의 가입 및 유료서비스 이용 <br />
          3. 회사는 유료서비스를 이용하는 회원의 거래금액에 대하여 내부 정책 및
          외부 결제 업체(은행사, 카드사 등), 기타 관련 법령의 변경에 따라 회원
          당 월 누적 결제액 등의 거래 한도를 정할 수 있으며, 회원은 회사가 정한
          거래 한도를 초과하는 범위의 유료서비스를 이용하고자 하면 거래 한도의
          초과로 인하여 유료서비스의 추가 이용이 불가능할 수 있습니다. <br />
          4. 제3항의 사정이 발생하게 될 경우 회사는 회원이 결제 시 해당 결제
          창에서 결제 가능 여부를 확인할 수 있도록 회원에게 안내합니다. <br />제
          15조 (유료서비스와 유료회원) <br />
          1. 회사가 회원의 이용신청을 승낙한 때로부터 유료서비스는 개시되며
          회사의 기술적 사유 등 기타 사정에 의하여 서비스를 개시할 수 없는
          경우에는 제4조(약관의 효력/변경 등)의 방법에 따라 회원에게 사전
          공지(게시판 등을 통함)합니다. <br />
          2. 회사는 회원의 이용 신청이 있게 되는 경우, 그 사실을 통지하며,
          회사의 통지를 받은 회원은 의사 표시 외의 불일치 사항이 있는 경우
          불일치 사실을 정정 또는 수정을 요청하여야 하며 회사는 회원의 요청에
          따라 처리하여야 합니다. 다만, 이미 대금을 지불한 경우에는 청약 철회
          등에 관한 제19조(청약 철회 및 서비스 이용계약의 해제•해지)의 규정에
          따릅니다. <br />
          3. 회사는 다음 각 호와 같은 유료서비스를 제공하며, 회사의 사정, 기타
          모든 여건에 따라 서비스 내용을 추가하거나 변경할 수 있습니다. 각
          유료서비스의 내용은 유료서비스 구매 페이지, 고객 센터(FAQ) 등에서
          회원에게 자세히 표시하고 있습니다. <br />
          1) 결제 서비스의 내용/속성에 따른 분류 - 딸기콩 무제한 이용권:
          딸기콩의 모든 콘텐츠를 무제한으로 이용 가능 (일부 개별 판매 콘텐츠
          제외) <br />
          2) 결제 서비스의 이용 기간/정기 결제 여부에 따른 분류 <br />- 개별
          결제형: 회원이 등록한 결제수단을 통하여 콘텐츠 단위로 이용요금이
          결제되고 해당 콘텐츠 이용 기간이 지나면 해당 콘텐츠 이용이 종료되는
          서비스 <br />- 정기 결제형 이용권: 회원이 등록한 결제수단을 통하여 월
          단위로 이용요금이 자동으로 결제되고 이용 기간이 자동 갱신되는 서비스.{' '}
          <br />
          3) 개별 결제형 상품 구매 정책 <br />- 개별 결제형 상품 구매는 앱스토어
          인앱결제로만 진행되며, 구매 이후 환불 등의 정책은 각각의앱스토어의
          환불 정책에 따릅니다. <br />
          4) 정기 결제형 이용권(멤버십) 상품 구매 정책 <br />- 멤버십 가입 시,
          최초 1회만 첫 달 무료 혜택이 제공됩니다. <br />- 무료 혜택(체험) 기간
          이후 매월 멤버십 연장 시작 시점(매월 구독 기간 마지막날)에 자동으로
          선결제 됩니다. <br />- 따라서, 다음달 결제는 구독 신청을 한 날과
          동일한 날짜에 이루어집니다. (예를 들어 4월 9일 구독 신청을 하신 경우
          다음달 5월 9일에 결제가 이루어집니다) <br />- 만약 특정 월에 결제일이
          존재하지 않는 경우, 해당 월에 한하여 말일에 결제됩니다. (예를 들어 1월
          31일 가입자의 정기 결제일은 2월 28일, 3월 31일 입니다) <br />- 정기
          결제(구독) 갱신을 중단하고자 할 경우, 해당월 구독기간 종료일 하루
          전까지 구독을 해지해야 합니다. <br />- 회원이 구독기간 중 중도해지를
          요청할 경우, 구글 플레이스토어, 애플 앱스토어의 결제대행수수료 등 기타
          비용을 제외한 나머지 금액에 한하여 사용기간을 일할 계산하여 공제한 후
          잔액을 환불합니다. <br />
          5) 회원이 무선 네트워크가 연결된 상태의 기기 내에 탑재된 딸기콩
          어플리케이션을 통하여 딸기콩의 제반 서비스 및 이용권을 이용하는 경우,
          해외 서비스 제공가능시 해외에서 딸기콩의 제반 서비스를 이용하게 되는
          경우에는 회원과 회원이 가입한 해당 통신사간에 체결된 통신 요금제에
          의한 별도의 데이터 통화료가 발생합니다. 이 경우 발생하는 데이터
          통화료는 회원과 해당 통신사간에 체결된 통신요금제에 따라
          과금/청구/수납되므로, 데이터 통화료 분에 대해서는 회사는 어떠한 책임도
          지지 않습니다. <br />
          6) 회사와 콘텐츠의 권리를 보유하고 있는 개인, 단체, 법인(‘권리자 등’)
          간 계약의 체결 여부 및 개별 계약의 내용, ‘권리자 등’의 사후 요원하는
          청에 따라 개별 유료서비스 또는 콘텐츠의 이용이 제한되거나 서비스 가능
          지역, 콘텐츠의 속성 등 내용이 사전 또는 사후 변경될 수 있습니다.
          회사는 ‘권리자 등’의 요청이 있게 되는 경우, 해당 요청에 따라
          유료서비스를 기기의 종류, 회원별 이용 가능 기기 대 수 등을 변경할 수
          있습니다. <br />제 16조 (B2B 거래) <br />
          1. B2B 거래란 특정 법인에게 딸기콩 유료서비스를 대량으로 판매하는
          거래를 말합니다. <br />
          2. B2B 거래시 거래량 및 해당 이용권의 용도에 따라 일정 수준의 할인율을
          적용할 수 있습니다 <br />제 17조 (회원의 유료서비스 변경) <br />
          회사는 유료서비스 이용권에 대한 변경이 있게 될 경우, 이 약관
          제4조(약관의 효력/변경 등)가 정하는 방법에 따라 그 사실 및 내용,
          변경일자를 사전에 알립니다. <br />제 18조 (청약 철회 및 서비스
          이용계약의 해제•해지) <br />
          1. 유료회원의 청약 철회는 해당 유료서비스를 전혀 사용하지 아니하였을
          때(콘텐츠 재생 이력이 없을 경우)에만 결제일로부터 7일 이내에 회사에
          결제 취소(청약철회)를 요청할 수 있습니다. 단, 유료회원은 해당
          유료서비스나 이용권의 내용이 표시•광고 내용과 다르거나 계약 내용과
          다르게 이행된 경우에는 해당 콘텐츠를 공급받은 날로부터 3개월 내지
          사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회 등을 할
          수 있습니다. <br />
          2. 유료회원이 제1항의 청약 철회가 가능한 유료서비스 또는 이용권에
          대하여 청약 철회 가능한 기간(결제일로부터 7일 이내)을 지나 청약 철회를
          신청하거나, 전자상거래 등에서의 소비자 보호에 관한 법률,
          콘텐츠산업진흥법, 콘텐츠이용자보호지침 등 기타 관계 법령에서 정한 청약
          철회 제한 사유에 해당하는 콘텐츠의 상황에 해당하는 경우에는 청약
          철회가 제한됩니다. <br />
          3. 회사는 회원이 유료서비스나 이용권을 구매하기 전 이용 화면 등에 아래
          각 호의 사항을 회원이 알 수 있도록 안내합니다. <br />- 유료서비스 또는
          영상 콘텐츠 및 오디오북, 음원의 제목 <br />- 가격, 자동 결제 여부,
          청약 철회 및 해지 가능 여부, 환불 등 거래조건 <br />- 콘텐츠의 교환,
          반품, 보증과 그 대금 환급의 조건 및 절차 <br />
          4. 청약 철회는 회원이 전화, 이메일, 1:1문의 등의 방법으로 회사에
          의사를 표시하여 회사에 도달될 때 그 효력이 발생하고 회원의 의사표시를
          받은 후 지체 없이 이러한 사실을 회원에게 회신합니다. <br />
          5. 회사는 회원이 청약 철회, 해지/해제 신청을 확인 후 환불 금액이 있을
          경우, 원칙적으로 회원의 해당 의사표시를 받은 날로부터 3영업일 이내에
          결제수단 별 사업자에게 대금의 청구 정지 또는 취소를 요청하고, 회원이
          결제한 동일 결제수단으로 환불함을 원칙으로 합니다. 단, 회사가 사전에
          회원에게 공지한 경우 및 아래의 각 경우와 같이 개별 결제 수단별 환불
          방법 환불 가능 기간 등이 차이가 있을 수 있습니다. <br />
          1) 신용카드 등 수납 확인이 필요한 결제수단의 경우에는 수납
          확인일로부터 3영업일 이내 <br />
          2) 결제수단 별 사업자가 회사와의 약정을 통하여 사전에 대금 청구 정지
          내지 결제 취소 가능 기한 등을 미리 정하여 둔 경우로 해당 기한을 지난
          환불의 경우 <br />
          3) 회원이 유료서비스의 이용 결과, 얻은 이익이 있거나 중도 해지의 경우{' '}
          <br />
          4) 회원이 환불 처리에 필요한 정보 내지 자료를 회사에 즉시 제공하지
          않는 경우 (현금 환불 시 신청인의 계좌 및 신분증 사본을 제출하지
          아니하거나, 타인 명의의 계좌를 제공하는 경우 등) <br />
          5) 해당 회원의 명시적 의사표시가 있는 경우 <br />
          7. 회사는 콘텐츠 이용자 보호지침 등에 따라, 회사가 부담하였거나 부담할
          부대비용 수수료를 차감하여 환불할 수 있습니다. <br />
          8. 회원이 유료서비스를 선물 받거나, 프로모션 등을 통해 무료/무상으로
          취득하는 등 회원이 직접 비용을 지불하지 아니한 서비스에 대하여는
          회사는 환불 의무를 부담하지 않습니다. <br />
          9. 회원이 본 약관에서 정하는 회원의 의무를 위반하였을 경우, 계약을
          해제, 해지하거나 서비스 이용 제한, 손해배상 청구 등의 조치를 할 수
          있으며, 계약해지 후 환불하여야 할 금액이 있을 경우에는 일정한 범위
          내에서 회원이 부담할 금액을 공제하고 환불합니다. 이 경우 회원은 해당
          회사의 조치에 대하여 회사가 정한 절차에 따라 이의 신청을 할 수 있으며
          회사는 정당하다고 확인하는 경우 서비스 이용 재개 등을 할 수 있으며
          이용자가 자신의 고의 과실 없었음을 입증한 한 경우 회사는 서비스를
          정지한 기간만큼 이용 기간을 연장합니다. <br />
          10. 회원의 신청 또는 동의에 따라 월 정기결제 중인 유료서비스의 경우,
          해당 회원이 유료서비스 의 이용요금을 체납하는 경우 연체가 발생한 날
          자동으로 이용권 해지가 될 수 있으므로, 월정기결제를 통한 혜택을
          유지하고자 하는 회원은 이용요금의 체납 또는 결제수단의 연체가 발생하지
          않도록 사전에 조치하여야 합니다.
          <br />
          11. 월 정기결제 유료서비스를 이용 중인 회원이 탈퇴하는 경우 해당
          이용권은 즉시 해지되며, 이 경우 회원의 정보와 마이 페이지의 저장 내용
          등 딸기콩 서비스 이용내용은 관련 법령이 정하는 경우를 제외하고는
          딸기콩 이용약관에 따릅니다. <br />제 19조 (과오금) <br />
          1. 회사는 유료서비스 결제와 관련하여 과오금이 발생한 경우 이용대금의
          결제와 동일한 방법으로 과오금 전액을 환불합니다. 다만, 동일한 방법으로
          환불이 불가능할 때는 이를 사전에 고지합니다. <br />
          2. 회사의 귀책사유로 과오금이 발생한 경우 과오금 전액을 환불합니다.
          단, 회원의 귀책사유로 과오금이 발생한 경우, 회사가 과오금을 환불하는데
          소요되는 비용은 합리적인 범위 내에서 이용 자가 부담하여야 하며, 회사는
          해당 비용을 차감 후 과오금을 환불할 수 있습니다. <br />
          3. 회사는 회원이 요구하는 과오금에 대하여 환불을 거부할 경우, 정당하게
          유료서비스 요금이 부과되었음을 입증할 책임을 부담합니다. <br />
          4. 회사는 과오금의 세부 환불절차 및 기타사항에 대하여 다음과 같이
          콘텐츠 이용자보호지침이 정하는 바에 따릅니다. <br />
          1) 회사나 회원이 과오금의 발생사실을 안 때에는 전화, 이메일 등 회사가
          제시한 방법에 따라 상대방에게 통보 <br />
          2) 회사는 회원에게 환불에 필요한 정보를 요청(회원 성명, 결제증빙서류,
          전화번호, 환불 요청 계좌 등) <br />
          3) 회원은 환불에 필요한 2)의 정보를 회사에 제공 <br />
          4) 회사는 이용자의 정보 제공일로부터 7일 이내 환불 처리 <br />제 20조
          (유료서비스의 정지, 중단) <br />
          1. 회사는 원칙적으로 연중무휴 1일 24시간 유료서비스를 제공합니다.{' '}
          <br />
          2. 회사는 이용자에 대한 서비스 개선을 목적으로 하는 설비 점검 및 보수
          시에는 유료서비스의 전부 또는 일부의 제공을 제한, 중지, 중단할 수
          있습니다. 이 경우 회사는 가능한 한 그 중단사유, 중단 기간 등을 이 약관
          제4조(약관의 효력/변경 등)의 방법을 통하여 사전에 회원에게 공지하며,
          아래 각 호의 불가피한 경우에는 경위와 원인이 확인된 즉시 사후에 공지할
          수 있습니다. <br />
          1) 회원, 기타 불특정 제3자의 불법, 범죄행위로 인하여 기술적으로
          정상적인 서비스의 제공이 어려운 경우 <br />
          2) 시스템 또는 기타 서비스 설비의 장애, 유무선 Network 장애 또는
          유료서비스 이용의 폭주 등 으로 정상적인 유료서비스 제공이 불가능할
          경우 <br />
          3) 기타 천재지변, 국가비상사태, 정전 등 회사가 통제할 수 없는
          불가항력적 사유로 인한 경우 <br />
          3. 회사는 제2항의 각 호에 해당하는 사유가 아닌 회사의 귀책사유로
          서비스의 제공이 중단됨으로 인하여 회원이 입은 손해에 대하여 아래와
          같이 콘텐츠 이용자 보호지침에서 정하는 바에 따라 배상합니다. 다만,
          천재지변 등 불가항력으로 인한 경우는 아래 이용중지 또는 장애발생
          시간에 산입하지 아니합니다. 또한, 각 호를 적용함에 있어 사전고지는
          서비스 중지, 장애시점을 기준으로 24시간 이전에 고지된 것에 한합니다.
          <br />
          1) 딸기콩 무제한 이용권 구독 서비스의 경우: 사업자가 서비스의
          중지•장애에 대하여 사전고지하지 않은 경우에 있어서 이용자의 피해구제
          등은 다음 각호에 의합니다. 다만, 이용자의 책임 있는 사유로 인하여
          서비스가 중지되거나 장애가 발생한 경우 서비스 중지•장애시간에 포함하지
          아니합니다. <br />
          2) 1개월 동안의 서비스 중지•장애발생 누적시간이 72시간을 초과한 경우:
          계약해제 또는 해지 및 미이용기간을 포함한 잔여기간에 대한 이용료 환급
          및 손해배상(단, 사업자가 고의 또는 과실 없음을 입증한 경우
          손해배상책임을 지지 않음) <br />
          3) 사업자의 책임 있는 사유로 인한 서비스 중지 또는 장애의 경우: 서비스
          중지•장애시간의 2배를 무료로 연장 <br />
          4) 불가항력 또는 제3자의 불법행위 등으로 인해 서비스의 중지 또는
          장애가 발생한 경우: 서비스의 중지 또는 장애시간만큼 무료로 이용기간을
          연장 <br />
          사업자가 서비스의 중지•장애에 대하여 사전고지한 경우에 있어서 이용자의
          피해구제 등은 다음 각호에 의합니다. 다만, 서비스 개선을 목적으로 한
          설비 점검 및 보수시 1개월을 기준으로 최대 24시간은 중지•장애 시간에
          포함하지 아니합니다. <br />① 1개월을 기준으로 서비스 중지•장애시간이
          10시간을 초과하는 경우: 10시간과 이를 초과한 시간의 2배의 시간만큼
          이용기간을 무료로 연장 <br />② 1개월을 기준으로 서비스 중지•장애시간이
          10시간을 초과하지 않은 경우: 중지•장애 시간에 해당하는 시간을 무료로
          연장 <br />③ 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의
          정책, 운영상의 긴요한 사유로 수정, 중단, 변경할 수 있으며, 이에 대하여
          관련 법령에 별도 규정이 있지 아니하는 한 별도의 보상을 하지 않습니다.
          <br />제 21조 (회원의 의무, 위반시 회사의 조치 등) <br />
          1. 회원은 회사가 제공하는 유료서비스 이용 시 관계법령, 약관,
          세부이용지침, 서비스 이용안내 및 사이트 내 공지한 주의사항, 회사가
          서비스 이용과 관련하여 회원에게 통지하는 사항 등을 준 수하여야 하며,
          기타 회사 및 타인의 명예를 훼손하거나 서비스 운영 기타 업무수행에
          지장을 초 래하는 행위를 해서는 안됩니다. <br />
          2. 회원은 아이디 및 비밀번호를 관리할 책임이 있으며, 본인이 아닌
          타인이 사용하게 하여서는 안됩니다. 이를 위반하여 회원의 개인정보를
          타인이 사용하여 유료서비스를 이용함으로써 발생한 결과에 대한 책임은
          회원에게 있습니다. 회원은 타인의 명의, 아이디, 비밀번호, 휴대폰번호,
          계좌번호, 신용카드번호 등 개인정보를 도용하거나 부정하게 사용하여서는
          안됩니다. <br />
          3. 회원은 회사가 사전에 허용한 경우를 제외하고는 유료서비스를 영업활동
          등 영리목적으로 이 용하거나 이 약관에서 금지하는 행위를 하거나
          허용하는 범위를 벗어난 이용행위를 하여서는 안 됩니다. <br />
          4. 회원은 유료서비스 이용과정에서 위법행위 또는 선량한 풍속 기타
          사회질서에 반하는 행위를 하여서는 안됩니다. <br />
          5. 회원은 유료서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이
          서비스의 이용 이외의 목적으로 사용하여서는 안됩니다. <br />
          6. 회원은 유료서비스를 구매하여 다운로드 받은 동영상 및 음성 콘텐츠
          등을 사적 이용 범위 내 에서 사용하여야 하고 영리를 목적으로 하는
          영업장, 매장 등에서 재생 등의 방법으로 사용할 수 없습니다. 또한
          영상시청서비스를 녹음하거나 다운로드 받은 동영상 및 음성콘텐츠 등을
          불법적으로 유포, 공유하여서는 아니되며, 이를 위반하여 발생한 제반
          문제에 대한 책임은 회원 본인에게 있습니다. (이 경우, 국내외 제3자의
          저작권 등을 침해하는 행위로서 회사가 IP 접속차단 등 기술적인 조치를
          통하여 타인에 대한 권리 침해 방지 조치를 취하였음에도 불구하고
          이용자가 고의로 또는 회사를 기망하는 수단과 방법을 통하여 딸기콩에
          접속하는 등 제3자의 저작권 등을 침해하는 행위를 포함합니다.) <br />
          7. 회사는 본조 제1항 내지 제6항의 회원의 위반 행위가 있는 경우 해당
          회원에 대하여 위반 사실을 알리고 서비스 제공을 1개월간 정지시킬 수
          있고, 동위반행위가 재발하면 서비스 이용계약을 해제 또는 해지할 수
          있습니다. 본 항 회사의 의사표시는 회원에게 도달한 날로부터 효력이
          발생합니다. 회사의 해제/해지 및 이용 정지에 대하여 회원은 회사가 정한
          절차에 따라 이의 신청 할 수 있습니다. 이 경우 이용자가 자신의 고의,
          과실 없었음을 입증하거나 회원의 이의가 정당하다고 회사가 인정하는 경우
          회사는 계정을 정지한 기간만큼 이용 기간을 연장합니다. <br />
          8. 유료서비스 이용과 관련하여 진실한 정보를 입력하지 않은 회원은
          법적인 보호를 받을 수 없으며, 서비스 이용에 제한을 받을 수 있습니다.{' '}
          <br />
          9. 민법에 따른 미성년회원이 유료서비스 또는 이용권을 이용하고자 하는
          경우, 법정대리인(부모님)의 동의를 얻거나 계약 체결 후 추인을 얻지
          않으면 미성년자 본인 또는 법정대리인이 그 계약을 취소할 수 있습니다.
          만 14세 미만 아동이 서비스를 이용하기 위한 정보 제공 시에는 법정
          대리인의 동의를 받아야 합니다. <br />제 22조 (광고게재) <br />
          1. 딸기콩은 타 어플리케이션에 하이퍼링크(하이퍼링크의 대상에는 문자,
          그림 및 동영상 등이 포함됨) 방식 등에 의해 연결시킬 수 있습니다.{' '}
          <br />
          2. 회사는 회원에게 최상의 딸기콩 서비스를 원활하게 제공하기 위한
          재정기반을 마련하기 위하여 상업용 광고를 화면에 게재하거나 이메일 또는
          DM(서신), 푸시 메시지 등을 이용하여 개별 회원에게 보낼 수 있습니다.
          단, 수신 거절의 의사를 명백히 표시한 회원에 대해서는 더 이상 발송하지
          않습니다. <br />
          3. 회사는 본 딸기콩 서비스를 통환 광고주의 판촉활동에 회원이 직접
          참여함으로써 발생하는 손해에 대하여는 아무런 책임을 부담하지 않습니다.
          <br />제 23조(손해배상) <br />
          1. 회사는 서비스의 결함에 의하여 회사가 제공하는 유료서비스의 내용인
          콘텐츠가 손상, 훼손, 삭제되어 서비스 이용에 손해를 입은 회원에게 해당
          콘텐츠의 복원으로 배상합니다. 회원에게 손 해가 발생한 경우 회사는
          회원에게 실제 발생한 손해 만을 배상합니다. 다만, 회사의 고의 또는 과실
          없이 회원에게 발생한 일체의 손해에 대하여는 책임을 지지 아니합니다.
          회사는 이 약관에서 명시되지 아니한 회사의 귀책사유로 인하여
          유료서비스의 이용 회원에게 손해가 발생한 경우 회 사의 배상 책임과
          관련하여 회사는 '콘텐츠 이용자 보호지침'의 관련 규정 및 기타 상관례를
          따릅니다. <br />
          2. 고객이 이 약관의 이용 제한 관련 각 규정에 근거, 서비스의 이용이
          제한되거나 이용계약이 해지된 경우, 고객이 보유한 모든 디지털 콘텐츠의
          사용권은 상실되며 회사는 해당 디지털 콘텐츠의 구매대금을 반환할 의무를
          부담하지 아니합니다. <br />
          3. 회원이 이 약관 상의 의무를 위반함으로 인하여 회사에 손해가 발생한
          경우 또는 회원이 유료서비스를 이용하면서 회사에 손해를 입힌 경우,
          회원은 회사에 그 손해를 배상하여야 합니다. <br />제 24조 (면책) <br />
          1. 회사는 다음 각 호의 사유로 인하여 회원 또는 제삼자에게 발생한
          손해에 대하여는 그 책임을 지지 아니합니다. <br />
          1) 천재지변 또는 이에 따르는 불가항력으로 인해 유료서비스를 제공할 수
          없는 경우 <br />
          2) 회원이 자신의 아이디 또는 비밀번호 등의 관리를 소홀히 한 경우{' '}
          <br />
          3) 회사의 관리 영역이 아닌 공중통신선로의 장애로 서비스이용이 불가능한
          경우 <br />
          4) 기타 회사의 귀책사유가 없는 통신서비스 등의 장애로 인한 경우 <br />
          2. 회사는 회원이 유료서비스를 이용하여 기대하는 이익을 얻지 못하거나
          상실한 것, 서비스에 게시된 게시물에 대한 취사선택 또는 이용으로
          발생하는 손해 등에 대해서는 책임을 지지 않습니다. <br />
          3. 회원이 화면에 게재한 리뷰, 평점, 정보, 자료 등의 내용에 관한 신뢰도
          또는 정확성 등 내용에 대하여는 해당 회원이 책임을 부담하며, 회사는
          내용의 부정확 또는 허위로 인해 회원 또는 제 3자에게 발생한 손해에
          대하여는 아무런 책임을 부담하지 않습니다. <br />
          4. 회사는 회원 상호 간 또는 회원과 제3자 상호간에 유료서비스와
          관련하여 발생한 분쟁에 대하여 개입할 의무가 없으며, 회사에 귀책사유가
          없는 한 이로 인하여 발생한 손해를 배상할 책임이 없습니다. <br />제
          25조 (분쟁의 해결) <br />
          1. 회사는 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를
          보상처리하기 위하여 피해보상처리기구인 고객 상담실(1577-1500)을
          운영합니다. <br />
          2. 유료서비스 이용과 관련하여 회사와 회원 사이에 분쟁이 발생한 경우,
          회사와 회원은 분쟁의 해결을 위해 성실히 협의하고, 협의가 안 될 경우
          콘텐츠산업진흥법상 콘텐츠 분쟁 조정 위원회에 분쟁조정을 신청할 수
          있습니다. <br />
          3. 전항에 따라 분쟁이 해결되지 않을 경우 양 당사자는 소를 제기할 수
          있으며 회사와 회원 간의 소의 담당은 서울중앙지방법원 또는 대한민국의
          민사소송법에 따른 법원을 관할법원으로 합니다. <br />
          4. 회사와 회원간의 전자상거래 소송에는 대한민국법을 적용합니다.
          <br />
          [시행일자] (시행일) 본 약관은 2021년 03월 01일부터 적용됩니다.
        </p>
      </div>
    </MainLayout>
  );
};

export default Terms;