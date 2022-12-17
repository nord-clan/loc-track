import styled from '@emotion/styled';

export const LayoutLayerStyled = styled.div`
  position: absolute;
  /* We cannot set it to 100% of parent (and there is not need in this) because if parent will be smaller than node
  then browser will try to shrink node */
  width: 1000px;
  height: 1000px;
  top: 0;
  left: 0;
  overflow: visible;
  transform-origin: 0px 0px;
  /* useGestures hook use targetTouches instead of simply touches, 
  so we should set this property to Movable, otherwise if user put 
  one finger above Movable and another above DiagramInner, the hook 
  will not trigger pinch gesture */
  pointer-events: none;

  > svg {
    transform: scale(3);
  }
`;
