import React from 'react';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { LayoutLayerStyled } from './layout-layer.style';
import Office from '../../../../../../public/assets/office.svg';

export const LayoutLayer: FC<{ transform: string }> = observer(({ transform }) => {
  return (
    <LayoutLayerStyled style={{ transform }}>
      <Office />
    </LayoutLayerStyled>
  );
});
