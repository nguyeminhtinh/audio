// import libs
import { all } from 'redux-saga/effects';

// get list age category
import getAgeCategorySaga from 'screens/settingInterest/sagas/getListAgeCategorySaga';
// get list subject category
import getSubjectCategorySaga from 'screens/settingInterest/sagas/getListSubjectCategorySaga';
// setting user
import settingUserSaga from 'screens/settingInterest/sagas/settingUserSaga';
// check user access
import checkUserAccessSaga from 'screens/settingInterest/sagas/checkUserAccessSaga';
// get data best friends
import getDataBestFriendsSaga from 'screens/main/sagas/getDataBestFriendSaga';
// get data detail audio book
import getDataDetailAudioBookSaga from 'screens/playBook/sagas/getDataAudioBookDetailSaga';
// get data audio book series
import getAudioBookSeriesSaga from 'screens/playBook/sagas/getAudioBookSeriesSaga';
// save consultation
import consultationSaveSaga from 'screens/myPage/sagas/consultationSaveSaga';
// Get list consultation
import getListConsultationSaga from 'screens/myPage/sagas/consultationSaga';
// Get Detail consultation
import getDetailConsultationSaga from 'screens/myPage/sagas/getsultationDetailSaga';

// get data main
import getDataMainSaga from 'screens/main/sagas/getDataMainSaga';
// get data search auto complete
import getKeySearchAutoCompleteSaga from 'screens/search/sagas/searchAutoCompleteSaga';
// get data search detail
import getDataSearchDetailSaga from 'screens/search/sagas/searchDetailSaga';
// get data condition
import getConditionSaga from 'screens/search/sagas/getConditionSaga';
// search category
import searchCategory from 'screens/search/sagas/searchCategorySaga';
// get data theme dj
import getDataThemeDj from 'screens/main/sagas/getDataThemeDjSaga';
// get data theme month detail
import getDataThemeMonthDetail from 'screens/main/sagas/getDataThemeMonthDetailSaga';
// get data theme month
import getDataThemeMonth from 'screens/main/sagas/getDataThemeMonthSaga';
// get data theme character detail
import getDataThemeCharacterDetail from 'screens/main/sagas/getDataCharacterDetailSaga';
// get data theme school
import getDataThemeSchool from 'screens/main/sagas/getDataThemeSchoolSaga';
// get data theme like this
import getDataThemeLikeThis from 'screens/main/sagas/getDataThemeLikeThisSaga';
// get announcement history
import getAnnouncementHistory from 'screens/myPage/sagas/getAnnouncementHistorySaga';
// get announcement detail
import getAnnouncementDetail from 'screens/myPage/sagas/getAnnouncementDetailSaga';
// get list user my
import getListMyUser from 'screens/my/sagas/getListDataMySaga';

import deleteConsultationSaga from 'screens/myPage/sagas/deleteConsultationSaga';
// get category setting
import getCategorySettingSaga from 'screens/myPage/sagas/getCategorySettingSaga';
// get setting content user
import settingContentUserSaga from 'screens/myPage/sagas/settingContentSaga';
// search keyword detail
import searchKeywordDetail from 'screens/search/sagas/searchKeywordDetailSaga';
// set status play
import setStatusPlay from 'screens/playBook/sagas/setStatusPlaySaga';
// like player
import likePlayerSaga from 'screens/playBook/sagas/likePlayerSaga';
// save file
import saveFileSaga from 'screens/myPage/sagas/saveFileSaga';
// get information user
import getInformationUserSaga from 'screens/my/sagas/getInformationUserSaga';
// update avatar user
import updateAvatarSaga from 'screens/my/sagas/updateAvatarSaga';
// get content video
import getContentVideoSaga from 'screens/playBook/sagas/getContentVideoSaga';
// check play
import checkPlaySaga from 'screens/playBook/sagas/checkPlaySaga';
// save history banner
import saveHistoryBannerSaga from 'screens/myPage/sagas/saveHistoryBannerSaga';
// get list library
import getLibrarySaga from 'screens/search/sagas/getLibrarySaga';
// get list library detail
import getLibraryDetailSaga from 'screens/search/sagas/getListLibraryDetailSaga';
// 2st
import signUpSaga from 'screens/account/sagas/signUpSaga';
// sign in
import signInSaga from 'screens/account/sagas/signInSaga';
// check email
import checkEmailSaga from 'screens/account/sagas/checkEmailSaga';
// get list review
import getListReviewSaga from 'screens/playBook/sagas/getListReviewSaga';
// save review
import saveReviewSaga from 'screens/playBook/sagas/saveReviewSaga';
// get list type report
import getListTypeReportSaga from 'screens/playBook/sagas/getListTypeReportSaga';
// save report
import saveReportSaga from 'screens/playBook/sagas/saveReportSaga';
// get list subject
import getListSubjectSaga from 'screens/record/sagas/getListSubjectSaga';
// get list detail play studio
import getListPlayStudioSaga from 'screens/record/sagas/getListPlayStudioSaga';
// get list record
import getListRecordSaga from 'screens/record/sagas/getListRecordSaga';
// get list studio month
import getListStudioMonthSaga from 'screens/record/sagas/getListStudioMonthSaga';
// get list studio challenge
import getListStudioChallengeSaga from 'screens/record/sagas/getListStudioChallengeSaga';

import getListPlayStudioDetailSaga from 'screens/record/sagas/getListPlayStudioDetailSaga';
// get list data record user
import getListRecordUserSaga from 'screens/my/sagas/getListRecordUserSaga';
// update studio
import updateStudioSaga from 'screens/my/sagas/updateStudioSaga';
// delete studio
import deleteStudioSaga from 'screens/my/sagas/deleteStudioSaga';
// signIn Facebook
import signInFacebookSaga from 'screens/account/sagas/signInFacebookSaga';
// signIn kakao
import signInKakaoSaga from 'screens/account/sagas/signInKakaoSaga';
// signIn naver
import signInNaverSaga from 'screens/account/sagas/signInNaverSaga';
import likeStudioSaga from 'screens/record/sagas/likeStudioSaga';
// get detail play studio
import getDetailPlayStudioSaga from 'screens/record/sagas/getDetailPlayStudioSaga';
// get list review studio
import getListReviewStudioSaga from 'screens/record/sagas/getListReviewStudioSaga';
// get save review studio
import saveReviewStudioSaga from 'screens/record/sagas/saveReviewStudioSaga';
// get delete review studio
import deleteReviewStudioSaga from 'screens/record/sagas/deleteReviewStudioSaga';
import deleteReviewSaga from 'screens/playBook/sagas/deleteReviewSaga';
// get list playlist group
import getListPlaylistSaga from 'screens/my/sagas/getListPlaylistSaga';
// handle push information
import handlePushSaga from 'screens/myPage/sagas/onPushSettingSaga';
// getListFilterStudio
import getListFilterStudioSaga from 'screens/record/sagas/getListFilterStudioSaga';
// update phone user
import updatePhoneSaga from 'screens/myPage/sagas/updatePhoneSaga';
// update password user
import updatePasswordSaga from 'screens/myPage/sagas/updatePasswordSaga';
// get detail record studio
import getDetailRecordStudioSaga from 'screens/record/sagas/getDetailRecordStudioSaga';
// set wi fi
import settingWiFiSaga from 'screens/myPage/sagas/settingWifiSaga';
// get list series studio
import getListSeriesStudioSaga from 'screens/record/sagas/getListSeriesStudioSaga';
// like detail studio
import likeDetailStudioSaga from 'screens/record/sagas/likeDetailStudioSaga';
// update play saga
import updatePlayGroupSaga from 'screens/my/sagas/updataPlayGroupsSaga';
// find password
import findPasswordSaga from 'screens/account/sagas/findPasswordSaga';
// payment validate saga
import paymentValidateSaga from 'screens/main/sagas/paymentValidateSaga';
// register coupon saga
import registerCouponSaga from 'screens/myPage/sagas/registerCouponSaga';
import deleteGroupStudioSaga from 'screens/my/sagas/deleteGroupStudioSaga';
import getDataThemeDefaultSaga from 'screens/main/sagas/getDataThemeDefaultSaga';
import getDataThemeBannerSaga from 'screens/main/sagas/getDataThemeBannerSaga';
import getDataSlideTodaySaga from 'screens/main/sagas/getDataSlideTodaySaga';
import checkAudioPlayerValidSaga from 'screens/playBook/sagas/checkAudioPlayerValidSaga';
import setStatusPlayRecordSaga from 'screens/record/sagas/saveStatusPlayRecordSaga';
import signInAppleSaga from 'screens/account/sagas/signInAppleSaga';
import checkUserSnsLoginSaga from 'screens/account/sagas/checkUserSnsLoginSaga';
// register history page
import registerHistoryPageSaga from 'screens/myPage/sagas/registerHistoryPageSaga';
import saveHistorySearchSaga from 'screens/search/sagas/saveHistorySearchSaga';
import saveHistorySearchDetailSaga from 'screens/search/sagas/saveHistorySearchDetailSaga';

export default function* RootSagas() {
  yield all([
    getAgeCategorySaga(),
    getSubjectCategorySaga(),
    settingUserSaga(),
    checkUserAccessSaga(),
    getDataBestFriendsSaga(),
    getDataDetailAudioBookSaga(),
    getAudioBookSeriesSaga(),
    getKeySearchAutoCompleteSaga(),
    consultationSaveSaga(),
    getDataMainSaga(),
    getDataSearchDetailSaga(),
    getConditionSaga(),
    searchCategory(),
    getListConsultationSaga(),
    getDetailConsultationSaga(),
    getDataThemeDj(),
    getDataThemeMonthDetail(),
    getDataThemeMonth(),
    getDataThemeCharacterDetail(),
    getDataThemeSchool(),
    getDataThemeLikeThis(),
    getAnnouncementHistory(),
    getAnnouncementDetail(),
    getListMyUser(),
    deleteConsultationSaga(),
    getCategorySettingSaga(),
    settingContentUserSaga(),
    searchKeywordDetail(),
    setStatusPlay(),
    likePlayerSaga(),
    saveFileSaga(),
    getInformationUserSaga(),
    updateAvatarSaga(),
    getContentVideoSaga(),
    checkPlaySaga(),
    saveHistoryBannerSaga(),
    signUpSaga(),
    checkEmailSaga(),
    signInSaga(),
    getLibrarySaga(),
    getLibraryDetailSaga(),
    getListReviewSaga(),
    saveReviewSaga(),
    getListTypeReportSaga(),
    saveReportSaga(),
    getListSubjectSaga(),
    getListPlayStudioSaga(),
    getListPlayStudioDetailSaga(),
    getListRecordSaga(),
    getListStudioMonthSaga(),
    getListStudioChallengeSaga(),
    getListRecordUserSaga(),
    updateStudioSaga(),
    deleteStudioSaga(),
    signInFacebookSaga(),
    signInKakaoSaga(),
    signInNaverSaga(),
    signInAppleSaga(),
    likeStudioSaga(),
    getDetailPlayStudioSaga(),
    getListReviewStudioSaga(),
    saveReviewStudioSaga(),
    deleteReviewStudioSaga(),
    deleteReviewSaga(),
    getListPlaylistSaga(),
    handlePushSaga(),
    getListFilterStudioSaga(),
    updatePhoneSaga(),
    updatePasswordSaga(),
    getDetailRecordStudioSaga(),
    settingWiFiSaga(),
    getListSeriesStudioSaga(),
    likeDetailStudioSaga(),
    updatePlayGroupSaga(),
    findPasswordSaga(),
    paymentValidateSaga(),
    registerCouponSaga(),
    deleteGroupStudioSaga(),
    getDataThemeDefaultSaga(),
    getDataThemeBannerSaga(),
    getDataSlideTodaySaga(),
    checkAudioPlayerValidSaga(),
    setStatusPlayRecordSaga(),
    checkUserSnsLoginSaga(),
    registerHistoryPageSaga(),
    saveHistorySearchSaga(),
    saveHistorySearchDetailSaga(),
  ]);
}
