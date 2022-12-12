import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BackgroundWrapperStyled } from './background-wrapper.style';
import { useCanvasStore } from '../../../hooks/store/useRootStore';

export const BackgroundWrapper: FC = observer(() => {
  const canvasStore = useCanvasStore();

  const { diagramSettings, diagramState } = canvasStore;

  const { offset, zoom } = diagramState;
  const {
    backgroundComponentState: { settings, Component }
  } = diagramSettings;

  return (
    <BackgroundWrapperStyled>
      <Component diagramOffset={offset} diagramZoom={zoom} settings={settings} />
    </BackgroundWrapperStyled>
  );
});
