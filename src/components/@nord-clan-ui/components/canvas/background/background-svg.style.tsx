import styled from '@emotion/styled';

interface IBackgroundSvgStyledProps {
  backgroundColor: string;
  backgroundPosition: string;
  backgroundImage?: string;
}
export const BackgroundSvgStyled = styled.div<IBackgroundSvgStyledProps>`
  height: 100%;
  width: 100%;

  ${({ backgroundColor, backgroundImage, backgroundPosition, theme }) => `
    background-color: ${
      backgroundColor !== 'transparent' ? backgroundColor : theme.palette.bg.canvas
    };
    ${backgroundImage ? `background-image: ${backgroundImage};` : ''}
    background-position: ${backgroundPosition};
  `}
`;
