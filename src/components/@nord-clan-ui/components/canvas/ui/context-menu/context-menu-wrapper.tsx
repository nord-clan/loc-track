import type { FC } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useCanvasStore } from '../../../../hooks/store/useRootStore';

export const ContextMenuWrapper: FC = observer(() => {
  const canvasStore = useCanvasStore();

  const { settings, Component } = canvasStore.diagramSettings.contextMenuComponentState;

  return Component && <Component canvasStore={canvasStore} settings={settings} />;
});
