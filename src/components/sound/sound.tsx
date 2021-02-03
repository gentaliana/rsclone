import * as React from 'react';
import ReactHowler from 'react-howler';

type SoundProps = {
  playing: boolean;
  format: Array<string>;
  loop: boolean;
  mute: boolean;
  onEnd: (play: boolean) => void;
};

export const Sound = ({ playing, format, loop, mute, onEnd }: SoundProps): JSX.Element => (
  <ReactHowler
    src="https://noisefx.ru/noise_base/obect/ofis/00171.mp3"
    playing={playing}
    format={format}
    loop={loop}
    mute={mute}
    onEnd={() => onEnd(false)}
    volume={0.5}
    preload
    html5
  />
);
