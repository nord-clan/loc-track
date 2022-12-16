import React, { useState } from 'react';
import type { PropsWithChildren, MutableRefObject, FC } from 'react';
import type { ITooltipController, ITooltipParams } from './tooltip.store';
import { usePopper } from 'react-popper';
import { observer } from 'mobx-react-lite';
import { TooltipStore } from './tooltip.store';
import { TooltipStyled } from './tooltip.style';
import { useNewStore, setController } from '../../helpers/stores';

type ITooltipProps = PropsWithChildren<
  {
    controllerRef?: MutableRefObject<ITooltipController | undefined>;
  } & ITooltipParams
>;

export const Tooltip: FC<ITooltipProps> = (props) => {
  const { controllerRef, children, ...restProps } = props;

  const store = useNewStore(TooltipStore, restProps);
  const { show, hide } = store;

  if (controllerRef) {
    setController(store, controllerRef);
  }

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  if (!restProps.title) return <>{children}</>;

  return (
    <TooltipStyled>
      <div onMouseEnter={show} onMouseLeave={hide} ref={setReferenceElement}>
        {children}
      </div>
      <InnerTooltip store={store} referenceElement={referenceElement} />
    </TooltipStyled>
  );
};

const InnerTooltip = observer(
  (props: { store: TooltipStore; referenceElement: HTMLDivElement | null }) => {
    const { isVisible } = props.store.state;

    return !isVisible ? null : <PopperedTooltip {...props} />;
  }
);

interface IPopperedTooltipProps {
  store: TooltipStore;
  referenceElement: HTMLDivElement | null;
}

const PopperedTooltip: FC<IPopperedTooltipProps> = observer((props) => {
  const { store, referenceElement } = props;

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { placement } = store.props;
  const { title } = store.state;
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      }
    ]
  });

  return (
    <div className="tooltip" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {title}
    </div>
  );
});
