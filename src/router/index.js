// @flow

import React, { lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ROUTERS from 'constants/router';
import { connect } from 'react-redux';
import { API } from '../utils/Apis';
import { checkPlatform } from '../utils/Helpers';

import { Creators as SettingCreator } from '../screens/settingInterest/redux';
import PrivateRoute from '../utils/PrivateRoute';

const LoginContainer = lazy(() =>
  import('screens/account/containers/signInContainer')
);

const SignUpContainer = lazy(() =>
  import('screens/account/containers/signUpContainer')
);

const SignUpSnsContainer = lazy(() =>
  import('screens/account/containers/signUpSnsContainer')
);

const FormSignUpContainer = lazy(() =>
  import('screens/account/containers/formSignUpContainer')
);

const FindPasswordContainer = lazy(() =>
  import('screens/account/containers/findPasswordContainer')
);

const MainContainer = lazy(() =>
  import('screens/main/containers/mainContainer')
);

const SettingInterestContainer = lazy(() =>
  import('screens/settingInterest/containers/settingContainers')
);

const MyPageContainer = lazy(() =>
  import('screens/myPage/containers/myPageContainer')
);

const StrawberryBeansContainer = lazy(() =>
  import('screens/main/containers/strawberryBeansContainer')
);

const StrawberryBeansDjContainer = lazy(() =>
  import('screens/main/containers/strawberryBeansDjContainer')
);

const PlayBookContainer = lazy(() =>
  import('screens/playBook/containers/videoBookContainer')
);

const BestFriendDetailContainer = lazy(() =>
  import('screens/main/containers/bestFriendsContainer')
);

const StrawberryBeansSchoolDetailContainer = lazy(() =>
  import('screens/main/containers/strawberryBeansSchoolContainer')
);

const MonthTopicDetailContainer = lazy(() =>
  import('screens/main/containers/monthTopicDetailContainer')
);

const AudioBookContainer = lazy(() =>
  import('screens/playBook/containers/audioBookContainer')
);

const NoticeContainer = lazy(() =>
  import('screens/myPage/containers/noticeContainer')
);

const NoticeDetailContainer = lazy(() =>
  import('screens/myPage/containers/noticeDetailContainer')
);

const SearchForAgeContainer = lazy(() =>
  import('screens/search/containers/searchForAgeContainer')
);

const SearchForSubjectContainer = lazy(() =>
  import('screens/search/containers/searchForSubjectContainer')
);

const SearchContainer = lazy(() =>
  import('screens/search/containers/searchContainers')
);

const MyContainer = lazy(() => import('screens/my/containers/myContainer'));

const AdvisoryContainer = lazy(() =>
  import('screens/myPage/containers/advisoryContainer')
);

const AdvisoryRegisterContainer = lazy(() =>
  import('screens/myPage/containers/advisoryRegisterContainer')
);

const AdvisoryDetailContainer = lazy(() =>
  import('screens/myPage/containers/advisoryUpdateContainer')
);

const TermsContainer = lazy(() => import('screens/myPage/components/terms'));

const SettingManagerContainer = lazy(() =>
  import('screens/myPage/containers/settingManagerContainers')
);

const CharacterDetailContainer = lazy(() =>
  import('screens/main/containers/characterAudioContainer')
);

const MusicDetailContainer = lazy(() =>
  import('screens/playBook/containers/musicBookContainer')
);

const MonthTopicAnotherContainer = lazy(() =>
  import('screens/main/containers/anotherMonthContainer')
);

const LastMonthTopicContainer = lazy(() =>
  import('screens/main/containers/lastMonthTopicContainer')
);

const SearchForKeyContainer = lazy(() =>
  import('screens/search/containers/searchForKeyContainer')
);

const EventDetailContainer = lazy(() =>
  import('screens/myPage/containers/eventContainer')
);

const LibraryContainer = lazy(() =>
  import('screens/search/containers/libraryContainer')
);

const LibraryDetailContainer = lazy(() =>
  import('screens/search/containers/libraryDetailContainer')
);

const RecordContainer = lazy(() =>
  import('screens/record/containers/recordContainer')
);

const BestStudioContainer = lazy(() =>
  import('screens/record/containers/bestStudioMonthContainer')
);

const ChallengeStudioContainer = lazy(() =>
  import('screens/record/containers/challengeStudioContainer')
);

const PlayStudioDetailContainer = lazy(() =>
  import('screens/record/containers/playStudioDetailContainer')
);

const EditInfoContainer = lazy(() =>
  import('screens/myPage/containers/editInfoContainer')
);

const StudioDetailContainer = lazy(() =>
  import('screens/record/containers/studioPlayDetailContainer')
);

const PlaylistDetailContainer = lazy(() =>
  import('screens/my/containers/myPlaylistDetail')
);

const MyPlaylistContainer = lazy(() =>
  import('screens/my/containers/myPlaylist')
);

const RecordStudioContainer = lazy(() =>
  import('screens/record/containers/recordStudioContainer')
);

const ConnectPlayBookContainer = lazy(() =>
  import('screens/myPage/containers/connectContainer')
);

const EditPasswordContainer = lazy(() =>
  import('screens/myPage/containers/updatePasswordContainer')
);

const CouponContainer = lazy(() =>
  import('screens/myPage/containers/couponContainer')
);

const FlowAreaContainer = lazy(() =>
  import('screens/main/containers/flowAreaContainer')
);

const PolicyContainer = lazy(() =>
  import('screens/myPage/components/terms/policy')
);

type Props = {
  token: string,
  paramSearch: Function,
};

const Router = ({ token, paramSearch }: Props) => {
  const isAuthenticated = token !== '';
  const currentOS = checkPlatform();
  if (token) {
    API.setHeader('Authorization', `${token}`);
  }
  if (window.location.search.slice(0, 6) === '?user=') {
    paramSearch(window.location.search);
  }
  if (currentOS.android) {
    console.log(1);
  } else if (currentOS.iphone) {
    console.log(2);
  } else if (window.location.host === 'm-dev.ddalgicong.com') {
    window.location.href = 'https://www-dev.ddalgicong.com/';
  } else if (window.location.host === 'm.ddalgicong.com') {
    window.location.href = 'https://www.ddalgicong.com/';
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="d-none" />}>
        <Switch>
          <Route exact path={ROUTERS.LOGIN} component={LoginContainer} />
          <Route exact path={ROUTERS.SIGN_UP} component={SignUpContainer} />
          {/* <PrivateRoute
            exact
            path={ROUTERS.SIGN_UP_SNS}
            component={SignUpSnsContainer}
            isAuthenticated={isAuthenticated}
          /> */}
          <Route
            exact
            path={ROUTERS.SIGN_UP_SNS}
            component={SignUpSnsContainer}
          />
          <Route
            exact
            path={ROUTERS.FIND_PASSWORD}
            component={FindPasswordContainer}
          />
          <Route
            exact
            path={ROUTERS.SIGN_UP_FORM}
            component={FormSignUpContainer}
          />
          <PrivateRoute
            exact
            path={ROUTERS.SETTING_INTEREST}
            component={SettingInterestContainer}
            isAuthenticated={isAuthenticated}
          />
          <Route
            exact
            path={ROUTERS.MAIN}
            component={MainContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MY_PAGE}
            component={MyPageContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.STRAWBERRY_BEANS_LIKE}
            component={StrawberryBeansContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MY}
            component={MyContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.STRAWBERRY_BEANS_DJ_DETAIL}
            component={StrawberryBeansDjContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PLAY_BOOK_DETAIL}
            component={PlayBookContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.BEST_FRIENDS_DETAIL}
            component={BestFriendDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.STRAWBERRY_BEANS_SCHOOL_DETAIL}
            component={StrawberryBeansSchoolDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MONTH_TOPIC_DETAIL}
            component={MonthTopicDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ANOTHER_MONTH_TOPIC}
            component={MonthTopicAnotherContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.LAST_MONTH_TOPIC}
            component={LastMonthTopicContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.AUDIO_BOOK_DETAIL}
            component={AudioBookContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.SEARCH}
            component={SearchContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.SEARCH_DETAIL}
            component={SearchForAgeContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.SEARCH_FOR_AGE}
            component={SearchForSubjectContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.SEARCH_FOR_KEY}
            component={SearchForKeyContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.NOTICE}
            component={NoticeContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.NOTICE_DETAIL}
            component={NoticeDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADVISORY}
            component={AdvisoryContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADVISORY_REGISTER}
            component={AdvisoryRegisterContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ADVISORY_DETAIL}
            component={AdvisoryDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <Route exact path={ROUTERS.TERMS} component={TermsContainer} />
          <PrivateRoute
            exact
            path={ROUTERS.SETTING_MANAGER}
            component={SettingManagerContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.CHARACTER_DETAIL}
            component={CharacterDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MUSIC_DETAIL}
            component={MusicDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.EVENT_DETAIL}
            component={EventDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.LIBRARY}
            component={LibraryContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.LIBRARY_DETAIL}
            component={LibraryDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.RECORD}
            component={RecordContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.BEST_STUDIO}
            component={BestStudioContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.CHALLENGE_STUDIO}
            component={ChallengeStudioContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PLAY_STUDIO_DETAIL}
            component={PlayStudioDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.RECORD_STUDIO_DETAIL}
            component={RecordStudioContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.EDIT_INFO}
            component={EditInfoContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.STUDIO_DETAIL}
            component={StudioDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MY_PLAYLIST}
            component={MyPlaylistContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.MY_PLAYLIST_DETAIL}
            component={PlaylistDetailContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.CONNECT}
            component={ConnectPlayBookContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.EDIT_PASSWORD}
            component={EditPasswordContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.COUPON}
            component={CouponContainer}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            exact
            path={ROUTERS.FLOW_AREA}
            component={FlowAreaContainer}
            isAuthenticated={isAuthenticated}
          />

          <Route exact path={ROUTERS.POLICY} component={PolicyContainer} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.settingReducer.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...SettingCreator,
      paramSearch: SettingCreator.paramSearch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Router);
