import { AnchorHTMLAttributes } from 'react';
import Image from 'next/image';

export const components = {
  img: ({ src }: HTMLImageElement) => <Image src={src} height={745} width={1440} />,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} target="_blank" />,
};
