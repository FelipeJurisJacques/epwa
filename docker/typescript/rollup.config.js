// import { rollup } from 'rollup'
// import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  plugins: [
    // babel({
    //   babelHelpers: 'bundled',
    // }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
  output: {
    format: 'es',
    sourcemap: false,
    dir: 'assets/application/',
    entryFileNames: (chunkInfo) => {
      if (chunkInfo.name === 'service-worker') {
        return 'service-worker.js'
      } else {
        return '[name].mjs'
      }
    },
  },
  input: {
    'index': 'source/application/index.ts',
    'service-worker': 'source/application/service-worker.ts',
  },
}
