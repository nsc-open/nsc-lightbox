import pkg from './package.json';
import createModuleConfig from './config/rollupRenderModuleConfig';
import createStyleConfig from './config/rollupRenderStyleConfig';
import cModuleMap from './config/obtainComponentsName';

const external = Object.keys(pkg.dependencies);
const isDev = false

/*
    dev 情况下不做样式抽离
    其他环境下，除了基本的 js 打包外，遍历要拆分的模块，分别生成一个配置项，在这个配置项中处理各自的样式分离
*/
const rollupConfig = isDev
  ? createModuleConfig(external, isDev)
  : [
    createModuleConfig(external, isDev)
  ].concat(
    Object.keys(cModuleMap).map(moduleName => createStyleConfig(moduleName, external))
  );

export default rollupConfig