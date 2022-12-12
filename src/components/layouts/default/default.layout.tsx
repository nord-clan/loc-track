import React, { useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';

//* Styles
import { DefaultStyled } from '#/components/layouts/default/default.style';

//* Components
import { store } from '#/store';
import Header from '#/components/header/header';

// Default layout
//* ------------------------------------------------------------------------------------------ *//
const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    store.appStore.updateViewport();
    store.appStore.updateScroll();

    window.onresize = () => {
      store.appStore.updateViewport();
    };
    window.onscroll = () => {
      store.appStore.updateScroll();
    };
  }, []);

  return (
    <>
      <DefaultStyled>{children}</DefaultStyled>
      <Header />
    </>
  );
};
export default DefaultLayout;
