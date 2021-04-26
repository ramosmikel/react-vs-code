import React from 'react';
import NextHead from 'next/head';
import { config } from 'config';

interface Props {
  title?: string;
}

const SEO = ({ title }: Props) => {
  return (
    <>
      <NextHead>
        <title>{title || config.project.name}</title>
      </NextHead>
    </>
  );
};

export default SEO;
