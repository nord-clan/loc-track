import type { NextPageWithLayout } from './_app';
import React from 'react';

// Home component
//* ------------------------------------------------------------------------------------------ *//
const Home: NextPageWithLayout = () => {
  return <div>blank</div>;
};

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/glossary'
    }
  };
}

export default Home;
