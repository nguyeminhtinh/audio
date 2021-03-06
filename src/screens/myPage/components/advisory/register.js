// @flow

import React, { useState, useRef, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import { listOptionAdvisory } from 'constants/listDataCategory';
import SelectDropdown from 'components/Select';
import Input from 'components/Input';
import Loading from 'components/Loading';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import ERROR_MESSAGE from 'constants/errorMsg';
import ModalPopup from 'components/Modal';

type Props = {
  consultationSave: Function,
  typeAction: string,
  isProcessing: boolean,
  statusCode: number,
  saveFile: Function,
  qnaId: number,
};

const RegisterAdvisory = ({
  consultationSave,
  typeAction,
  isProcessing,
  statusCode,
  saveFile,
  qnaId,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    type: null,
    title: '',
    content: '',
  });
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [objFile, setObjFile] = useState(null);
  const inputFile = useRef({});
  const [modalValidate, setModalValidate] = useState({
    isOpen: false,
    content: '',
  });
  const [isShowConfirmBack, setIsShowConfirmBack] = useState(false);
  const [isShowModalSusses, setIsShowModalSusses] = useState(false);

  useEffect(() => {
    if (dataSubmit.title) {
      switch (typeAction) {
        case 'CONSULTATION_SAVE_SUCCESS':
          if (statusCode === 200) {
            if (file !== '') {
              const formData = new window.FormData();
              formData.append('file', objFile);
              saveFile(qnaId, formData);
            }
            setIsShowModalSusses(true);
          } else {
            setModalValidate({
              ...modalValidate,
              isOpen: true,
              content: ERROR_MESSAGE.REGISTER_FAILED,
            });
          }
          break;
        case 'CONSULTATION_SAVE_FAILED':
          setModalValidate({
            ...modalValidate,
            isOpen: true,
            content: ERROR_MESSAGE.REGISTER_FAILED,
          });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [typeAction, statusCode]);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const fileToBase64 = (inputFileName) => {
    const fileNames = inputFileName.files[0];
    if (fileNames === undefined) return null;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event && (event.target: window.HTMLInputElement).result);
      };
      reader.readAsDataURL(fileNames);
    });
  };

  const getFileName = async (e) => {
    const image = await fileToBase64(e);
    setObjFile(e.files[0]);
    if (e.files[0]?.size > 5242880) {
      setModalValidate({
        ...modalValidate,
        isOpen: true,
        content:
          '5MB????????? ????????? ??????(JPG,PNG,GIF) \n 1??? ?????? ?????? ??? ????????????.',
      });
    } else {
      setFile(image);
      setFileName(e.files[0].name);
    }
  };

  const handleChange = (value, name) => {
    // window.scrollTo(0, 0);
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleDeleteImage = () => {
    setFile('');
  };

  const handleSubmit = () => {
    if (!dataSubmit.content.trim() || !dataSubmit.title.trim()) {
      setModalValidate({
        isOpen: true,
        content: ERROR_MESSAGE.FIELD_REQUIRED,
      });
      return;
    }
    if (file !== '') {
      consultationSave({
        tbQnaTypeId: dataSubmit.type && dataSubmit.type.value,
        qnaId: 0,
        title: dataSubmit.title.trim(),
        content: dataSubmit.content.trim(),
        fileName,
      });
    } else {
      consultationSave({
        tbQnaTypeId: dataSubmit.type && dataSubmit.type.value,
        qnaId: 0,
        title: dataSubmit.title.trim(),
        content: dataSubmit.content.trim(),
        fileName: '',
      });
    }
  };

  // check back function
  const handleCheckBack = () => {
    if (
      dataSubmit.title.trim() !== '' ||
      dataSubmit.content.trim() !== '' ||
      dataSubmit.type !== null ||
      file !== ''
    ) {
      setIsShowConfirmBack(true);
    } else {
      window.history.go(-1);
    }
  };

  const handelBack = () => {
    window.history.go(-1);
    setIsShowModalSusses(false);
  };
  return (
    <MainLayout
      customClass=""
      titleHeader="1:1 ??????"
      isShowHeader
      isLink
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="page-advisory__register">
          <div className="page-advisory__register__form">
            <h2 className="page-advisory__register__form__title">????????????</h2>
            <SelectDropdown
              placeholder="?????? ?????? ??????"
              listItem={listOptionAdvisory}
              onChange={(e) => {
                handleChange(e, 'type');
              }}
              option={dataSubmit.type}
            />
            <Input
              placeholder="????????? ????????? ?????????."
              type="text"
              value={dataSubmit.title}
              onChange={(e) => {
                handleChange(e.target.value, 'title');
              }}
              maxLength="20"
            />
            <textarea
              placeholder="?????? ????????? ????????? ?????????."
              name="contents"
              rows="7"
              value={dataSubmit.content}
              onChange={(e) => {
                handleChange(e.target.value, 'content');
              }}
            />
            <div className="d-flex align-items-center group-btn-upload">
              <Button customClass="btn-upload" onClick={onButtonClick}>
                <p>?????? ??????</p>
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  ref={inputFile}
                  accept="image/jpg, image/png, image/gif, capture=camera"
                  onChange={(e) => getFileName(e.target)}
                />
              </Button>
              <p className="page-advisory__register__form__note">
                5MB ????????? ????????? ??????(JPG, PNG, GIF) 1??? ???????????? ??? ????????????.
              </p>
            </div>
            {file && (
              <div className="page-advisory__register__form__imgUpload">
                <img
                  src={IMAGES.btn_delete}
                  alt=""
                  className="page-advisory__register__form__imgUpload--delete"
                  onClick={handleDeleteImage}
                  role="presentation"
                />
                <img src={file} alt="" />
              </div>
            )}
          </div>
          <Button
            customClass="page-advisory__register__form__btn-submit"
            onClick={handleSubmit}
          >
            <p>????????????</p>
          </Button>
        </div>
      )}
      <ModalPopup
        isOpen={modalValidate.isOpen}
        isShowFooter
        handleClose={() =>
          setModalValidate({ ...modalValidate, isOpen: false })
        }
        handleSubmit={() =>
          setModalValidate({ ...modalValidate, isOpen: false })
        }
        customClassButton="w-100 buttonConfirm"
        textBtnRight="??????"
        isShowHeader
        title="??????"
      >
        <div className="title-content">{modalValidate.content}</div>
      </ModalPopup>
      {/* Modal confirm handle click back */}
      <ModalPopup
        isOpen={isShowConfirmBack}
        isShowFooter
        handleClose={() => setIsShowConfirmBack(false)}
        handleSubmit={() => window.history.go(-1)}
        customClassButton="w-100"
        classNameBtnRight="btn-right"
        classNameBtnLeft="btn-left"
        textBtnRight="??????"
        textBtnLeft="??????"
        isShowHeader
        title="??????"
        isShowTwoBtn
      >
        <div className="title-content">
          1:1 ????????? ?????????????????????????
          <br />
          ?????? ?????? ?????? ???????????????.
        </div>
      </ModalPopup>
      {/* Modal register success */}
      <ModalPopup
        isOpen={isShowModalSusses}
        isShowFooter
        handleClose={() => handelBack()}
        handleSubmit={() => handelBack()}
        customClassButton="w-100"
        textBtnRight="??????"
        isShowHeader
        title="??????"
      >
        <div className="title-content">
          ?????????????????????.
          <br />
          ???????????? ????????? ????????? ???????????????
          <br />
          ???????????? ??? ????????????.
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(RegisterAdvisory);
