const nextSeoConfig = {
  title: 'NordClan',
  titleTemplate: '%s • NordClan',
  description: '🫀 NordClan',
  openGraph: {
    url: process.env.NEXT_SITE_URL,
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_SITE_URL ?? ''}/image/meta.png`,
        width: 512,
        height: 512,
        alt: 'Jusang'
      }
    ]
  }
};

export default nextSeoConfig;
