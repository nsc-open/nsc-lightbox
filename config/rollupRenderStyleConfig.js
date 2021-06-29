import postcss from 'rollup-plugin-postcss';
import basePlugin from './rollupBasePluginConfig';

const createStyleConfig = (moduleName, external) => ({
  input: `src/components/${moduleName}/index.js`,
  output: {
    file: `es/${moduleName}/index.js`,
    format: 'es',
  },
  plugins: [
    // css 处理，暂时没有加插件
    postcss({
      // modules: true, // 增加 css-module 功能
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
      // 样式输出到 createModuleConfig 创建的模块文件夹下
      extract: `es/${moduleName}/style/index.css` 
    }),

    ...basePlugin
  ],
  external: id => external.some(e => id.indexOf(e) === 0),
});

export default createStyleConfig