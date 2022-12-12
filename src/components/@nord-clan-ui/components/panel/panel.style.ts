import styled from '@emotion/styled';

export type ISide = 'left' | 'right';

interface IPanelStyledProps {
  isVisible: boolean;
  width?: string;
  side: ISide;
}
export const PanelStyled = styled.div<IPanelStyledProps>`
  position: fixed;
  ${({ side }) => `
    ${side === 'left' ? 'right' : 'left'}: 0;
  `}
  top: 0;
  z-index: 1;

  min-height: 100vh;
  height: 100%;
  width: ${({ width }) => width || '300px'};
  padding-top: ${({ theme }) => theme.sizes.header.height};

  transform: translateX(
    ${({ side, width, isVisible }) => `
    ${
      // eslint-disable-next-line no-nested-ternary
      !isVisible
        ? side === 'left'
          ? `
        calc(${width || '300px'} + 40px)
        `
          : `
        calc((${width || '300px'} + 40px) * -1)
        `
        : '0'
    }
  `}
  );

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);

  > section {
    height: 100%;
    background: ${({ theme }) => theme.palette.bg.panelGradient};
    color: ${({ theme }) => theme.palette.color.panel};
  }

  > div {
    position: absolute;
    top: ${({ theme }) => theme.sizes.header.height};
    transform: rotate(90deg);
    ${({ side }) => `
      ${side === 'left' ? 'left: 0;' : 'right: -40px;'}
    `}
    top: 0;

    > svg {
      position: absolute;

      width: 100vh;
      height: 40px;
      ${({ side }) => `
        ${side === 'left' ? 'transform: rotate(-180deg);' : 'transform: rotate(0deg);'}
      `}
      fill: ${({ theme }) => theme.palette.bg.panel};

      &:first-child {
        filter: blur(8px) saturate(180%);
      }
    }
  }
`;
