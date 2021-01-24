import * as React from 'react';
import ReactHowler from 'react-howler';

type SoundProps = {
  src: string;
  playing: boolean;
  format: Array<string>;
  loop: boolean;
  mute: boolean;
  onEnd: (play: boolean) => void;
};

export const Sound = ({ src, playing, format, loop, mute, onEnd }: SoundProps): JSX.Element => (
  <ReactHowler src={src} playing={playing} format={format} loop={loop} mute={mute} onEnd={() => onEnd(false)} />
);
