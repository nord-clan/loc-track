import type { FC } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useCanvasStore } from '../../../hooks/store/useRootStore';

export const ControlWrapper: FC = observer(() => {
  const canvasStore = useCanvasStore();

  const {
    diagramSettings: {
      miniControlComponentState: { settings, Component }
    }
  } = canvasStore;

  return Component && <Component canvasStore={canvasStore} settings={settings} />;
});
