import type { SearchStore } from './search.store';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import { getId } from '../../helpers';
import { HiFingerPrint } from 'react-icons/hi';
import { SearchStyled } from './search.style';

export const Search: FC<{ store?: SearchStore }> = observer(({ store }) => {
  if (!store) {
    console.error('Error: Search store is null');
    return null;
  }

  const id = useRef<string>(getId());

  useEffect(() => {
    store.components.add(id.current);
    return () => {
      store.components.remove(id.current);
    };
  }, []);

  return (
    <SearchStyled>
      <HiFingerPrint />
    </SearchStyled>
  );
});
