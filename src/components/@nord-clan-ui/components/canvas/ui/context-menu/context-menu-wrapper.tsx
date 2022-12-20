import type { FC } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../hooks/store/useRootStore';

export const ContextMenuWrapper: FC = observer(() => {
  const store = useRootStore();

  const { settings, Component } = store.diagramSettings.contextMenuComponentState;

  return Component && <Component store={store} settings={settings} />;
});
