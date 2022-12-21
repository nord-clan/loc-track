import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import type { INodeState } from '#/components/@nord-clan-ui/components/canvas/store/node/node.interface';
import { HomeStyled } from '#/styles/pages/home.style';
import { Diagram, NodeVarious } from '#/@nord-clan';
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
                type: NodeVarious.Table
              },
              {
                id: '12',
                position: [701, 364],
                type: NodeVarious.Table
              },
              {
                id: '13',
                position: [701, 273],
                type: NodeVarious.Table
              },
              {
                id: '14',
                position: [701, 182],
                type: NodeVarious.Table
              },
              {
                id: '15',
                position: [701, 91],
                type: NodeVarious.Table
              }
            ],
            ...[
              {
                id: '21',
                position: [486, 455],
                type: NodeVarious.Table
              },
              {
                id: '22',
                position: [486, 364],
                type: NodeVarious.Table
              },
              {
                id: '23',
                position: [486, 273],
                type: NodeVarious.Table
              },
              {
                id: '24',
                position: [486, 182],
                type: NodeVarious.Table
              },
              {
                id: '25',
                position: [486, 91],
                type: NodeVarious.Table
              }
            ],
            ...[
              {
                id: '31',
                position: [432, 455],
                type: NodeVarious.Table
              },
              {
                id: '32',
                position: [432, 364],
                type: NodeVarious.Table
              },
              {
                id: '33',
                position: [432, 273],
                type: NodeVarious.Table
              },
              {
                id: '34',
                position: [432, 182],
                type: NodeVarious.Table
              },
              {
                id: '35',
                position: [432, 91],
                type: NodeVarious.Table
              }
            ],
            ...[
              {
                id: '41',
                position: [219, 455],
                type: NodeVarious.Table
              },
              {
                id: '42',
                position: [219, 364],
                type: NodeVarious.Table
              },
              {
                id: '43',
                position: [219, 273],
                type: NodeVarious.Table
              },
              {
                id: '44',
                position: [219, 182],
                type: NodeVarious.Table
              },
              {
                id: '45',
                position: [219, 91],
                type: NodeVarious.Table
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
