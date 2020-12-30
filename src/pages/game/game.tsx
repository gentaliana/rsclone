import React, {useState} from 'react';
import './game.scss';
import { Keyboard, Field } from '@components';

export const Game = (): JSX.Element => {

    const [currentLetter, setCurrentLetter] = useState('');
    
    const handleCurrentLetter = (letter: string) =>{
        setCurrentLetter(letter);
    };
    
    return (
      <div>
        Game <Keyboard setCurrentLetter={handleCurrentLetter} />
        <Field currentLetter={currentLetter} />
      </div>
    );}
