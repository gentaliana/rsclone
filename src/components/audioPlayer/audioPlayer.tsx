import * as React from 'react';
import ReactHowler from 'react-howler';
import music from '../../assets/sound/music.mp3';

type AudioProps = {
  format: Array<string>;
  autoplay: boolean;
  loop: boolean;
  isMute: boolean;
};

export const AudioPlayer = ({ format, autoplay, loop, isMute }: AudioProps): JSX.Element => (
  <ReactHowler src={music} playing={autoplay} format={format} volume={0.7} loop={loop} mute={isMute} preload html5 />
);
