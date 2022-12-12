import type { Point } from '../../../helpers/point';
import styled from '@emotion/styled';

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
