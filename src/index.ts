import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { resolvers } from './resolvers';
import { typeDefs } from './schemas';
import { PORT } from './config';


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Setup GraphQL server
(async () => {
  await server.start();
  server.applyMiddleware({
    app, cors: {
      origin: '*'
    }
  });
})();

app.listen({ port: PORT }, () => console.log(`Graphql Server running at http://localhost:${PORT}/graphql 👨🏾‍💼`));