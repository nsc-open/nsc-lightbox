const fs = require('fs');
const path = require('path');
const componentDir = 'src/components';
const cModuleNames = fs.readdirSync(path.resolve(componentDir));
const cModuleMap = cModuleNames.reduce((prev, name) => {
  prev[name] = `${componentDir}/${name}/index.js`;
  return prev;
}, {});

export default cModuleMap