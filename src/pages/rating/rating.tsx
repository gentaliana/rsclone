import * as React from 'react';
import { Loader, TableWithPaginator } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { IApiData, IAppState } from '@types';
import { Api, NOTIFY_TYPES, Theme } from '@constants';
import { useApi } from '@hooks';
import { setNotify } from '@store';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './rating.scss';

type DataType = {
  id: number;
  name: string;
  score: number;
  time: number;
};

interface IData {
  [key: string]: DataType[];
}

export const Rating = (): JSX.Element => {
  const { loading, request } = useApi();
  const [rating, setRating] = useState<IData | IApiData>({});

  const dispatch = useDispatch();

  const openModal = React.useCallback(
    (headerText: string, contentText: string, variant: string = NOTIFY_TYPES.success) => {
      dispatch(setNotify({ headerText, contentText, variant }));
    },
    [dispatch],
  );

  const getTop10 = async () => {
    const { url, method } = Api.GET_TOP_10_GAMES;

    try {
      const games: IApiData = await request(url, method);
      setRating(games);
    } catch (e) {
      openModal('notify.error.user', e.message, NOTIFY_TYPES.error);
    }
  };

  useEffect((): (() => void) => {
    getTop10();

    return () => null;
  }, []);

  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'raiting-light' : 'raiting-dark';

  let renderTabs: string | JSX.Element = 'No data';

  let ratingKeys: string[] = [];

  if (rating) {
    ratingKeys = Object.keys(rating);
  }

  const defaultActiveKey = ratingKeys.length > 0 ? `fieldSize-${ratingKeys[0]}` : '';

  if (rating) {
    renderTabs = (
      <Tabs defaultActiveKey={defaultActiveKey || 'fieldSize-3'} id="rating-tab">
        {ratingKeys.map((fieldSize: string) => (
          <Tab eventKey={`fieldSize-${fieldSize}`} title={`${fieldSize}x${fieldSize}`}>
            <TableWithPaginator
              data={rating[fieldSize] as DataType[]}
              pageSize={10}
              classTable="raitingTable"
              classPaginator="raitingPaginator"
              isPaginatorNeed={false}
            />
          </Tab>
        ))}
      </Tabs>
    );
  }

  // prettier-ignore
  return (
    <div className={`raiting ${themeChange}`}>
      {loading ? <Loader className="set-game__loader" /> : renderTabs}
    </div>
  );
};
