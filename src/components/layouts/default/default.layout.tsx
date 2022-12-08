import React, { useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';

//* Styles
import { DefaultStyled } from '#/components/layouts/default/default.style';

//* Components
import Header from '../../header/header';
import { store } from '#/store';

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
      <Header />
      <DefaultStyled>{children}</DefaultStyled>
    </>
  );
};
export default DefaultLayout;
