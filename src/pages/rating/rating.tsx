import * as React from 'react';
import { TableWithPaginator } from '@components';
import { useSelector } from 'react-redux';
import { IAppState } from '@types';
import { Theme } from '@constants';
import './rating.scss';

export const Rating = (): JSX.Element => {
  const initialRaiting = [
    {
      id: 1,
      name: 'user1',
      score: 54,
      time: 2132153,
    },
    {
      id: 2,
      name: 'user2',
      score: 100,
      time: 32153,
    },
    {
      id: 3,
      name: 'user3',
      score: 2,
      time: 32023,
    },
    {
      id: 4,
      name: 'user4',
      score: 23,
      time: 32023,
    },
    {
      id: 5,
      name: 'user5',
      score: 334,
      time: 32023,
    },
    {
      id: 6,
      name: 'user6',
      score: 67,
      time: 32023,
    },
    {
      id: 7,
      name: 'user7',
      score: 0,
      time: 32023,
    },
    {
      id: 8,
      name: 'user8',
      score: 32,
      time: 32023,
    },
    {
      id: 9,
      name: 'user9',
      score: 34,
      time: 32023,
    },
    {
      id: 10,
      name: 'user10',
      score: 90,
      time: 32023,
    },
    {
      id: 11,
      name: 'user11',
      score: 70,
      time: 32023,
    },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'raiting-light' : 'raiting-dark';

  return (
    <div className={themeChange}>
      <TableWithPaginator
        data={initialRaiting}
        pageSize={10}
        classTable="raitingTable"
        classPaginator="raitingPaginator"
      />
    </div>
  );
};
