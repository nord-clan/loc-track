import type { IPoint } from '../../../../helpers/point';
import styled from '@emotion/styled';

interface IProps {
  isVisible: boolean;
  position: IPoint;
}

export const ContextMenuStyled = styled.div<IProps>`
  position: fixed;
  width: 300px;
  height: 400px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.palette.bg.headerBlur};
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid ${({ theme }) => theme.palette.border.content};
  padding: 16px;
  color: ${({ theme }) => theme.palette.color.textInvert};
  user-select: none;
  font-size: 1rem;
  font-weight: 500;

  top: ${({ position }) => position[1]}px;
  left: ${({ position }) => position[0]}px;
  overflow: visible;
  transform-origin: 0px 0px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')}; ;
`;
