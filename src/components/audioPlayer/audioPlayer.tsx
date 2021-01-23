import * as React from 'react';
import ReactHowler from 'react-howler';

type AudioProps = {
  file: string;
  format: Array<string>;
  autoplay: boolean;
  loop: boolean;
  isMute: boolean;
};

// AudioProps.defaultProps = {
//   soundFun: null,
// };

export const AudioPlayer = ({ file, format, autoplay, loop, isMute }: AudioProps): JSX.Element => (
  // console.log('player');
  <ReactHowler src={file} playing={autoplay} format={format} volume={0.7} loop={loop} mute={isMute} />
);
