import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true
    },
    replace: {
      values: {
        "'string_decoder/'": "'string_decoder'"
      },
      delimiters: ['', '']
    },
    resolve: {
      exportConditions: "node"
    }
  },
})