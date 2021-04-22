// @flow

import React, { memo, useState, useEffect, useCallback } from 'react';
import MainLayout from 'layout/MainLayout';
import ROUTERS from 'constants/router';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import Loading from 'components/Loading';
import { toDoHideMusicPlayer } from '../../../utils/Helpers';

type Props = {
  settingInterest: Function,
  getAgeCategory: Function,
  ageCategory: Array<{
    id: number,
    ageFrom: number,
    ageTo: number,
    ageGroup: string,
  }>,
  getSubjectCategory: Function,
  subjectCategory: Array<{
    id: number,
    image: any,
    subject: string,
  }>,
  isProcessing: boolean,
  resetType: Function,
  history: {
    push: Function,
  },
  typeSettingCategory: string,
  resetData: Function,
};

const SettingInterest = ({
  settingInterest,
  getAgeCategory,
  ageCategory,
  getSubjectCategory,
  subjectCategory,
  isProcessing,
  resetType,
  history,
  typeSettingCategory,
  resetData,
}: Props) => {
  const defaultOptionSetting = {
    infoCategory: [],
    infoAge: '',
  };
  const [categoryOption, setCategoryOption] = useState(
    defaultOptionSetting?.infoCategory
  );
  const [ageOption, setAgeOption] = useState(defaultOptionSetting?.infoAge);

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

  useEffect(() => {
    if (typeSettingCategory === 'SETTING_CONTENT_USER_SUCCESS') {
      history.push(ROUTERS.MAIN);
      resetType();
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetType, typeSettingCategory]);

  // call api get age category
  const getListAgeCategory = useCallback(() => {
    getAgeCategory();
  }, [getAgeCategory]);

  useEffect(() => {
    getListAgeCategory();
  }, [getListAgeCategory]);

  // call api get subject category
  const getListSubjectCategory = useCallback(() => {
    getSubjectCategory();
  }, [getSubjectCategory]);

  useEffect(() => {
    getListSubjectCategory();
  }, [getListSubjectCategory]);

  const renderAge = (e) => {
    switch (e?.ageFrom) {
      case 1:
        return <img src={IMAGES.iconAge} alt="" />;
      case 4:
        return <img src={IMAGES.iconAge2} alt="" />;
      case 7:
        return <img src={IMAGES.iconAge3} alt="" />;
      case 10:
        return <img src={IMAGES.iconAge4} alt="" />;
      default:
        break;
    }
    return null;
  };

  // handle change when choose category
  const handleChangeOption = (name, value) => {
    let listDataCategory = [];
    switch (name) {
      case 'age':
        setAgeOption(value);
        break;
      case 'category':
        if (categoryOption.length > 0 && categoryOption.includes(value)) {
          listDataCategory = categoryOption.filter((item) => item !== value);
        } else if (!categoryOption.includes(value)) {
          listDataCategory = [...categoryOption, value];
        } else {
          listDataCategory = categoryOption;
        }
        setCategoryOption(listDataCategory);
        break;
      default:
        break;
    }
  };

  // render list age options
  const AgeOptions =
    ageCategory &&
    ageCategory.map((item) => {
      return (
        <div
          className={`settingInterest__chooseAge__box ${
            ageOption === item.id ? 'active' : ''
          }`}
          key={item.id}
          onClick={() => handleChangeOption('age', item.id)}
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
        >
          {renderAge(item)}
          <p className="settingInterest__chooseAge__box__category">
            {item?.ageGroup ? item?.ageGroup : '전체'}
          </p>
          <p className="settingInterest__chooseAge__box__value">
            {`${item.ageFrom}~${item.ageTo}세`}
          </p>
        </div>
      );
    });

  // render list category options
  const categoryOptions =
    subjectCategory &&
    subjectCategory.map((item) => {
      const idActive = categoryOption.filter((items) => items === item?.id);
      return (
        <div
          className={`settingInterest__chooseInterest__list__box ${
            idActive && idActive[0] === item?.id ? 'active' : ''
          }`}
          key={item?.id}
          onClick={() => handleChangeOption('category', item?.id)}
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
        >
          <div className="settingInterest__chooseInterest__list__box__shadow" />
          <img src={item?.image} alt="" />
          <p>{item?.subject}</p>
        </div>
      );
    });

  // handle setting Interest
  const handleSetting = () => {
    settingInterest({
      subjectIds: categoryOption,
      ageId: ageOption,
    });
  };

  return (
    <MainLayout customClass="" titleHeader="맞춤 콘텐츠 설정" isShowHeader>
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="settingInterest">
          <div className="settingInterest__top">
            <h2>연령</h2>
            <p>아이의 연령을 선택하세요.</p>
          </div>
          <div className="settingInterest__chooseAge">{AgeOptions}</div>
          <div className="settingInterest__chooseInterest">
            <h2 className="settingInterest__chooseInterest__title">
              관심 분야
            </h2>
            <p className="settingInterest__chooseInterest__subTitle">
              아이의 관심 분야를 선택하세요.(중복 가능)
            </p>
            <div className="settingInterest__chooseInterest__list">
              {categoryOptions}
            </div>
          </div>
          <div className="settingInterest__buttonComplete">
            <Button
              customClass="button--primary"
              onClick={handleSetting}
              isDisabled={categoryOption?.length === 0 || ageOption === ''}
            >
              완료
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default memo<Props>(SettingInterest);
