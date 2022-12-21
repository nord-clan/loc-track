import type { IContextMenuProps } from '../../utils/create-component/context-menu';
import { observer } from 'mobx-react-lite';
import { ContextMenuStyled } from './styles';

export const ContextMenu: IContextMenuProps = observer((props) => {
  const {
    store: { diagramState },
    settings
  } = props;

  const { clickPosition, isContextMenuVisible } = diagramState;

  return (
    <ContextMenuStyled
      isVisible={isContextMenuVisible ?? settings?.isVisible}
      position={clickPosition ?? settings?.position}>
      ContextMenu
    </ContextMenuStyled>
  );
});
