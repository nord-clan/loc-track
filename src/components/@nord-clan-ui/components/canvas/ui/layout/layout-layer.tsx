import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { LayoutLayerStyled } from './styles';

export const LayoutLayer: FC<{ transform: string }> = observer(({ transform }) => {
  return (
    <LayoutLayerStyled style={{ transform }}>
      <Image src="/assets/office.svg" alt="" width={1500} height={1500} />
    </LayoutLayerStyled>
  );
});
