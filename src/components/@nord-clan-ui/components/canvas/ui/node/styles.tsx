import type { Point } from '../../../../helpers/point';
import styled from '@emotion/styled';

//* --- NodeDefault ------------------------------------------------------------ *//
export const NodeDefaultStyled = styled.div`
  min-width: 10px;
  min-height: 10px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.palette.bg.mainContent};
  border: ${({ theme }) => theme.palette.border.content} solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//* --- NodeLabel -------------------------------------------------------------- *//
export const NodeLabelStyled = styled.div`
  padding: 5px 7px;
  text-align: center;
  margin: auto;
`;

//* --- NodeWrapper ------------------------------------------------------------ *//
interface INodeWrapperStyledProps {
  position: Point;
}
export const NodeWrapperStyled = styled.div<INodeWrapperStyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  height: fit-content;
  pointer-events: auto;

  transform: translate(${({ position }) => `${position[0]}px, ${position[1]}px`});
`;

//* --- NodesLayer ------------------------------------------------------------ *//
export const NodesLayerStyled = styled.div`
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
`;
