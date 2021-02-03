import { Loader, TableWithPaginator } from '@components';
import { Api, NOTIFY_TYPES, Theme } from '@constants';
import { useApi, useAuth } from '@hooks';
import { setNotify } from '@store';
import { IApiData, IAppState, IGameData } from '@types';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

interface IUser {
  login: string;
  userId: string;
  score: number | string;
  games: IGameData[] | string;
}

export const User = (props: RouteComponentProps<IUserData>): JSX.Element => {
  const { token, userId } = useAuth();
  const { loading, request } = useApi();
  const [userName] = useSelector((state: IAppState) => state.settings.gamerNames);
  const [userInfo, setUserInfo] = useState<IUser>({
    login: userName,
    userId: '',
    score: 0,
    games: [],
  });
  const { t } = useTranslation();

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
      const user: IApiData = await request(url(id), method, null, headers(authToken));

      if (user) {
        const userReq: IUser = {
          login: user.login,
          userId: user.userId,
          score: +user.score,
          games: user.games,
        };
        setUserInfo(userReq);
      }
    } catch (e) {
      openModal(t('notify.error.user'), e.message, NOTIFY_TYPES.error);
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
  const themeChangeUser = themeInitial === Theme.light ? 'user-info__light' : 'user-info__dark';

  const { login, score, games } = userInfo;

  let gameList: DataType[] = [];

  if (Array.isArray(games)) {
    gameList = games.map((game: IGameData, i: number) => ({
      id: i + 1,
      name: login,
      score: game.score,
      time: game.time,
    }));
  }

  const renderInfo = userInfo ? (
    <div className={`user-info ${themeChangeUser}`}>
      <span>{`${t('game.player')}: ${login}`}</span>
      <span>{`${t('game.score')}: ${score}`}</span>
    </div>
  ) : null;

  return (
    <div className={themeChange}>
      {loading ? <Loader className="set-game__loader" /> : renderInfo}
      {loading || (
        <TableWithPaginator
          data={gameList}
          pageSize={10}
          classTable="raitingTable"
          classPaginator="raitingPaginator"
          isPaginatorNeed
        />
      )}
    </div>
  );
};
