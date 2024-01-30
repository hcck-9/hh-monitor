import ts from 'rollup-plugin-typescript2';
import path from 'path';

export default [
  {
    // 入口文件
    input: './src/index.ts',
    output: [
      {
        file: path.resolve(__dirname, './dist/index.esm.js'),
        format: 'esm',
      },
      {
        file: path.resolve(__dirname, './dist/index.cjs.js'),
        format: 'cjs',
      },
      {
        file: path.resolve(__dirname, './dist/index.js'),
        format: 'umd',
      },
    ],
    plugins: [ts()],
  },
];
