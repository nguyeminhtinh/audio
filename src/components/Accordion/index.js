// @flow
// add flow above to fix for using flow with React.memo

// libs
import React, { memo, useState } from 'react';
import { Accordion, Card, Dropdown } from 'react-bootstrap';

type Props = {
  customClass?: string,
  titleHeader: string,
  subTitle?: string,
  eventKeyId: number,
  children: any,
  isTwoTitle?: boolean,
  isDataRight?: boolean,
  dateTime?: string,
};

export const AccordionToggle = ({
  customClass = '',
  titleHeader,
  subTitle,
  dateTime,
  eventKeyId,
  children,
  isTwoTitle,
  isDataRight,
}: Props) => {
  const [isArrow, setIsArrow] = useState(false);
  const CustomToggle = () => {
    return (
      <div
        onClick={() => setIsArrow(!isArrow)}
        onKeyDown={() => {}}
        className="card-header__title"
        aria-expanded={isArrow}
        role="button"
        tabIndex="0"
      >
        {!isTwoTitle ? (
          <div>{titleHeader}</div>
        ) : (
          <div className="card-header__title__sub">
            <p>{titleHeader}</p>
            <h4>{subTitle}</h4>
          </div>
        )}
        {isDataRight && <div className="card-header__date">{dateTime}</div>}
      </div>
    );
  };

  return (
    <Card className={customClass}>
      <Card.Header>
        <Accordion.Toggle as={Dropdown} variant="link" eventKey={eventKeyId}>
          {CustomToggle()}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKeyId} in={isArrow}>
        <Card.Body>{children.props.children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

AccordionToggle.defaultProps = {
  customClass: '',
  isTwoTitle: false,
  isDataRight: false,
  subTitle: '',
  dateTime: '',
};

export default memo<Props>(AccordionToggle);
