/* eslint-disable react/jsx-wrap-multilines */
import { Theme, PLAYERS_ID, TABLET_WORDS_SIZE } from '@constants';
import { IAppState } from '@types';
import React from 'react';
import { useWindowSize } from '@hooks';
import { useSelector } from 'react-redux';
import './player.scss';
import { WordsComponent } from '@components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

type PlayerProps = {
  playerId: number;
};

export const Player: React.FC<PlayerProps> = ({ playerId }: PlayerProps) => {
  const gamerName = useSelector((state: IAppState) => state.settings.gamerNames[playerId]);
  const playerTurnId = useSelector((state: IAppState) => state.game.playerTurnId);
  const isCurrent = playerTurnId === playerId;
  const themeInitial = useSelector((state: IAppState) => state.settings.currentTheme);
  const themeChange = themeInitial === Theme.light ? 'player-light' : 'player-dark';
  const size = useWindowSize();

  const classList = [`player ${themeChange}`];

  if (isCurrent) {
    classList.push('player--current');
  }

  return (
    <div className={classList.join(' ')}>
      {size < TABLET_WORDS_SIZE ? (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          rootClose
          overlay={
            <Popover id={`popover-positioned-${gamerName}`}>
              <Popover.Title as="h3">
                {`${gamerName} words`}
                <button onClick={() => document.body.click()} type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </Popover.Title>
              <Popover.Content>
                {playerId === PLAYERS_ID.FIRST_GAMER_ID ? (
                  <WordsComponent playerId={PLAYERS_ID.FIRST_GAMER_ID} />
                ) : (
                  <WordsComponent playerId={PLAYERS_ID.SECOND_GAMER_ID} />
                )}
              </Popover.Content>
            </Popover>
          }
        >
          <span className="player__name">{gamerName}</span>
        </OverlayTrigger>
      ) : (
        <span className="player__name">{gamerName}</span>
      )}
    </div>
  );
};
