import type { NextPageWithLayout } from './_app';
import React from 'react';
import { HomeStyled } from '#/styles/pages/home.style';
import { Diagram } from '#/@nord-clan';

// Home component
//* ------------------------------------------------------------------------------------------ *//
const Home: NextPageWithLayout = () => {
  return (
    <HomeStyled>
      <Diagram
        initState={{
          nodes: [
            {
              id: 'node_1',
              label: 'Nord Clan',
              position: [0, 0]
            }
          ]
        }}
      />
      {/* <img src="http://localhost:3000/assets/ggd.svg" alt="ad" /> */}
    </HomeStyled>
  );
};

export default Home;
