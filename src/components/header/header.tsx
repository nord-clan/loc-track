import type { FC } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '#/store';
import { HeaderStyled } from './header.style';
import Image from 'next/image';

//* Components
import Link from 'next/link';
import type { ThemeVarious } from '#/contexts/theme';

//* icons
import { GiSun, GiNightSleep } from 'react-icons/gi';
import { IoMdRainy, IoIosApps, IoIosAppstore } from 'react-icons/io';

const themeIcon = new Map<ThemeVarious, JSX.Element>([
  ['light', <GiSun key={1} />],
  ['dark', <GiNightSleep key={2} />],
  ['blue', <IoMdRainy key={3} />]
]);

// Header component
//* ------------------------------------------------------------------------------------------ *//
const Header: FC = observer(() => {
  const { appStore, leftPanelStore, rightPanelStore } = useStore();
  const {
    state: { theme },
    switchTheme
  } = appStore;

  return (
    <HeaderStyled>
      <div className="logo">
        <Link href="/">
          <Image alt="logo" src="/assets/nord-clan.svg" width={50} height={50} />
        </Link>
      </div>
      <div className="control">
        <span onClick={leftPanelStore.switchVisible}>
          <IoIosApps />
        </span>
        <span onClick={rightPanelStore.switchVisible}>
          <IoIosAppstore />
        </span>
        <span onClick={switchTheme}>{themeIcon.get(theme)}</span>
      </div>
      {/* <Menu /> */}
    </HeaderStyled>
  );
});

export default Header;
