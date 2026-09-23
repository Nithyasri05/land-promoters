/**
 * Reusable SEO component — wraps react-helmet-async for consistent meta tags.
 * Use on every page for production-level SEO.
 */
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'LandPromoters';
const DEFAULT_DESC = 'Premium land development and real estate services in Tamil Nadu. Residential plots, commercial lands, farm land — 100% legally verified.';
const DEFAULT_IMG = '/og-image.png';

export default function SEO({ title, description, image, url, noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium Land Development`;
  const metaDesc = description || DEFAULT_DESC;
  const metaImg = image || DEFAULT_IMG;
  const canonical = url ? `https://landpromoters.com${url}` : 'https://landpromoters.com';

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (Facebook, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImg} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImg} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
    </Helmet>
  );
}
