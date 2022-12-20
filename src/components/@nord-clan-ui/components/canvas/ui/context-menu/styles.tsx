import type { IPoint } from '../../../../helpers/point';
import styled from '@emotion/styled';

interface IProps {
  isVisible: boolean;
  position: IPoint;
}

export const ContextMenuStyled = styled.div<IProps>`
  position: fixed;
  width: 100px;
  height: 100px;
  /* top: 0; */
  /* left: 0; */
  background-color: red;
  top: ${({ position }) => position[1]}px;
  left: ${({ position }) => position[0]}px;
  overflow: visible;
  transform-origin: 0px 0px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')}; ;
`;
