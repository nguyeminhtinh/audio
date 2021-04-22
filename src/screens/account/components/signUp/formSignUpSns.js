// @flow

import React, { useState, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import { listCheckbox } from 'constants/listKey';
import Modal from 'components/Modal';
import ROUTERS from 'constants/router';
import queryString from 'query-string';
import Loading from 'components/Loading';
import REGEX from 'constants/regex';
import { getDataInputName } from 'helpers/getDataInput';
import { Validator } from '../../../../utils/Validator';
import { API } from '../../../../utils/Apis';
import {
  isNumberKey,
  setJwtToken,
  toDoHideMusicPlayer,
} from '../../../../utils/Helpers';
import Step1 from './Step1';
import Step2 from './Step2';

type Props = {
  type: string,
  resetData: Function,
  seqNo: string,
  history: {
    push: Function,
    go: Function,
  },
  codeSignIn: number,
  checkUserAccess: Function,
  typeCheckUser: string,
  token: string,
  code: number,
  isProcessing: boolean,
  signInNaver: Function,
  signInApple: Function,
  signInKakao: Function,
};

const FormSignUp = ({
  type,
  resetData,
  seqNo,
  codeSignIn,
  checkUserAccess,
  typeCheckUser,
  token,
  history,
  code,
  isProcessing,
  signInNaver,
  signInApple,
  signInKakao,
}: Props) => {
  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      toDoHideMusicPlayer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const paramsSns = queryString.parse(window.location.search);
  const [checkedItems, setCheckedItems] = useState({});
  const [step, setStep] = useState(1);
  const [error, setError] = useState({});
  const [listId, setListId] = useState([]);
  const [isShow, setIsShow] = useState({
    isOpen: false,
    content: '',
  });

  const [dataSignUp, setDataSignUp] = useState({
    name: paramsSns?.name,
    email: paramsSns?.email,
    password: '',
    passwordConfirm: '',
    birthDay:
      (paramsSns && paramsSns.birth && paramsSns.birth.replace(/-/g, '')) || '',
    phone: '',
  });
  const convertBase64 = seqNo && window.atob(seqNo);
  const seqNoId = convertBase64 && convertBase64.replace('seqNo=', '');
  // const myRef = useRef(null);

  useEffect(() => {
    if (type === 'SIGN_IN_NAVER_SUCCESS' && codeSignIn === 201) {
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    if (type === 'SIGN_IN_KAKAO_SUCCESS' && codeSignIn === 201) {
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    if (type === 'SIGN_IN_APPLE_SUCCESS' && codeSignIn === 201) {
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, codeSignIn, seqNoId]);

  useEffect(() => {
    if (code === 201 && typeCheckUser === 'CHECK_USER_ACCESS_SUCCESS') {
      API.setHeader('Authorization', `${token}`);
      const data = { token };
      setJwtToken(JSON.stringify(data));
      history.push(ROUTERS.SETTING_INTEREST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, token, typeCheckUser]);

  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  const handleChangeInput = (value, name) => {
    setDataSignUp({
      ...dataSignUp,
      [name]: value,
    });
  };

  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes([...id][0])) {
      dataSubmit = listId.filter((items) => items !== [...id][0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
  };

  const checkStep = (idStep) => {
    if (idStep === 1) {
      setStep(2);
    }
    if (idStep === 2) {
      setStep(3);
    }
  };
  const renderList = () => {
    return listCheckbox.map((item) => (
      <li className="terms-condition__item" key={item.id}>
        <Checkbox
          name={item.id}
          onChange={(e) => {
            handleChange(e);
            handleCheckBox([item?.id]);
          }}
          checked={!!listId.includes(item?.id)}
          customClass="terms-condition__item__label"
          key={item.id}
          label={item.label}
          // request={item.id !== 3}
          content={item.content}
          onStep={() => checkStep(item.id)}
        />
      </li>
    ));
  };

  const handleSelectAll = () => {
    let updateListItemAll = [];
    updateListItemAll =
      listCheckbox &&
      listCheckbox.map((item) => {
        return item.id;
      });
    if (listId && listId.length === 3) {
      setListId([]);
    } else {
      setListId(updateListItemAll);
    }
  };

  const listTerms = listId.filter((items) => items !== 3);
  const handleSubmit = () => {
    if (paramsSns.type === 'naver') {
      if (listTerms.length > 0 && dataSignUp?.phone?.length >= 10) {
        signInNaver({
          birth: dataSignUp.birthDay,
          email: dataSignUp.email,
          imgPath: '',
          isBookClub: 'N',
          isSns: 'Y',
          name: dataSignUp.name,
          onlyWifi: 'N',
          password: '',
          phone: dataSignUp.phone,
          pushable: 'Y',
          role: 'GUEST',
          roleKey: '',
          termsPolicy: listTerms && listTerms.indexOf(1) === 0 ? 'Y' : 'N',
          privacyPolicy: listTerms && listTerms.indexOf(2) === 0 ? 'Y' : 'N',
          eventPolicy: 'N',
        });
      }
    }
    if (paramsSns.type === 'kakao') {
      if (listTerms.length > 0 && dataSignUp?.phone?.length >= 10) {
        signInKakao({
          birth: dataSignUp.birthDay,
          email: dataSignUp.email,
          imgPath: '',
          isBookClub: 'N',
          isSns: 'Y',
          name: dataSignUp.name,
          onlyWifi: 'N',
          password: '',
          phone: dataSignUp.phone,
          pushable: 'Y',
          role: 'GUEST',
          roleKey: '',
          termsPolicy: listTerms && listTerms.indexOf(1) === 0 ? 'Y' : 'N',
          privacyPolicy: listTerms && listTerms.indexOf(2) === 0 ? 'Y' : 'N',
          eventPolicy: 'N',
        });
      }
    }
    let validation: {
      email?: string,
    } = {};
    const ruleSignUp = {
      email: ['email'],
    };
    const objSubmit = {
      email: dataSignUp.email,
    };
    validation = Validator(objSubmit, ruleSignUp);
    if (Object.keys(validation).length > 0) {
      setError(validation);
      window.scrollTo(0, 0);
      return validation;
    }
    setError({});
    if (paramsSns.type === 'apple') {
      if (listTerms.length > 0) {
        signInApple({
          birth: dataSignUp.birthDay,
          email: dataSignUp.email,
          imgPath: '',
          isBookClub: 'N',
          isSns: 'Y',
          name: dataSignUp.name,
          onlyWifi: 'N',
          password: '',
          phone: dataSignUp.phone,
          pushable: 'Y',
          role: 'GUEST',
          roleKey: '',
          termsPolicy: listTerms && listTerms.indexOf(1) === 0 ? 'Y' : 'N',
          privacyPolicy: listTerms && listTerms.indexOf(2) === 0 ? 'Y' : 'N',
          eventPolicy: 'N',
          socialId: paramsSns?.socialId,
        });
      }
    }
    return validation;
  };

  const handleCheckBack = () => {
    if (step === 2 || step === 3) {
      setStep(1);
    } else {
      history.go(-1);
    }
  };

  const renderTitlePage = (item) => {
    let titlePage = '';
    switch (item) {
      case 1:
        titlePage = '이메일 간편 가입';
        break;
      case 2:
        titlePage = '이용약관';
        break;
      case 3:
        titlePage = '개인정보 처리방침';
        break;
      default:
        break;
    }
    return titlePage;
  };
  return (
    <MainLayout
      customClass=""
      titleHeader={renderTitlePage(step)}
      isShowHeader
      isLink={step === 2 || step === 3}
      isShowIconBackFunction={step === 2 || step === 3}
      iconBackFunction={handleCheckBack}
    >
      {isProcessing ? (
        <Loading />
      ) : (
        <>
          {step === 1 && (
            <div className="form-signup-page">
              <Input
                placeholder="이름을 입력해주세요."
                type="text"
                label="이름"
                value={getDataInputName(dataSignUp?.name)}
                maxLength="6"
                request
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'name');
                }}
              />

              <Input
                placeholder="이메일을 입력해주세요."
                type="text"
                label="이메일"
                maxLength={dataSignUp?.email}
                value={dataSignUp && dataSignUp.email}
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'email');
                }}
                errorMsg={!REGEX.EMAIL.test(dataSignUp.email) && error.email}
              />
              <Input
                placeholder="비밀번호 입력 조건 20자리 까지 입력 가능"
                type="password"
                label="비밀번호"
                value={dataSignUp.password}
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'password');
                }}
                disabled
                customClass="signup-password"
                // innerRef={myRef}
              />
              <Input
                placeholder="비밀번호 확인"
                type="password"
                label="비밀번호 확인"
                value={dataSignUp.passwordConfirm}
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'passwordConfirm');
                }}
                disabled
                request
              />
              <Input
                placeholder="생년월일 숫자 8자리 (예- 19990303)"
                type="text"
                label="생년월일"
                value={dataSignUp.birthDay}
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'birthDay');
                }}
                pattern="[0-9]*"
                onKeyPress={(e) => isNumberKey(e)}
                inputMode="numeric"
                maxLength="8"
                disabled={paramsSns.type !== 'apple'}
              />
              <Input
                placeholder="전화번호(10~11자리)"
                type="text"
                label="전화번호"
                value={dataSignUp.phone}
                onChange={(e) => {
                  handleChangeInput(e.target.value, 'phone');
                }}
                pattern="[0-9]*"
                onKeyPress={(e) => isNumberKey(e)}
                inputMode="numeric"
                maxLength="11"
              />
              <h2>약관 동의</h2>
              <div className="terms-condition__wrapper">
                <div className="terms-condition__checkbox">
                  <Checkbox
                    name="checkAll"
                    label="전체 약관에 동의합니다."
                    onChange={handleSelectAll}
                    checked={listId.length === 3}
                    customClass="terms-condition__item__label"
                    content=""
                    onStep={() => {}}
                  />
                </div>
                <p>
                  필수 항목 및 콘텐츠 이벤트 정보 수신(선택)에 전체 동의합니다.
                </p>
                <ul>{renderList()}</ul>
              </div>
              <Button
                customClass="btn-submit"
                onClick={handleSubmit}
                isDisabled={
                  dataSignUp.name.length < 2 ||
                  listTerms.length < 2 ||
                  (dataSignUp?.phone?.length >= 1 &&
                    dataSignUp?.phone?.length < 10)
                }
              >
                <p>가입하기</p>
              </Button>
            </div>
          )}
        </>
      )}

      {step === 2 && <Step1 />}
      {step === 3 && <Step2 />}
      <Modal
        isOpen={isShow.isOpen}
        isShowFooter
        handleClose={() => {
          setIsShow({
            ...isShow,
            isOpen: false,
          });
          resetData();
        }}
        handleSubmit={() => {
          setIsShow({
            ...isShow,
            isOpen: false,
          });
          resetData();
        }}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">{isShow.content}</div>
      </Modal>
    </MainLayout>
  );
};

export default FormSignUp;
