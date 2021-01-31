import { DEFAULT_GAMER_NAME, DEFAULT_LANG, DEFAULT_SECOND_GAMER_NAME, DEFAULT_THEME } from '@constants';

export const setDefSettingsToStorage = (): void =>
  localStorage.setItem(
    'settings',
    JSON.stringify({
      lang: DEFAULT_LANG,
      isSoundOn: true,
      isMusicOn: true,
      gamerNames: [DEFAULT_GAMER_NAME, DEFAULT_SECOND_GAMER_NAME],
      currentTheme: DEFAULT_THEME,
    }),
  );
