import type { FC, PropsWithChildren } from 'react';
import { useEffect, createContext, useMemo } from 'react';

import { useStore } from '#/store/index';
import type { IInitialData } from '#/types/common';

export const InitialContext = createContext({} as IInitialData);

type IInitialContextProvider = { value: IInitialData } & PropsWithChildren;

// Initial context provider setup
//* ------------------------------------------------------------------------------------------ *//
export const InitialContextProvider: FC<IInitialContextProvider> = ({ value, children }) => {
  const { userStore, appStore } = useStore();
  userStore.setUser(value.user);
  if (value.theme) appStore.setTheme(value.theme);

  useEffect(() => {
    appStore.addAxiosInterceptors();
  }, []);

  return (
    <InitialContext.Provider value={useMemo(() => value, [value])}>
      {children}
    </InitialContext.Provider>
  );
};
