import type { NextPageWithLayout } from './_app';
import React from 'react';
import { Diagram } from '#/components/@nord-clan-ui/components/canvas/diagram/diagram';
import { HomeStyled } from '#/styles/pages/home.style';

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
              label: 'Node 1',
              position: [300, 300]
            }
          ]
        }}
      />
      {/* <img src="http://localhost:3000/assets/ggd.svg" alt="ad" /> */}
    </HomeStyled>
  );
};

export default Home;
