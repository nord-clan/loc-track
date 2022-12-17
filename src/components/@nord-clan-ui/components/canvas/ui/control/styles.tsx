import styled from '@emotion/styled';

interface IControlDefaultStyledProps {
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
}
export const ControlDefaultStyled = styled.div<IControlDefaultStyledProps>`
  position: absolute;
  height: fit-content;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.bg.mainContent};
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.border.content};

  ${({ bottom, left, right, top }) => `
    ${bottom ? `bottom: ${bottom}px;` : ''};
    ${left ? `left: ${left}px;` : ''};
    ${right ? `right: ${right}px;` : ''};
    ${top ? `top: ${top}px;` : ''};
  `}
`;

interface IControlDefaultButtonStyledProps {
  width: string;
  height: string;
  padding: number;
}
export const ControlDefaultButtonStyled = styled.button<IControlDefaultButtonStyledProps>`
  /* background-color: ${({ theme }) => theme.palette.bg.mainContent}; */
  color: ${({ theme }) => theme.palette.color.text};
  padding: 2px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;

  ${({ width, height, padding }) => `
    width:${width};
    height:${height};
    padding:${padding};
  `}

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.palette.bg.highlight};
    }
  }
`;
