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
          <h4>События</h4>
        </PanelHeaderStyled>
        <PanelContentStyled>
          <div className="panel-content">
            <hr />
            <div className="events">
              <div className="past">прошедшие</div>
              <div className="active">активные</div>
              <div className="future">планируемые</div>
            </div>
            <hr />
          </div>
        </PanelContentStyled>
      </Panel>
      {children}
    </>
  );
};
export default HomeLayout;
