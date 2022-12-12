import styled from '@emotion/styled';

interface IHeaderStyledProps {
  opacity: number;
}

export const HeaderFlatStyled = styled.header<IHeaderStyledProps>`
  position: fixed;

  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid ${({ theme }) => theme.palette.border.header}; */
  /* height: ${({ theme }) => theme.sizes.header.height}; */
  /* background-color: ${({ theme }) => theme.palette.bg.headerBlur}; */
  /* -webkit-backdrop-filter: blur(8px) saturate(180%); */
  backdrop-filter: blur(8px) saturate(180%);
  transition: transform 0.5s;

  left: 0;
  top: 0;
  z-index: 10;

  width: 100%;

  > nav {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      /* background-image: ${({ theme }) => theme.palette.bg.header}; */
      z-index: 0;
      content: '';
      opacity: ${({ opacity }) => opacity};
    }
  }

  * ul {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;

    margin: 0;
    padding: 0 10px;
  }

  * li {
    position: relative;

    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    span {
      margin-right: 4px;
    }

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
