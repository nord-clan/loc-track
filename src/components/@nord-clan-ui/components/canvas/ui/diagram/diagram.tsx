import type { FC } from 'react';
import type { IDiagramContextProps } from './diagram-context';
import type { IDiagramInnerProps } from './diagram-inner';
import { DiagramContext } from './diagram-context';
import { DigramInner } from './diagram-inner';
import { ControlWrapper } from '../control/control-wrapper';

export type IDiagramProps = IDiagramInnerProps & IDiagramContextProps;

export const Diagram: FC<IDiagramProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <DiagramContext {...rest}>
      <DigramInner>{children}</DigramInner>
      <ControlWrapper />
    </DiagramContext>
  );
};
