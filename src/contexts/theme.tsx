import React, { useEffect } from 'react';
import { ThemeProvider as ThemeEmotionProvider } from '@emotion/react';
import { theme, themeBlue, themeDark } from '#/utils/theme';

import type { Dispatch, PropsWithChildren, SetStateAction, FC } from 'react';
import type { ThemeTypes } from '#/utils/theme';
import { useStore } from '#/store';
import { observer } from 'mobx-react-lite';

export type ThemeValue = {
  themeContext: ThemeVarious;
  setThemeContext: Dispatch<SetStateAction<ThemeVarious>>;
};

export type ThemeVarious = 'light' | 'dark' | 'blue';

export const themes: Record<string, ThemeTypes> = {
  light: theme,
  dark: themeDark,
  blue: themeBlue
};

// Theme provider setup
//* ------------------------------------------------------------------------------------------ *//
const ThemeProvider: FC<PropsWithChildren> = observer(({ children }) => {
  const { appStore } = useStore();
  const { theme: currentTheme } = appStore.state;

  useEffect(
    () => document.documentElement.setAttribute('data-theme', currentTheme),
    [currentTheme]
  );

  return <ThemeEmotionProvider theme={themes[currentTheme]}>{children}</ThemeEmotionProvider>;
});

export default ThemeProvider;
