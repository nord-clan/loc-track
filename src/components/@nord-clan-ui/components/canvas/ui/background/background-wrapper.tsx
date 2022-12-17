import React from 'react';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useCanvasStore } from '../../../../hooks/store/useRootStore';
import { BackgroundWrapperStyled } from './styles';

export const BackgroundWrapper: FC = observer(() => {
  const canvasStore = useCanvasStore();

  const { diagramSettings, diagramState } = canvasStore;

  const { offset, zoom } = diagramState;
  const { settings, Component } = diagramSettings.backgroundComponentState;

  return (
    <BackgroundWrapperStyled>
      <Component diagramOffset={offset} diagramZoom={zoom} settings={settings} />
    </BackgroundWrapperStyled>
  );
});
