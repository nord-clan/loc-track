import styled from '@emotion/styled';

//* --- PanelHeader ------------------------------------------------------------ *//
export const PanelHeaderStyled = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;

  > svg {
    color: ${({ theme }) => theme.palette.bg.header};
    min-height: 36px;
    min-width: 36px;
    cursor: pointer;
  }
`;

//* --- PanelContent ------------------------------------------------------------ *//
export const PanelContentStyled = styled.div`
  height: 100%;

  .events {
    display: flex;
    flex-direction: row;
    gap: 5px;

    padding: 5px;
    font-size: 0.75rem;
  }
`;
