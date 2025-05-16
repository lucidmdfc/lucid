import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import typeDefs from '../../../graphql/typeDefs';
import resolvers from '../../../graphql/resolvers';
import { NextApiRequest, NextApiResponse } from 'next/types';

// Create Express app inside the handler to avoid issues with Next.js
const initializeServer = async () => {
  const app = express();
  console.log('server hit! ');
  // Enable file uploads
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  // Create Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  // @ts-ignore
  apolloServer.applyMiddleware({ app, path: '/api/graphql' });

  return app;
};

// Initialize the server once and reuse it
const appPromise = initializeServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const app = await appPromise;
  app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
