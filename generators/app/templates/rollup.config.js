import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';

const name = `<%= ccname %>`;

const plugins = [
  babel(),
  nodeResolve({
    module: true,
    jsnext: true
  }),
  commonjs({
    include: `node_modules/**`
  }),
  filesize()
];

const isProd = process.env.NODE_ENV === `production`;
if (isProd) plugins.push(uglify());

export default {
  input: `src/index.js`,
  plugins,
  output: {
    file: `dist/${name}${isProd ? `.min` : ``}.js`,
    name: name,
    format: `umd`
  }
};
