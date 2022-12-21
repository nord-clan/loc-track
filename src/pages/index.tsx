import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import type { INodeState } from '#/components/@nord-clan-ui/components/canvas/store/node/node.interface';
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
            ...[
              {
                id: '11',
                position: [701, 455],
                type: 'table'
              },
              {
                id: '12',
                position: [701, 364],
                type: 'table'
              },
              {
                id: '13',
                position: [701, 273],
                type: 'table'
              },
              {
                id: '14',
                position: [701, 182],
                type: 'table'
              },
              {
                id: '15',
                position: [701, 91],
                type: 'table'
              }
            ],
            ...[
              {
                id: '21',
                position: [486, 455],
                type: 'table'
              },
              {
                id: '22',
                position: [486, 364],
                type: 'table'
              },
              {
                id: '23',
                position: [486, 273],
                type: 'table'
              },
              {
                id: '24',
                position: [486, 182],
                type: 'table'
              },
              {
                id: '25',
                position: [486, 91],
                type: 'table'
              }
            ],
            ...[
              {
                id: '31',
                position: [432, 455],
                type: 'table'
              },
              {
                id: '32',
                position: [432, 364],
                type: 'table'
              },
              {
                id: '33',
                position: [432, 273],
                type: 'table'
              },
              {
                id: '34',
                position: [432, 182],
                type: 'table'
              },
              {
                id: '35',
                position: [432, 91],
                type: 'table'
              }
            ],
            ...[
              {
                id: '41',
                position: [219, 455],
                type: 'table'
              },
              {
                id: '42',
                position: [219, 364],
                type: 'table'
              },
              {
                id: '43',
                position: [219, 273],
                type: 'table'
              },
              {
                id: '44',
                position: [219, 182],
                type: 'table'
              },
              {
                id: '45',
                position: [219, 91],
                type: 'table'
              }
            ]
          ] as INodeState[]
        }}
      />
    </HomeStyled>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
