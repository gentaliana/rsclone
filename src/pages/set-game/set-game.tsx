import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState, IGameState } from '@types';
import { Redirect } from 'react-router-dom';
import { Api, Languages, NOTIFY_TYPES, routes, sizes, FIRST_WORDS, PLAYERS_ID, SecondPlayer } from '@constants';
import { setGame, setNotify } from '@store';
import { RadioGroup } from '@components';
import { useApi } from '@hooks';
import { Loader } from 'src/components/Loader';
import './set-game.scss';

export const SetGame = (): JSX.Element => {
  const { t } = useTranslation();
  const lang = useSelector((state: IAppState) => state.settings.lang);
  const game = useSelector((state: IAppState) => state.game);
  const [isFormSubmit, setFormSubmit] = React.useState(false);
  const [fieldSize, setFieldSize] = React.useState<number>(game.fieldSize);
  const [firstGameWord, setFirstGameWord] = React.useState(FIRST_WORDS[fieldSize]);
  const [secondPlayer, setSecondPlayer] = React.useState<string>(SecondPlayer.human);
  const [isWordFetching, setIsWordFetching] = React.useState<boolean>(false);

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
        setIsWordFetching(true);
        const [language] = Object.keys(Languages).filter((key) => Languages[key as keyof typeof Languages] === lang);
        const { url, method } = Api.GET_WORD_BY_LENGTH;
        const data = await request(url(language || lang, fieldSize), method);
        setFirstGameWord(data.word);
      } catch (e) {
        openModal(t('notify.wordByLength'), e.message, NOTIFY_TYPES.error);
      } finally {
        setIsWordFetching(false);
      }
    };

    getFirstWord();
  }, [fieldSize, lang]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const time = +form.time.value.trim();
    const firstWord = firstGameWord;

    setGameSettings({
      ...game,
      time,
      isBot: secondPlayer === SecondPlayer.bot,
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

  const fieldSizeArray = React.useMemo(
    () =>
      sizes.map((size) => {
        const isCurrentSize = game.fieldSize === size;
        return {
          id: `fieldSize-${size}`,
          label: `${size}`,
          value: `${size}`,
          defaultChecked: isCurrentSize,
        };
      }),
    [game],
  );

  return (
    <div className="set-game">
      {isFormSubmit && <Redirect to={routes.GAME} />}
      <Form onSubmit={(event) => handleSubmit(event)}>
        <RadioGroup
          controlId="fieldSize"
          groupLabel={t('settings.field-size')}
          name="fieldSize"
          items={fieldSizeArray}
          onChange={(value) => setFieldSize(Number(value))}
          disabled={isWordFetching}
        />

        <RadioGroup
          controlId="secondPlayer"
          disabled={isWordFetching}
          groupLabel={t('settings.second-player')}
          name="secondPlayer"
          items={[
            {
              id: 'secondPlayer-bot',
              label: t('settings.bot'),
              value: SecondPlayer.bot,
              defaultChecked: false,
            },
            {
              id: 'secondPlayer-human',
              label: t('settings.human'),
              value: SecondPlayer.human,
              defaultChecked: true,
            },
          ]}
          onChange={(value) => setSecondPlayer(value)}
        />
        <Form.Group controlId="time">
          <Form.Label>{t('settings.time')}</Form.Label>
          <Form.Control type="number" defaultValue={game.time} min="0" max="10" name="time" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isWordFetching}>
          {isWordFetching ? t('game.load') : t('game.start')}
        </Button>
        {isWordFetching && <Loader className="set-game__loader" />}
      </Form>
    </div>
  );
};
