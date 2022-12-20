import styled from '@emotion/styled';

export const SearchStyled = styled.div`
  position: fixed;
  top: 0;
  left: calc(50% - 100px);
  z-index: 10;

  background-color: ${({ theme }) => theme.palette.bg.mainContent};
  border: 2px solid ${({ theme }) => theme.palette.border.content};
  border-radius: 10px;
  color: ${({ theme }) => theme.palette.color.text};
  min-width: 200px;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
`;
