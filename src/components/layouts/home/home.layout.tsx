import React from 'react';
import type { FC, PropsWithChildren } from 'react';

//* Styles
import { Panel, Search } from '#/@nord-clan/';
import { useStore } from '#/store';

// Home layout
//* ------------------------------------------------------------------------------------------ *//
const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  const { leftPanelStore, rightPanelStore, searchStore } = useStore();

  return (
    <>
      <Search store={searchStore} />
      <Panel store={leftPanelStore}>1</Panel>
      <Panel store={rightPanelStore}>2</Panel>
      {children}
    </>
  );
};
export default HomeLayout;
