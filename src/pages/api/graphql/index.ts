import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import typeDefs from '../../../graphql/typeDefs';
import resolvers from '../../../graphql/resolvers';
import { processRequest } from 'graphql-upload-minimal';

// important for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');

    return { token };
  },
});

export default async function wrappedHandler(req: NextApiRequest, res: NextApiResponse) {
  // 👇 Check for multipart form data
  if (req.method === 'POST' && req.headers['content-type']?.includes('multipart/form-data')) {
    // Process multipart request for file uploads
    // graphql-upload-minimal expects req to have a .body and .files
    const processed = await processRequest(req, res);
    console.log('Processed request:', processed);
    // Replace the original request with a modified one that includes body/files
    (req as any).body = processed;
  }

  return handler(req, res);
}
