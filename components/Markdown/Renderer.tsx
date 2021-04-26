import hydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import { components } from './Components';

interface Props {
  mdx: MdxRemote.Source;
}

const Renderer = ({ mdx }: Props) => {
  const content = hydrate(mdx, { components });
  return <>{content}</>;
};

export default Renderer;
