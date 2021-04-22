// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { Accordion } from 'react-bootstrap';

// Component
import { AccordionToggle } from '../components/Accordion';

const listItem = [
  { Title: '창고 : SWC냉장', body: 'Name 1' },
  { Title: '창고 : SWC냉장', body: 'Name 2' },
  { Title: '창고 : SWC냉장', body: 'Name 3' },
  { Title: '창고 : SWC냉장', body: 'Name 4' },
];

const renderAccordion = () => {
  let result = [];
  if (listItem.length > 0) {
    result = listItem.map((item, index) => {
      return (
        <AccordionToggle
          eventKeyId={index}
          titleHeader={item.Title}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={action('clicked')}
        >
          <div className="list">
            <h1>{item.body}</h1>
            <p>판매 할 수 있는 상품이 없습니다. 재고를 다시 한번 확인하세요.</p>
          </div>
        </AccordionToggle>
      );
    });
  }
  return result;
};
storiesOf('AccordionToggle', module)
  .addDecorator(withInfo)
  .add('Outline', () => <Accordion>{renderAccordion()}</Accordion>);
