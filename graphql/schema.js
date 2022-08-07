import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync(path.join(process.cwd(), '/api/**/*.graphql'));
const resolversArray = loadFilesSync(
  path.join(process.cwd(), '/graphql/api/**/*.js'),
);

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  options: {
    static: 'upload',
  },
  resolvers: mergeResolvers(resolversArray),
});

export default schema;
