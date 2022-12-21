import type { SearchStore } from './search.store';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { HiFingerPrint } from 'react-icons/hi';
import { SearchStyled } from './search.style';
import { setupStoreId } from '../../helpers/stores';

export const Search: FC<{ store?: SearchStore }> = observer(({ store }) => {
  if (!store) {
    console.error('Error: Search store is null');
    return null;
  }

  setupStoreId(store);

  return (
    <SearchStyled>
      <HiFingerPrint />
    </SearchStyled>
  );
});
