const {createConfig} = require('@umijs/test');


module.exports = {
  ...createConfig({
    target: 'node',
    jsTransformer: 'esbuild',
    // config opts for esbuild , it will pass to esbuild directly
    jsTransformerOpts: {jsx: 'automatic'},
  })
}
