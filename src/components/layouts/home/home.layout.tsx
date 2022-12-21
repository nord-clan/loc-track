import type { FC, PropsWithChildren } from 'react';
import { Panel, Search } from '#/@nord-clan';
import { useStore } from '#/store';

//* Styles
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { PanelHeaderStyled, PanelContentStyled } from './home.style';

// Home layout
//* ------------------------------------------------------------------------------------------ *//
const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  const { rightPanelStore, searchStore } = useStore();

  return (
    <>
      <Search store={searchStore} />
      <Panel store={rightPanelStore}>
        <PanelHeaderStyled>
          <CloseIcon onClick={() => rightPanelStore.setIsVisible(false)} />
        </PanelHeaderStyled>
        <PanelContentStyled>
          <div className="events">
            <div>прощедшие</div>
            <div>активные</div>
            <div>планируемые</div>
          </div>
        </PanelContentStyled>
      </Panel>
      {children}
    </>
  );
};
export default HomeLayout;
