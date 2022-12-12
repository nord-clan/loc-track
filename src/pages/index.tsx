import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import React from 'react';
import { HomeStyled } from '#/styles/pages/home.style';
import { Diagram } from '#/@nord-clan';
import HomeLayout from '#/components/layouts/home/home.layout';

// Home component
//* ------------------------------------------------------------------------------------------ *//
const Home: NextPageWithLayout = () => {
  return (
    <HomeStyled>
      <Diagram
        initState={{
          nodes: [
            {
              id: 'num1',
              position: [100, 100],
              type: 'number'
            },
            {
              id: 'num2',
              position: [200, 300],
              type: 'number'
            }
          ]
        }}
      />

      {/* <img src="http://localhost:3000/assets/ggd.svg" alt="ad" /> */}
    </HomeStyled>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
