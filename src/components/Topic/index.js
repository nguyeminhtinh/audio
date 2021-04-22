/* eslint-disable no-shadow */
// @flow
import React, { useState } from 'react';
import Immutable from 'seamless-immutable';

type Props = {
  label: string,
  sendTopic: Function,
  listSubject: Array<{
    id: number,
    subject: string,
  }>,
  studioPlaySubject: Array<{
    id: number,
  }>,
};

const Topic = ({ label, sendTopic, listSubject, studioPlaySubject }: Props) => {
  const [listSubjectId, setListSubjectId] = useState(
    (studioPlaySubject && Immutable.asMutable(studioPlaySubject)) || []
  );
  // console.log(studioPlaySubject);
  const handleChooseTopic = (id) => {
    let listId = [];
    if (listSubjectId.length > 0 && listSubjectId.includes(id)) {
      listId = listSubjectId.filter((item) => item !== id);
    } else if (!listSubjectId.includes(id) && listSubjectId.length < 4) {
      listId = [...listSubjectId, id];
    } else {
      listId = listSubjectId;
    }
    setListSubjectId(listId);
    sendTopic(listId);
  };
  // console.log(listSubjectId);
  const renderListTopic =
    listSubject &&
    listSubject.map((item) => {
      const idActive = listSubjectId.filter((items) => items === item.id);
      return (
        <div
          className={
            idActive && idActive[0] && idActive[0] === item.id
              ? 'topic-item active'
              : 'topic-item'
          }
          key={item.id}
          onClick={() => {
            handleChooseTopic(item.id);
          }}
          role="presentation"
        >
          <span>#{item.subject}</span>
        </div>
      );
    });
  return (
    <div className="topic">
      <p className="topic-label">{label}</p>
      <div className="topic-box">{renderListTopic}</div>
    </div>
  );
};

export default Topic;
