import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: '../ApiService/BlogPosts.Api.json',
  apiFile: './src/store/api/empty-api.ts',
  apiImport: 'emptySplitApi',
  outputFiles: {
    './src/store/api/generated/blogPosts.ts': {
      // filterEndpoints: [/BlogPosts/]
    },
  },
  exportName: 'blogPostsApi',
  hooks: true,
}

export default config