import React, { cloneElement, isValidElement, forwardRef, useMemo } from 'react';
import type { HTMLProps, FC, PropsWithChildren } from 'react';
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useRole,
  useInteractions
} from '@floating-ui/react';
import { mergeRefs } from 'react-merge-refs';
import { useNewStore } from '../../helpers/stores';
import { PopoverStore } from './popover.store';

type IPopoverAdditional = ReturnType<typeof useFloating> &
  ReturnType<typeof useInteractions> & {
    isVisible: boolean;
    setIsVisible: (value: boolean) => boolean;
    modal: boolean;
  };

interface IPopoverAdditionalProps {
  settings: IPopoverAdditional;
}

export const PopoverTrigger = forwardRef<HTMLElement, PropsWithChildren<IPopoverAdditionalProps>>(
  function PopoverTrigger(props, propRef) {
    const { children, settings } = props;
    const { reference, getReferenceProps } = settings;

    const childrenRef = (children as HTMLProps<HTMLDivElement>)?.ref;

    const refs = [reference, propRef, childrenRef].filter(
      (f) => !!f
    ) as React.ForwardedRef<HTMLElement>[];

    const ref = useMemo(() => {
      return mergeRefs(refs);
    }, [reference, propRef, childrenRef]);

    if (isValidElement(children)) {
      return cloneElement(
        children,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        getReferenceProps({
          ref,
          ...props,
          ...children.props
        })
      );
    }

    return null;
  }
);

export const PopoverContent = forwardRef<HTMLElement, PropsWithChildren<IPopoverAdditionalProps>>(
  function PopoverContent(props, propRef) {
    const { children, settings } = props;
    const { floating, modal, isVisible, context, strategy, x, y, getFloatingProps } = settings;

    const ref = useMemo(() => mergeRefs([floating, propRef]), [floating, propRef]);

    return (
      <FloatingPortal>
        {isVisible && (
          <FloatingFocusManager context={context} modal={modal}>
            <div
              ref={ref}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content'
              }}
              {...getFloatingProps(props)}>
              {children}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    );
  }
);

export const Popover: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const store = useNewStore(PopoverStore);
  const {
    setIsVisible,
    state: { isVisible }
  } = store;

  const floating = useFloating({
    placement: 'top',
    open: isVisible,
    onOpenChange: setIsVisible,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()]
  });
  const { context } = floating;

  const click = useClick(context, { enabled: isVisible == null });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);

  const settings: IPopoverAdditional = useMemo(
    () => ({
      isVisible,
      setIsVisible,
      modal: false,
      ...interactions,
      ...floating
    }),
    [isVisible]
  );

  return (
    <>
      <PopoverTrigger settings={settings}>{children}</PopoverTrigger>
      <PopoverContent settings={settings}>ggd</PopoverContent>
    </>
  );
};
