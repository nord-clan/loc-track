import React, { useMemo } from 'react';
import type { PropsWithChildren, FC } from 'react';
import type { ITooltipController, ITooltipProps } from './tooltip.store';
import type { TControllerRef } from '../../helpers';
import { observer } from 'mobx-react-lite';
import { TooltipStore } from './tooltip.store';
import { TooltipStyled } from './tooltip.style';
import {
  useFloating,
  autoUpdate,
  offset as _offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal
} from '@floating-ui/react';
import { setController, useNewStore } from '../../helpers/stores';

export const Tooltip: FC<
  PropsWithChildren<ITooltipProps> & {
    controllerRef?: TControllerRef<ITooltipController>;
  }
> = observer((props) => {
  const { controllerRef, children, ...restProps } = props;

  const store = useNewStore(TooltipStore, restProps);
  if (controllerRef) {
    setController(store, controllerRef);
  }
  const { state, settings, placement, offset } = store;
  const { isVisible, title } = state;

  const { x, y, reference, floating, strategy, context } = useFloating({
    open: isVisible,
    onOpenChange: store.setIsVisible,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [_offset(offset), flip(), shift()]
  });

  const { hoverProps, focusProps, dismissProps, roleProps } = settings;
  // Event listeners to change the open state
  const hover = useHover(context, hoverProps);
  const focus = useFocus(context, focusProps);
  const dismiss = useDismiss(context, dismissProps);
  // Role props for screen readers
  const role = useRole(context, roleProps);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const childrenElements = useMemo(
    () =>
      React.isValidElement(children)
        ? React.cloneElement(
            children,
            getReferenceProps({
              ref: reference
            })
          )
        : null,
    []
  );

  return (
    <>
      {childrenElements}
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
    </>
  );
});
