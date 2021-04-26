import { AnchorHTMLAttributes } from 'react';
import Image from 'next/image';

export const components = {
  img: ({ src, alt }: HTMLImageElement) => <Image alt={alt} src={src} width={720} height={373} quality={50} />,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} rel="noreferrer" target="_blank" />,
};
