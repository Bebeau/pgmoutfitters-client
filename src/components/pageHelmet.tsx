import { Helmet } from 'react-helmet-async';

type pageHelmetType = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
};

const PageHelmet = ({
  title,
  description,
  canonical,
  image,
  noindex,
}: pageHelmetType) => {
  return (
    <Helmet>
      {noindex ? <meta name="robots" content="noindex" /> : null}
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      {title ? <meta name="twitter:title" content={title} /> : null}
      {description ? <meta name="twitter:description" content={description} /> : null}
    </Helmet>
  );
};

export default PageHelmet;
