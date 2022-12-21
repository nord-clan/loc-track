import type { IBackgroundProps } from '../../utils/create-component/background';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { BackgroundSvgStyled } from './styles';
import { defaultSettings } from '../../utils/create-component/background';

export const SvgBackground: IBackgroundProps = observer((props) => {
  const { diagramOffset, diagramZoom, settings } = props;
  const finalSettings = settings ?? defaultSettings;

  const backgroundImage = useMemo(
    () =>
      finalSettings.imageGenerator
        ? finalSettings.imageGenerator(100 * diagramZoom, 100 * diagramZoom)
        : undefined,
    [finalSettings, finalSettings.imageGenerator, diagramZoom]
  );

  return (
    <BackgroundSvgStyled
      {...{
        backgroundColor: finalSettings.color,
        backgroundImage,
        backgroundPosition: `${diagramOffset[0]}px ${diagramOffset[1]}px`
      }}
    />
  );
});
