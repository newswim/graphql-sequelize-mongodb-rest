import express from 'express';
import { apolloServer } from 'graphql-tools';
import Schema from './data/schema';
// import Mocks from './data/mocks';
import Resolvers from './data/resolvers'

const GRAPHQL_PORT = 8080;
const graphQLServer = express();

graphQLServer.use('/', apolloServer({
  graphiql: true,     // optional
  pretty: true,       // optional
  schema: Schema,     // required
  // mocks: Mocks,       // required
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
