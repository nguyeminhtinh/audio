// @flow

import React, { memo, useState } from 'react';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';
import { NoData } from 'components/NoData';

type Props = {
  itemSeries: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  history: {
    push: Function,
  },
  getKeySearch?: Function,
  keySearch?: string,
  isActiveTab: number,
  isShowSuccess?: boolean,
};

const ItemSearchSeries = ({
  itemSeries,
  history,
  getKeySearch = () => {},
  keySearch = '',
  isActiveTab,
  isShowSuccess = false,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderListItemSeries =
    itemSeries &&
    itemSeries.map((item) => {
      return (
        <div
          className="strawberry__listAudio search-series__item "
          key={item.groupId}
          onClick={() => {
            history.push({
              pathname: `${ROUTERS.LIBRARY}/${item?.groupId}`,
              state: {
                groupName: item.groupName,
              },
            });
            getKeySearch({ keySearch, isShowSuccess });
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <div className="item--image">
            <img
              src={
                `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                IMAGES.image_not_found
              }
              alt="Images"
              onError={(e) => {
                if (loadImage) {
                  setLoadImage({
                    loadImage: false,
                  });
                  e.target.src = IMAGES.image_not_found;
                }
              }}
            />
          </div>
        </div>
      );
    });
  const renderSeriesDetail =
    itemSeries && itemSeries.length > 0 ? (
      itemSeries &&
      itemSeries.map((item) => {
        return (
          <div
            className="search-wrapper__list-music"
            onClick={() => {
              history.push({
                pathname: `${ROUTERS.LIBRARY}/${item?.groupId}`,
                state: {
                  groupName: item.groupName,
                },
              });
              getKeySearch({ keySearch, isShowSuccess });
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            key={item.groupId}
          >
            <div className="item--image">
              <img
                src={
                  `https://down.wjthinkbig.com${item?.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt="Images"
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
              />
            </div>
          </div>
        );
      })
    ) : (
      <NoData text="해당 콘텐츠가 없습니다." />
    );
  return (
    <>
      {isActiveTab === 0
        ? itemSeries?.length > 0 && (
            <div className="search-series-slide">{renderListItemSeries}</div>
          )
        : itemSeries?.length > 0 && (
            <div className="search-series-detail"> {renderSeriesDetail}</div>
          )}
    </>
  );
};
ItemSearchSeries.defaultProps = {
  getKeySearch: () => {},
  keySearch: '',
  isShowSuccess: false,
};
export default memo<Props>(ItemSearchSeries);
