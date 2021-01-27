import * as React from 'react';
import ReactHowler from 'react-howler';

type AudioProps = {
  format: Array<string>;
  autoplay: boolean;
  loop: boolean;
  isMute: boolean;
};

export const AudioPlayer = ({ format, autoplay, loop, isMute }: AudioProps): JSX.Element => (
  <ReactHowler
    src="https://zvukipro.com/uploads/files/2019-04/1554746450_12cfb941f3a5f50.mp3"
    playing={autoplay}
    format={format}
    volume={0.7}
    loop={loop}
    mute={isMute}
    preload
    html5
  />
);
