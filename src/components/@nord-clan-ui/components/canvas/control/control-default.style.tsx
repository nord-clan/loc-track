import styled from '@emotion/styled';

interface IControlDefaultButtonStyledProps {
  width: string;
  height: string;
  padding: number;
}
export const ControlDefaultButtonStyled = styled.button<IControlDefaultButtonStyledProps>`
  background-color: white;
  border: 1px solid rgb(209, 209, 209);
  color: black;
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
      background-color: rgb(228, 228, 228);
    }
  }
`;
