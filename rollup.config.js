import packageJson from './package.json';
import pluginTypescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const moduleName = packageJson.name.replace(/^@.*\//, '');
const banner = `
  /**
   * @license MIT
   * author: ${packageJson.author}
   * ${moduleName}.js v${packageJson.version}
   * Released under the ${packageJson.license} license.
   */
`;
const deps = Object.keys(packageJson.dependencies || []).concat(Object.keys(packageJson.peerDependencies));

const entryFile = 'src/index.ts';

export default [
  {
    input: entryFile,
    output: {
      banner,
      file: packageJson.main,
      format: 'cjs',
      globals: {
        react: 'React',
      },
      interop: false,
      name: 'rhdp',
      sourcemap: true,
    },
    external: deps,
    plugins: [del({ targets: 'dist/*' }), pluginTypescript(), terser()],
  },
  {
    input: entryFile,
    output: {
      banner,
      file: packageJson.module,
      format: 'esm',
      globals: {
        react: 'React',
      },
      name: 'rhdp',
      sourcemap: true,
    },
    external: deps,
    plugins: [pluginTypescript(), terser()],
  },
];
