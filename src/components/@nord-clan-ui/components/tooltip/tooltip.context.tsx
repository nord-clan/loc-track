import type { ITooltipProps } from './tooltip';
import type { FC, ReactNode } from 'react';
import { cloneElement, isValidElement, useMemo, createContext, useContext } from 'react';
import { setController, useNewStore } from '../../helpers/stores';
import { TooltipStore } from './tooltip.store';
import {
  autoUpdate,
  flip,
  offset as _offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react';

type ITooltipContext = {
  root: ReactNode;
  store: TooltipStore;
} & ReturnType<typeof useFloating> &
  ReturnType<typeof useInteractions>;

const TooltipContext = createContext<ITooltipContext>({} as ITooltipContext);

type ITooltipContextProps = ITooltipProps & { childrenRoot: ReactNode };
export const TooltipContextProvider: FC<ITooltipContextProps> = (props) => {
  const { children, childrenRoot, controllerRef, ...rest } = props;

  const store = useNewStore(TooltipStore, rest);
  if (controllerRef) setController(store, controllerRef);

  const { state, settings, placement, offset } = store;

  const floating = useFloating({
    open: state.isVisible,
    onOpenChange: store.setIsVisible,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [_offset(offset), flip(), shift()]
  });

  const { context, reference } = floating;
  const { hoverProps, focusProps, dismissProps, roleProps } = settings;

  const hover = useHover(context, hoverProps); // Event listeners to change the open state
  const focus = useFocus(context, focusProps); //       ^
  const dismiss = useDismiss(context, dismissProps); // ^
  const role = useRole(context, roleProps); // Role props for screen readers

  // Merge all the interactions into prop getters
  const interactions = useInteractions([hover, focus, dismiss, role]);

  const root = useMemo(
    () =>
      isValidElement(childrenRoot)
        ? cloneElement(
            childrenRoot,
            interactions.getReferenceProps({
              ref: reference
            })
          )
        : null,
    []
  );

  return (
    <TooltipContext.Provider value={{ ...interactions, ...floating, root, store }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};
