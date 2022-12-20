/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { FC, ReactNode } from 'react';
import type { IControlProps } from '../../utils/create-component/control';
import { getOffsetStyles, defaultSettings } from '../../utils/create-component/control';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ControlDefaultButtonStyled, ControlDefaultStyled as ControlStyled } from './styles';
import { TbResize } from 'react-icons/tb';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

export const Control: IControlProps = observer((props) => {
  const {
    store: { diagramState },
    settings
  } = props;

  const finalSettings = settings ?? defaultSettings;
  const { buttons, buttonsSize } = finalSettings;
  const { zoomIn, zoomOut, zoomToFit } = buttons;

  const style = useMemo(
    () => ({
      ...getOffsetStyles(finalSettings),
      ...finalSettings?.style
    }),
    [finalSettings]
  );

  if (Object.values(buttons).every((v) => v === false)) return null;

  return (
    <ControlStyled {...(style as ReturnType<typeof getOffsetStyles>)}>
      <Button isVisible={!!zoomIn} size={buttonsSize} onClick={diagramState.zoomIn}>
        <AiOutlineZoomIn />
      </Button>
      <Button isVisible={!!zoomOut} size={buttonsSize} onClick={diagramState.zoomOut}>
        <AiOutlineZoomOut />
      </Button>
      <Button isVisible={!!zoomToFit} size={buttonsSize} onClick={diagramState.zoomToFit}>
        <TbResize />
      </Button>
    </ControlStyled>
  );
});

interface IButton {
  isVisible: boolean;
  size: number;
  onClick: () => unknown;
  children?: ReactNode;
}
export const Button: FC<IButton> = (props) => {
  const { isVisible, onClick, size, children } = props;

  if (!isVisible) return null;

  return (
    <ControlDefaultButtonStyled
      type="button"
      onClick={onClick}
      {...{
        width: `${size}px`,
        height: `${size}px`,
        padding: 5
      }}>
      {children}
    </ControlDefaultButtonStyled>
  );
};
