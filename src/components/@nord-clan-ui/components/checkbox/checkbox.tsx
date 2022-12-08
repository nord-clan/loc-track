import type { CheckboxStore, ICheckboxStoreParams } from './checkbox.store';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import { getId } from '../../helpers';
import { HiFingerPrint } from 'react-icons/hi';
import { CheckboxStyled } from './checkbox.style';

export const Checkbox: FC<{ store?: CheckboxStore }> = observer(({ store }) => {
  if (!store) {
    console.error('Error: Checkbox store is null');
    return null;
  }

  const { onClick, label, labelActive } = store.getParams<ICheckboxStoreParams>();
  const { isDisabled, isVisible } = store.state;

  const id = useRef<string>(getId());

  useEffect(() => {
    store.components.add(id.current);
    return () => {
      store.components.remove(id.current);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const handlerOnClick = (e) => {
    if (!isDisabled) {
      if (onClick) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onClick(e);
      }
      store.setValue(!store.getValue());
    }
    e.preventDefault();
  };

  return (
    <CheckboxStyled isActive={store.getValue()}>
      <button onClick={handlerOnClick} type="button" key={store.components.refreshKeys[id.current]}>
        {store.getValue() ? labelActive ?? label : label}
      </button>
      <HiFingerPrint />
    </CheckboxStyled>
  );
});
