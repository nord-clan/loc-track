import styled from '@emotion/styled';

export const HomeStyled = styled.div`
  position: relative;
  height: calc(100vh - ${({ theme }) => theme.sizes.header.height});
`;
