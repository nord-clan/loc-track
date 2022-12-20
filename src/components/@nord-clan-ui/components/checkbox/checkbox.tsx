import type { CheckboxStore, ICheckboxStoreParams } from './checkbox.store';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { HiFingerPrint } from 'react-icons/hi';
import { CheckboxStyled } from './checkbox.style';
import { setupStoreId } from '../../helpers/stores';

export const Checkbox: FC<{ store?: CheckboxStore }> = observer(({ store }) => {
  if (!store) {
    console.error('Error: Checkbox store is null');
    return null;
  }

  const { onClick, label, labelActive } = store.getParams<ICheckboxStoreParams>();
  const { isDisabled, isVisible } = store.state;

  const id = setupStoreId(store);

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
