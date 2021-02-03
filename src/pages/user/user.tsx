import { TableWithPaginator } from '@components';
import { Api, Theme } from '@constants';
import { useApi, useAuth } from '@hooks';
import { IAppState } from '@types';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './user.scss';

export const User = (props: any): JSX.Element => {
  const { token, userId } = useAuth();
  const { request } = useApi();
  const [userName] = useSelector((state: IAppState) => state.settings.gamerNames);
  const [userInfo, setUserInfo] = useState({
    login: userName,
    userId: '',
    score: 0,
    games: [],
  });

  const getUserById = async (id: string, authToken: string | null) => {
    const { url, method, headers } = Api.GET_USER_WITH_GAMES;
    try {
      const user: any = await request(url(id), method, null, headers(authToken));

      if (user) {
        setUserInfo(user);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getUserByIdCallback = useCallback(() => {
    getUserById(userId || '', token);
  }, [token, userId]);

  useEffect((): any => {
    let { name } = props.match.params;

    if (name === ':name' || !name) {
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

  const gameList: any = games.map((game: any, i: number) => ({
    id: i + 1,
    name: login,
    score: game.score,
    time: game.time,
  }));

  // prettier-ignore
  return (
    <div className={themeChange}>
      {userInfo ? <div className="user-info"><span>User: {login}</span><span>Score: {score}</span></div> : null}
      <TableWithPaginator
        data={gameList}
        pageSize={10}
        classTable="raitingTable"
        classPaginator="raitingPaginator"
      />
    </div>
  );
};
