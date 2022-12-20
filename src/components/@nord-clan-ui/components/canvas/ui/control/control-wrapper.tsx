import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useCanvasStore } from '../../../../hooks/store/useRootStore';

export const ControlWrapper: FC = observer(() => {
  const canvasStore = useCanvasStore();

  const { settings, Component } = canvasStore.diagramSettings.controlComponentState;

  return Component && <Component canvasStore={canvasStore} settings={settings} />;
});
