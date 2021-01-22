import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState, IGameState } from '@types';
import { Redirect } from 'react-router-dom';
import { Api, Languages, NOTIFY_TYPES, routes, sizes, FIRST_WORDS, DEFAULT_FIELD_SIZE, PLAYERS_ID } from '@constants';
import { setGame, setNotify } from '@store';
import { RadioGroup } from '@components';
import { useApi } from '@hooks';
import './set-game.scss';

export const SetGame = (): JSX.Element => {
  const { t } = useTranslation();
  const lang = useSelector((state: IAppState) => state.settings.lang);
  const game = useSelector((state: IAppState) => state.game);
  const [isFormSubmit, setFormSubmit] = React.useState(false);
  const [fieldSize, setFieldSize] = React.useState(DEFAULT_FIELD_SIZE);
  const [firstGameWord, setFirstGameWord] = React.useState(FIRST_WORDS[fieldSize]);
  const { request } = useApi();

  const dispatch = useDispatch();
  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));

  const openModal = React.useCallback(
    (headerText: string, contentText: string, variant: string = NOTIFY_TYPES.success) => {
      dispatch(setNotify({ headerText, contentText, variant }));
    },
    [dispatch],
  );

  React.useEffect(() => {
    const getFirstWord = async () => {
      try {
        const [language] = Object.keys(Languages).filter((key) => Languages[key as keyof typeof Languages] === lang);
        const { url, method } = Api.GET_WORD_BY_LENGTH;
        const data = await request(url(language || lang, fieldSize), method);
        setFirstGameWord(data.word);
      } catch (e) {
        await openModal(t('notify.wordByLength'), e.message, NOTIFY_TYPES.error);
      }
    };

    getFirstWord();
  }, [fieldSize, lang]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const time = +form.time.value.trim();
    const firstWord = form.firstWord.value.trim();
    const secondPlayer = form.secondPlayer.value.trim();

    setGameSettings({
      ...game,
      time,
      isBot: secondPlayer === 'bot',
      fieldSize,
      firstWord,
      winnerId: null,
      duration: 0,
      playerTurnId: PLAYERS_ID.FIRST_GAMER_ID,
      player1: { points: 0, playerWords: [], penalties: 0 },
      player2: { points: 0, playerWords: [], penalties: 0 },
    });

    setFormSubmit(true);
  };

  return (
    <div className="set-game">
      {isFormSubmit && <Redirect to={routes.GAME} />}
      <Form onSubmit={(event) => handleSubmit(event)}>
        <RadioGroup
          controlId="fieldSize"
          groupLabel={t('settings.field-size')}
          name="fieldSize"
          items={sizes.map((size) => {
            const isCurrentSize = game.fieldSize === size;
            return {
              id: `fieldSize-${size}`,
              label: `${size}`,
              value: `${size}`,
              defaultChecked: isCurrentSize,
            };
          })}
          onChange={setFieldSize}
        />

        <RadioGroup
          controlId="secondPlayer"
          groupLabel={t('settings.second-player')}
          name="secondPlayer"
          items={[
            {
              id: 'secondPlayer-bot',
              label: t('settings.bot'),
              value: 'bot',
              defaultChecked: false,
            },
            {
              id: 'secondPlayer-human',
              label: t('settings.human'),
              value: 'human',
              defaultChecked: true,
            },
          ]}
          onChange={setFieldSize}
        />
        <Form.Group controlId="firstWord">
          <Form.Label>{t('settings.first-word')}</Form.Label>
          <Form.Control type="text" value={firstGameWord} name="firstWord" readOnly />
        </Form.Group>
        <Form.Group controlId="time">
          <Form.Label>{t('settings.time')}</Form.Label>
          <Form.Control type="number" defaultValue={game.time} min="0" max="10" name="time" />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t('game.start')}
        </Button>
      </Form>
    </div>
  );
};
