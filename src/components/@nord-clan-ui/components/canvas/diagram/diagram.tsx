import React from 'react';
import type { IDiagramContextProps } from './diagram-context';
import type { IDiagramInnerProps } from './diagram-inner';
import { DiagramContext } from './diagram-context';
import { DigramInner } from './diagram-inner';

export type IDiagramProps = IDiagramInnerProps & IDiagramContextProps;

export function Diagram(props: IDiagramProps) {
  const { initState, storeRef, children } = props;

  return (
    <DiagramContext initState={initState} storeRef={storeRef}>
      <DigramInner>{children}</DigramInner>
    </DiagramContext>
  );
}
