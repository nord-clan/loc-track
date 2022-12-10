import type { NextPageWithLayout } from './_app';
import React from 'react';
import { Diagram } from '#/components/@nord-clan-ui/components/canvas/diagram/diagram';

// Home component
//* ------------------------------------------------------------------------------------------ *//
const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Diagram
        initState={{
          nodes: [
            {
              id: 'node_1',
              label: 'Node 1',
              position: [300, 300],
              type: 'output_horizontal'
            }
          ]
        }}
      />
      {/* <BackgroundWrapper /> */}
      {/* <img src="http://localhost:3000/assets/ggd.svg" alt="ad" /> */}
    </div>
  );
};

export default Home;
