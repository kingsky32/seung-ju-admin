import path from 'path';
import { loadFiles, loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

export async function createSchema() {
  const typesArray = loadFilesSync(
    path.join(process.cwd(), '/graphql/api/**/*.graphql'),
  );
  const resolversArray = await loadFiles(
    path.join(process.cwd(), '/graphql/api/**/*.resolver.js'),
    {
      requireMethod: (data) =>
        import(`./${path.relative(`${process.cwd()}/graphql`, data)}`),
    },
  );

  return makeExecutableSchema({
    typeDefs: mergeTypeDefs(typesArray),
    options: {
      static: 'upload',
    },
    resolvers: mergeResolvers(resolversArray),
  });
}
