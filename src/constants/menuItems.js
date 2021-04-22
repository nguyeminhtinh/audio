import IMAGES from 'themes/images';
import ROUTERS from './router';

const menuItems = [
  {
    key: 1,
    name: '검색',
    link: ROUTERS.SEARCH,
    icon: IMAGES.tab_search_s,
  },
  {
    key: 2,
    name: 'MY',
    link: ROUTERS.MY,
    icon: IMAGES.tab_my_s,
  },
  {
    key: 3,
    name: '라이브러리',
    link: ROUTERS.LIBRARY,
    icon: IMAGES.icon_library,
  },
  {
    key: 4,
    name: '공지사항',
    link: ROUTERS.NOTICE,
    icon: IMAGES.tab_book_s,
  },
  {
    key: 5,
    name: '1:1 문의하기',
    link: ROUTERS.ADVISORY,
    icon: IMAGES.tab_bubble_s,
  },
  {
    key: 6,
    name: '맞춤 콘텐츠 설정',
    link: ROUTERS.SETTING_MANAGER,
    icon: IMAGES.icon_crown,
  },
];

export default menuItems;
