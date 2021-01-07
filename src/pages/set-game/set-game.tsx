import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import './set-game.scss';
import Col from 'react-bootstrap/esm/Col';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState, IGameState } from '@types';
import { Redirect } from 'react-router-dom';
import { routes } from '@constants';
import { setGame } from '@store';

export const SetGame = (): JSX.Element => {
  const { t } = useTranslation();
  const game = useSelector((state: IAppState) => state.game);
  const [isFormSubmit, setFormSubmit] = React.useState(false);

  const dispatch = useDispatch();
  const setGameSettings = (settings: IGameState) => dispatch(setGame(settings));

  const sizes = [3, 4, 5, 6, 7, 8, 9];

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const time = +form.time.value.trim();
    const fieldSize = +form.fieldSize.value.trim();
    const firstWord = form.firstWord.value.trim();
    const secondPlayer = form.secondPlayer.value.trim();

    setGameSettings({
      ...game,
      time,
      isBot: secondPlayer === 'bot',
      fieldSize,
      firstWord,
    });

    setFormSubmit(true);
  };

  return (
    <div className="set-game">
      {isFormSubmit && <Redirect to={routes.GAME} />}
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Form.Group controlId="fieldSize">
          <Form.Label>{t('settings.field-size')}</Form.Label>
          <Col>
            {sizes.map((size) => {
              const isCurrentSize = game.fieldSize === size;
              return (
                <Form.Check
                  key={size}
                  inline
                  label={size}
                  type="radio"
                  value={size}
                  name="fieldSize"
                  defaultChecked={isCurrentSize}
                />
              );
            })}
          </Col>
        </Form.Group>

        <Form.Group controlId="secondPlayer">
          <Form.Label>{t('settings.second-player')}</Form.Label>
          <Col>
            <Form.Check inline label="Bot" type="radio" value="bot" name="secondPlayer" />
            <Form.Check inline label="Human" type="radio" value="human" name="secondPlayer" defaultChecked />
          </Col>
        </Form.Group>
        <Form.Group controlId="firstWord">
          <Form.Label>{t('settings.first-word')}</Form.Label>
          <Form.Control type="text" value="balda" name="firstWord" readOnly />
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
