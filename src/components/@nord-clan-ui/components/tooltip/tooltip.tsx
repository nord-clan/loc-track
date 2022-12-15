import React from 'react';
import type { PropsWithChildren, FC } from 'react';
import type { ITooltipController, ITooltipSettings } from './tooltip.store';
import type { TControllerRef } from '../../helpers';
import type { Placement } from '@floating-ui/react';
import { FloatingPortal } from '@floating-ui/react';
import { observer } from 'mobx-react-lite';
import { TooltipContextProvider, useTooltip } from './tooltip.context';
import { TooltipStyled } from './tooltip.style';

export type ITooltipProps = PropsWithChildren<{
  title: string;
  placement?: Placement;
  offset?: number;
  settings?: ITooltipSettings;
  controllerRef?: TControllerRef<ITooltipController>;
}>;

export const Tooltip: FC<ITooltipProps> = observer((props) => {
  return (
    <TooltipContextProvider {...{ ...props, childrenRoot: props.children }}>
      <TooltipRoot />
      <TooltipInner />
    </TooltipContextProvider>
  );
});

export const TooltipInner: FC = observer(() => {
  const { store, getFloatingProps, strategy, x, y, floating } = useTooltip();
  const { isVisible, title } = store.state;

  return (
    <FloatingPortal>
      {isVisible && (
        <TooltipStyled
          ref={floating}
          style={{
            // Positioning styles
            position: strategy,
            top: y ?? 0,
            left: x ?? 0
          }}
          {...getFloatingProps()}>
          {title}
        </TooltipStyled>
      )}
    </FloatingPortal>
  );
});

export const TooltipRoot: FC = observer(() => {
  const { root } = useTooltip();
  return <>{root}</>;
});
