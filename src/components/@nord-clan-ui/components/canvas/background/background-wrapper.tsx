import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BackgroundWrapperStyled } from './background-wrapper.style';
import { useCanvasStore } from '../../../hooks/store/useRootStore';

export const BackgroundWrapper: FC = observer(() => {
  const { diagramSettings, diagramState } = useCanvasStore();

  return (
    <BackgroundWrapperStyled>
      {/* <diagramSettings.backgroundComponentState.component
        diagramOffset={diagramState.offset}
        diagramZoom={diagramState.zoom}
        settings={diagramSettings.backgroundComponentState.settings}
      /> */}
    </BackgroundWrapperStyled>
  );
});
