import styled from '@emotion/styled';

//* --- PanelHeader ------------------------------------------------------------ *//
export const PanelHeaderStyled = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding-left: 20px;

  > svg {
    color: ${({ theme }) => theme.palette.bg.header};
    min-height: 36px;
    min-width: 36px;
    cursor: pointer;
  }

  > h4 {
    margin: 0;
  }
`;

//* --- PanelContent ------------------------------------------------------------ *//
export const PanelContentStyled = styled.div`
  .panel-content {
    display: flex;
    flex-direction: column;

    hr {
      height: 1px;
      width: 100%;
      margin: 6px 0;
    }

    .events {
      user-select: none;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      gap: 5px;

      padding: 5px;
      font-size: 0.75rem;

      > div {
        padding: 2px 8px;
        border-radius: 25px;
        border: 1px solid ${({ theme }) => theme.palette.border.header};
        cursor: pointer;
      }

      .past {
        background-color: #480714;
      }

      .active {
        background-color: #063313;
      }

      .future {
        background-color: #002b35;
      }
    }
  }

  height: 100%;
`;
