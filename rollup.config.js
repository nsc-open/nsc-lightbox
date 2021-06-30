// import pkg from './package.json';
// import createModuleConfig from './config/rollupRenderModuleConfig';
// import createStyleConfig from './config/rollupRenderStyleConfig';
// import cModuleMap from './config/obtainComponentsName';

// const external = Object.keys(pkg.dependencies);
// const isDev = false

// /*
//     dev 情况下不做样式抽离
//     其他环境下，除了基本的 js 打包外，遍历要拆分的模块，分别生成一个配置项，在这个配置项中处理各自的样式分离
// */
// const rollupConfig = isDev
//   ? createModuleConfig(external, isDev)
//   : [
//     createModuleConfig(external, isDev)
//   ].concat(
//     Object.keys(cModuleMap).map(moduleName => createStyleConfig(moduleName, external))
//   );

// export default rollupConfig

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies)

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
    }),
    url(),
    svgr(),
    babel({
      include: 'src/**',
      babelrc: true,
      runtimeHelpers: true,
    }),
    resolve({
      browser: true,
      extensions: ['.js'],
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: { 'react-is': ['isMemo'] },
    })
  ],
  external: id => external.some(e => id.indexOf(e) === 0)
}