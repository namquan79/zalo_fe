import vuePlugin from 'rollup-plugin-vue'

export default {
  // ...
  plugins: [
    // ...
    vuePlugin(/* options */),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  ]
}