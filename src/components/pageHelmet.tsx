import { Helmet } from 'react-helmet-async';

type pageHelmetType = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
};

const PageHelmet = ({
  title,
  description,
  canonical,
  image,
}: pageHelmetType) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {image ? <meta property="og:image" content={image} /> : null}
    </Helmet>
  );
};

export default PageHelmet;
