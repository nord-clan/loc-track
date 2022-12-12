import styled from '@emotion/styled';

export const NodeDefaultStyled = styled.div`
  min-width: 10px;
  min-height: 10px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.palette.bg.mainContent};
  border: ${({ theme }) => theme.palette.border.content} solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
