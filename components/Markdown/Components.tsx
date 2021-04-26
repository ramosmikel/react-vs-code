import Image from 'next/image';
import CustomLink from './CustomLink';

export const components = {
  img: ({ src, alt }: HTMLImageElement) => <Image alt={alt} src={src} width={720} height={373} quality={50} />,
  a: CustomLink,
};
