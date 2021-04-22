import ROUTERS from 'constants/router';

const listSelectTopic = [
  {
    id: 1,
    key: '1',
    name: '이달의 다른 테마',
    router: ROUTERS.ANOTHER_MONTH_TOPIC,
  },
  {
    id: 2,
    key: '2',
    name: '지난 달 테마',
    router: ROUTERS.LAST_MONTH_TOPIC,
  },
];

const listItemTabMonth = [
  {
    id: 1,
    key: '01',
    name: '1월',
  },
  {
    id: 2,
    key: '02',
    name: '2월',
  },
  {
    id: 3,
    key: '03',
    name: '3월',
  },
  {
    id: 4,
    key: '04',
    name: '4월',
  },
  {
    id: 5,
    key: '05',
    name: '5월',
  },
  {
    id: 6,
    key: '06',
    name: '6월',
  },
  {
    id: 7,
    key: '07',
    name: '7월',
  },
  {
    id: 8,
    key: '08',
    name: '8월',
  },
  {
    id: 9,
    key: '09',
    name: '9월',
  },
  {
    id: 10,
    key: '10',
    name: '10월',
  },
  {
    id: 11,
    key: '11',
    name: '11월',
  },
  {
    id: 12,
    key: '12',
    name: '12월',
  },
];

const listCheckbox = [
  {
    id: 1,
    name: 'item1',
    isChecked: false,
    content: '이용약관',
    label: '[필수] ',
    isRequired: true,
    title: '[필수] 이용약관',
  },
  {
    id: 2,
    name: 'item2',
    isChecked: false,
    content: '개인정보 수집 및 이용 동의',
    label: '[필수] ',
    isRequired: true,
    title: '[필수] 개인정보 수집 및 이용 동의',
  },
  {
    id: 3,
    name: 'item3',
    isChecked: false,
    content: '신규 콘텐츠 / 이벤트 혜택 이메일 수신',
    label: '[선택] ',
    isRequired: false,
    title: '[선택] 신규 콘텐츠 / 이벤트 혜택 이메일 수신',
  },
];
export { listSelectTopic, listItemTabMonth, listCheckbox };
