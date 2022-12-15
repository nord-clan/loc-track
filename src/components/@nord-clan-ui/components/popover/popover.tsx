/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { HTMLProps, FC, PropsWithChildren } from 'react';
import { cloneElement, isValidElement, forwardRef, useMemo } from 'react';
import type { Placement } from '@floating-ui/react';
import {
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

// interface IPopoverTriggerProps {
//   store: PopoverStore;
// }

// export const PopoverTrigger = forwardRef<HTMLElement, PropsWithChildren<IPopoverTriggerProps>>(
//   function PopoverTrigger(props, propRef) {
//     const { children, store } = props;
//     const { state } = store;

//     const childrenRef = (children as HTMLProps<HTMLDivElement>)?.ref;

//     const ref = useMemo(
//       () => mergeRefs([reference, propRef, childrenRef]),
//       [reference, propRef, childrenRef]
//     );

//     if (isValidElement(children)) {
//       return cloneElement(
//         children,
//         getReferenceProps({
//           ref,
//           ...props,
//           ...children.props,
//           'data-state': state.isVisible ? 'open' : 'closed'
//         })
//       );
//     }

//     return null;
//   }
// );

// export const PopoverContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
//   function PopoverContent(props, propRef) {
//     const { children } = props;

//     const ref = useMemo(() => mergeRefs([state.floating, propRef]), [state.floating, propRef]);

//     return (
//       <FloatingPortal>
//         {state.open && (
//           <FloatingFocusManager context={state.context} modal={state.modal}>
//             <div
//               ref={ref}
//               style={{
//                 position: state.strategy,
//                 top: state.y ?? 0,
//                 left: state.x ?? 0,
//                 width: 'max-content',
//                 ...props.style
//               }}
//               aria-labelledby={state.labelId}
//               aria-describedby={state.descriptionId}
//               {...state.getFloatingProps(props)}>
//               {children}
//             </div>
//           </FloatingFocusManager>
//         )}
//       </FloatingPortal>
//     );
//   }
// );

export const Popover: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const store = useNewStore(PopoverStore);
  const { setIsVisible, state } = store;

  const floating = useFloating({
    placement: 'top',
    open: state.isVisible,
    onOpenChange: store.setIsVisible,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()]
  });
  const { context } = floating;

  const click = useClick(context, {
    enabled: state.isVisible == null
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);

  const data = useMemo(
    () => ({
      open: state.isVisible,
      setOpen: setIsVisible,
      ...interactions,
      ...floating
    }),
    []
  );

  return <div>1</div>;

  // return (
  //   <>
  //     <PopoverTrigger store={store}>{children}</PopoverTrigger>
  //     <PopoverContent>ggd</PopoverContent>
  //   </>
  // );
};
