import { TableWithPaginator } from '@components';
import { Api, NOTIFY_TYPES, Theme } from '@constants';
import { useApi, useAuth } from '@hooks';
import { setNotify } from '@store';
import { IAppState, IGameData } from '@types';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import './user.scss';

interface IUserData {
  name: string;
}

type DataType = {
  id: number;
  name: string;
  score: number;
  time: number;
};

export const User = (props: RouteComponentProps<IUserData>): JSX.Element => {
  const { token, userId } = useAuth();
  const { request } = useApi();
  const [userName] = useSelector((state: IAppState) => state.settings.gamerNames);
  const [userInfo, setUserInfo] = useState({
    login: userName,
    userId: '',
    score: 0,
    games: [],
  });

  const dispatch = useDispatch();

  const openModal = React.useCallback(
    (headerText: string, contentText: string, variant: string = NOTIFY_TYPES.success) => {
      dispatch(setNotify({ headerText, contentText, variant }));
    },
    [dispatch],
  );

  const getUserById = async (id: string, authToken: string | null) => {
    const { url, method, headers } = Api.GET_USER_WITH_GAMES;
    try {
      const user: any = await request(url(id), method, null, headers(authToken));

      if (user) {
        setUserInfo(user);
      }
    } catch (e) {
      openModal('Text', e.message, NOTIFY_TYPES.error);
    }
  };

  const getUserByIdCallback = useCallback(() => {
    getUserById(userId || '', token);
  }, [token, userId]);

  useEffect((): (() => void) => {
    let { name } = props.match.params;

    if ((name === ':name' || !name) && userId) {
      name = userId;
    }

    if (token && name) {
      getUserByIdCallback();
    }

    return () => null;
  }, [token, userId]);

  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'raiting-light' : 'raiting-dark';

  const { login, score, games } = userInfo;

  const gameList: DataType[] = games.map((game: IGameData, i: number) => ({
    id: i + 1,
    name: login,
    score: game.score,
    time: game.time,
  }));

  return (
    <div className={themeChange}>
      {userInfo ? (
        <div className="user-info">
          <span>User: {login}</span>
          <span>Score: {score}</span>
        </div>
      ) : null}
      <TableWithPaginator data={gameList} pageSize={10} classTable="raitingTable" classPaginator="raitingPaginator" />
    </div>
  );
};
