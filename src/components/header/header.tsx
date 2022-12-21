import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '#/store';
import { HeaderStyled } from './header.style';
import Image from 'next/image';

//* Components
import Link from 'next/link';
import type { ThemeVarious } from '#/contexts/theme';

//* icons
import { GiSun, GiNightSleep } from 'react-icons/gi';
import { IoMdRainy } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { BiSearchAlt } from 'react-icons/bi';
import { MdEventNote } from 'react-icons/md';

const themeIcon = new Map<ThemeVarious, JSX.Element>([
  ['light', <GiSun key={1} />],
  ['dark', <GiNightSleep key={2} />],
  ['blue', <IoMdRainy key={3} />]
]);

// Header component
//* ------------------------------------------------------------------------------------------ *//
const Header: FC = observer(() => {
  const { appStore, rightPanelStore } = useStore();
  const {
    state: { theme },
    switchTheme
  } = appStore;

  return (
    <HeaderStyled>
      <div className="logo">
        <Link href="/">
          <Image alt="Nord clan" src="/assets/nord-clan-bigger.svg" width={145} height={50} />
        </Link>
      </div>
      <div className="control">
        <span>
          <BiSearchAlt />
        </span>
        <span onClick={rightPanelStore.switchVisible}>
          <MdEventNote />
        </span>
        <span onClick={switchTheme}>{themeIcon.get(theme)}</span>
        <div className="profile">
          <CgProfile />
        </div>
      </div>
      {/* <Menu /> */}
    </HeaderStyled>
  );
});

export default Header;
