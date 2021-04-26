import React from 'react';
import Head from 'next/head';
import { config } from 'config';

interface Props {
  title?: string;
}

const SEO = ({ title }: Props) => {
  const { name, description, url } = config.project;
  const pageTitle = title || name;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={pageTitle} key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image" content="/images/site-meta.png" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/site-meta.png" />
        <meta name="twitter:description" content={description} />
      </Head>
    </>
  );
};

export default SEO;
