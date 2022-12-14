import React, { useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';

//* Styles
import { DefaultStyled } from '#/components/layouts/default/default.style';

//* Components
import { useStore } from '#/store';
import Header from '#/components/header/header';

// Default layout
//* ------------------------------------------------------------------------------------------ *//
const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  const { appStore } = useStore();

  useEffect(() => {
    appStore.updateViewport();
    appStore.updateScroll();
    window.onresize = () => appStore.updateViewport();
    window.onscroll = () => appStore.updateScroll();
  }, []);

  return (
    <>
      <DefaultStyled>{children}</DefaultStyled>
      <Header />
    </>
  );
};
export default DefaultLayout;
