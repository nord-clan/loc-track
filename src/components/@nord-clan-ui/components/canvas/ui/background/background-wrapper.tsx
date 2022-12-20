import React from 'react';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../hooks/store/useRootStore';
import { BackgroundWrapperStyled } from './styles';

export const BackgroundWrapper: FC = observer(() => {
  const store = useRootStore();

  const { diagramSettings, diagramState } = store;

  const { offset, zoom } = diagramState;
  const { settings, Component } = diagramSettings.backgroundComponentState;

  return (
    <BackgroundWrapperStyled>
      <Component diagramOffset={offset} diagramZoom={zoom} settings={settings} />
    </BackgroundWrapperStyled>
  );
});
