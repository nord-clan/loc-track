import type { IContextMenuProps } from '../../utils/create-component/context-menu';
import { observer } from 'mobx-react-lite';
import { ContextMenuStyled } from './styles';

export const ContextMenu: IContextMenuProps = observer(() => {
  return <ContextMenuStyled>ContextMenu</ContextMenuStyled>;
});
