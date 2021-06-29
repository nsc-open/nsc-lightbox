import postcss from 'rollup-plugin-postcss';
import basePlugin from './rollupBasePluginConfig'

const createModuleConfig = (external, isDev) => ({
  input:  'src/index.js',
  output: {
    file:'es/index.js',
    format: 'es',
  },
  experimentalCodeSplitting: true,
  plugins: [
    postcss({
        // modules: true, // 增加 css-module 功能
        extensions: ['.less', '.css'],
        use: [
          ['less', {
            javascriptEnabled: true
          }]
        ],
        inject: true, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
        extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
      }),

    ...basePlugin
  ],
  // 将模块视为外部模块，不会打包在库中
  external: id => external.some(e => id.indexOf(e) === 0),
  ...(isDev ? {watch: {
    include: 'src/**',
    clearScreen: true
  }} : {}),
});

export default createModuleConfig;
