import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../hooks/store/useRootStore';

export const ControlWrapper: FC = observer(() => {
  const store = useRootStore();

  const { settings, Component } = store.diagramSettings.controlComponentState;

  return Component && <Component store={store} settings={settings} />;
});
