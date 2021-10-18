Vue.config.productionTip = false; 

import replace from '@rollup/plugin-replace';

rollup({
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  ]
})

export const mode = 'production';