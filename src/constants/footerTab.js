import ROUTERS from './router';
import ico_tab1_action from '../assets/images/tab_home_on.svg';
import ico_tab2_action from '../assets/images/tab_search_on.svg';
import ico_tab3_action from '../assets/images/tab_my_on.svg';
import ico_tab4_action from '../assets/images/tab_book.svg';
import ico_tab1 from '../assets/images/tab_home.svg';
import ico_tab2 from '../assets/images/tab_search.svg';
import ico_tab3 from '../assets/images/tab_my.svg';
import ico_tab4 from '../assets/images/tab_book_off.svg';

const footerTabs = [
  {
    key: 1,
    classAction: ico_tab1_action,
    class: ico_tab1,
    classActive: 'btn-tab-1-on',
    name: '홈',
    link: ROUTERS.LIST_ORDER,
  },
  {
    key: 2,
    classAction: ico_tab2_action,
    class: ico_tab2,
    name: '검색',
    link: ROUTERS.TRANSACTION_HISTORY,
    classActive: 'btn_tab_on',
  },
  {
    key: 3,
    classAction: ico_tab3_action,
    class: ico_tab3,
    name: 'My',
    link: ROUTERS.PAYMENT,
  },
  {
    key: 4,
    classAction: ico_tab4_action,
    class: ico_tab4,
    classActive: 'btn_tab4_on',
    name: '관리',
    link: ROUTERS.MY_PAGE,
  },
];

export default footerTabs;
