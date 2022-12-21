import styled from '@emotion/styled';

export const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  z-index: 3;

  .logo {
    position: fixed;

    left: 0;
    top: 0;

    background-color: ${({ theme }) => theme.palette.bg.headerBlur};
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    border-right: 1px solid ${({ theme }) => theme.palette.border.header};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.header};
    border-radius: 0 0 25px 0;
    padding: 2px;
    width: 130px;
    height: 64px;

    > a {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;

      padding: 0px;
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

    padding: 0 10px;
    width: auto;
    height: 50px;
    border-radius: 0 0 0 25px;

    display: flex;
    gap: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      min-width: 20px;
      min-height: 20px;
      color: ${({ theme }) => theme.palette.color.header};
      font-size: 1rem;

      &:hover {
        color: ${({ theme }) => theme.palette.bg.highlight};
      }
      transition: 0.1s ease-in-out color;
      cursor: pointer;
    }

    .profile {
      border-left: 1px solid ${({ theme }) => theme.palette.border.header};

      padding-left: 6px;

      svg {
        min-width: 34px;
        min-height: 34px;
      }
    }
  }
`;
