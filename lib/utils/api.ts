import fs from 'fs';
import { join } from 'path';
import renderToString from 'next-mdx-remote/render-to-string';

const README_DIRECTORY = join(process.cwd(), 'README.md');

export const getReadme = async () => {
  return await renderToString(fs.readFileSync(README_DIRECTORY).toString());
};
