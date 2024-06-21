require('dotenv').config();
const { build } = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const cssModulesPlugin = require('esbuild-plugin-css-modules');
const { version } = require('./package.json');

const define = {
  VERSION: JSON.stringify(version),
};

const { env } = process;

Object.entries(env).forEach(([key, value]) => {
  define[`${key}`] = JSON.stringify(value);
});

build({
  bundle: true,
  color: true,
  minify: true,
  sourcemap: false,
  define,
  entryPoints: ['src/index.jsx'],
  outdir: 'public/build',
  logLevel: 'debug',
  publicPath: '/build',
  loader: {
    '.svg': 'file',
    '.png': 'file',
    '.jsx': 'jsx',
    '.js': 'js',
  },
  charset: 'utf8',
  format: 'esm',
  splitting: true,
  target: ['chrome80', 'firefox78'],
  plugins: [
    // define a plugin to use css-modules
    cssModulesPlugin({
      localIdentName: '[local]--[hash:8:md5:hex]',
    }),
    // define a plugin to transform a sass to css
    // this includes the css-modules case
    sassPlugin(),
  ],
})
  .then((buildResult) => {
    console.log(buildResult);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
