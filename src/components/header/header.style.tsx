import styled from '@emotion/styled';

export const HeaderStyled = styled.header`
  position: fixed;
  z-index: 3;

  .logo {
    position: fixed;

    left: 0;
    top: 0;

    display: flex;

    background-color: ${({ theme }) => theme.palette.bg.headerBlur};
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    border-right: 1px solid ${({ theme }) => theme.palette.border.header};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.header};
    border-radius: 0 0 100px 0;
    width: 70px;
    height: 70px;

    > a {
      height: 100%;
      width: 100%;
    }
  }

  .control {
    position: fixed;

    right: 0;
    top: 0;

    display: flex;

    background-color: ${({ theme }) => theme.palette.bg.headerBlur};
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    border-left: 1px solid ${({ theme }) => theme.palette.border.header};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.header};

    width: 50px;
    height: 50px;
    border-radius: 0 0 0 25px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      min-width: 20px;
      min-height: 20px;
      cursor: pointer;
    }
  }
  * {
    color: ${({ theme }) => theme.palette.color.header};
    font-size: 1rem;
  }
`;
