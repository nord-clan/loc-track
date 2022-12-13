import type { FC } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '#/store';
import { HeaderFlatStyled } from './header-flat.style';
import Image from 'next/image';

//* Components
import Link from 'next/link';
import type { ThemeVarious } from '#/contexts/theme';

//* icons
import { GiSun, GiNightSleep } from 'react-icons/gi';
import { IoMdRainy } from 'react-icons/io';

const themeIcon = new Map<ThemeVarious, JSX.Element>([
  ['light', <GiSun key={1} />],
  ['dark', <GiNightSleep key={2} />],
  ['blue', <IoMdRainy key={3} />]
]);

// Header flat component
//* ------------------------------------------------------------------------------------------ *//
const HeaderFlat: FC = observer(() => {
  const { appStore } = useStore();
  const {
    state: { theme },
    switchTheme,
    headerOpacity
  } = appStore;

  return (
    <HeaderFlatStyled opacity={headerOpacity}>
      <nav>
        <div>
          <ul>
            <li>
              <Link href="/">
                <Image alt="Nord Clan" src="/assets/nord-clan-bigger.svg" width={50} height={50} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li onClick={switchTheme}>{themeIcon.get(theme)}</li>
          </ul>
        </div>
      </nav>
      {/* <Menu /> */}
    </HeaderFlatStyled>
  );
});

export default HeaderFlat;
