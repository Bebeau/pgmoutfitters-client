import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  isAbsoluteHttpUrl,
} from '../utils/siteMeta';

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
  const ogImage = image && isAbsoluteHttpUrl(image) ? image : DEFAULT_OG_IMAGE;
  const twitterImage = image && isAbsoluteHttpUrl(image) ? image : DEFAULT_TWITTER_IMAGE;

  return (
    <Helmet>
      {noindex ? <meta name="robots" content="noindex" /> : null}
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      {title ? <meta name="twitter:title" content={title} /> : null}
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image:src" content={twitterImage} />
    </Helmet>
  );
};

export default PageHelmet;
