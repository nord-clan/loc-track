import type { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export const getServerSideProps: GetServerSideProps = (ctx) => {
  const url = process.env.NEXT_SITE_URL ?? 'http://localhost:3000';

  const fields = [
    {
      loc: `${url}/server/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as Changefreq,
      priority: 0.5
    }
    // ...[].map((val) => {
    //   return {
    //     loc: `${url}/.../${val.id}`,
    //     lastmod: new Date().toISOString(),
    //     changefreq: 'daily' as Changefreq,
    //     priority: 0.6
    //   };
    // })
  ];

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
