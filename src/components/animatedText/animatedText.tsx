import React from 'react';
import Animate from 'react-move/Animate';
import { easeCubicOut } from 'd3-ease';
import { useWindowSize } from '@hooks';
import { TABLET_WORDS_SIZE, MOBILE_WINDOW_SIZE, DEFAULT_MSG_SIZE, MOBILE_MSG_SIZE, TABLET_MSG_SIZE } from '@constants';

type AnimatedTextProps = {
  isShow: boolean;
  text: string;
  setIsShowAnimation: (arg0: boolean) => void;
  colorMsg: string;
};

export const AnimatedText = ({ isShow, setIsShowAnimation, text, colorMsg }: AnimatedTextProps): JSX.Element => {
  const size = useWindowSize();

  let msgFontSize;

  if (size < MOBILE_WINDOW_SIZE) {
    msgFontSize = MOBILE_MSG_SIZE;
  } else if (size < TABLET_WORDS_SIZE) {
    msgFontSize = TABLET_MSG_SIZE;
  } else {
    msgFontSize = DEFAULT_MSG_SIZE;
  }

  return (
    <Animate
      show
      start={{
        opacity: 0,
        fontSize: 0,
      }}
      update={{
        opacity: isShow ? [1] : 0,
        fontSize: isShow ? [msgFontSize] : 0,
        timing: { duration: 800, ease: easeCubicOut },
        events: {
          end: () => {
            setIsShowAnimation(false);
          },
        },
      }}
      leave={{
        opacity: 0,
        fontSize: 0,
        timing: { duration: 1800 },
      }}
    >
      {({ opacity, fontSize }) => (
        <div
          style={{
            position: 'absolute',
            top: '175px',
            left: '50%',
            color: colorMsg,
            transform: ' translate(-50%, -50%)',
            background: '#f7faffa1',
            borderRadius: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            lineHeight: '100%',
            opacity,
            fontSize,
          }}
        >
          {text}
        </div>
      )}
    </Animate>
  );
};
