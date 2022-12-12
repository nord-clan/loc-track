import type { FC, ReactNode } from 'react';
import type { IControlComponentProps } from '../store/diagram/diagram-settings.store';
import type { IComponentDefinition } from '../store/visual-component/visual-component-state.store';
import type { CornerPosition } from '../../../helpers/position';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ControlDefaultButtonStyled, ControlDefaultStyled } from './control-default.style';
import { TbResize } from 'react-icons/tb';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

const ControlDefault: FC<IControlComponentProps<IControlDefaultSettings>> = observer((props) => {
  const {
    canvasStore: { diagramState },
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
    <ControlDefaultStyled {...(style as ReturnType<typeof getOffsetStyles>)}>
      <Button isVisible={!!zoomIn} size={buttonsSize} onClick={diagramState.zoomIn}>
        <AiOutlineZoomIn />
      </Button>
      <Button isVisible={!!zoomOut} size={buttonsSize} onClick={diagramState.zoomOut}>
        <AiOutlineZoomOut />
      </Button>
      <Button isVisible={!!zoomToFit} size={buttonsSize} onClick={diagramState.zoomToFit}>
        <TbResize />
      </Button>
    </ControlDefaultStyled>
  );
});

function getOffsetStyles(settings: IControlDefaultSettings) {
  return {
    top:
      settings.position === 'left-top' || settings.position === 'right-top'
        ? settings.parentOffset
        : undefined,
    right:
      settings.position === 'right-bottom' || settings.position === 'right-top'
        ? settings.parentOffset
        : undefined,
    bottom:
      settings.position === 'left-bottom' || settings.position === 'right-bottom'
        ? settings.parentOffset
        : undefined,
    left:
      settings.position === 'left-top' || settings.position === 'left-bottom'
        ? settings.parentOffset
        : undefined
  };
}

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

export const createDefaultControl = (
  settings?: Partial<IControlDefaultSettings>
): IComponentDefinition<IControlComponentProps, IControlDefaultSettings> => {
  const finalSettings = {
    ...defaultSettings,
    ...(settings || {})
  };

  return {
    Component: ControlDefault,
    settings: finalSettings
  };
};

const defaultSettings: IControlDefaultSettings = {
  position: 'left-bottom',
  buttonsSize: 30,
  buttons: {
    zoomIn: true,
    zoomOut: true,
    deleteSelection: true,
    cloneSelectedNodes: true,
    zoomToFit: true,
    lockUnlockPointerInteractions: true
  },
  parentOffset: 20
};

export interface IControlDefaultSettings {
  classes?: string[];
  style?: React.CSSProperties;
  position?: CornerPosition;
  buttons: IButtonsValue;
  buttonsSize: number;
  parentOffset?: number;
}

interface IButtonsValue {
  zoomIn?: boolean;
  zoomOut?: boolean;
  deleteSelection?: boolean;
  cloneSelectedNodes?: boolean;
  zoomToFit?: boolean;
  lockUnlockPointerInteractions?: boolean;
}
