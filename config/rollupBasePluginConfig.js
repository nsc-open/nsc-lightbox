import babel from 'rollup-plugin-babel';
import url from "rollup-plugin-url"
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

export default [
  resolve({
    browser: true,
    extensions: ['.js'],
    jsnext: true,
    main: true
  }),
  url({
    limit: 10 * 1024, // inline files < 10k, copy files > 10k
    include: ["**/*.png"], // defaults to .svg, .png, .jpg and .gif files
    emitFiles: true // defaults to true
  }),
  babel({
    include: 'src/**',
    babelrc: true,
    runtimeHelpers: true,
    configFile: "./config/.babelrc.js",
  }),
  
  commonjs(),
]